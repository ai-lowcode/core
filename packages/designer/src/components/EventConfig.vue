<script lang="ts" setup name="EventConfig">
import {
  AlAside,
  AlBadge,
  AlButton,
  AlContainer,
  AlDialog,
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlHeader,
  AlInput,
  AlMain,
  AlMenu,
  AlMenuItem,
} from '@ai-lowcode/element-plus'
import { deepExtend, isFunction, isString, uniqueId } from '@ai-lowcode/utils'
import { computed, defineEmits, defineProps, inject, onBeforeMount, ref, watch } from 'vue'

import errorMessage from '../utils/message'

import { getInjectArg } from '@/utils'

// import FnEditor from './FnEditor.vue'

const props = defineProps<{
  modelValue: [object, undefined, null]
  componentName: ''
  eventName: {
    type: Array<any>
    default: () => []
  }
}>()

const emits = defineEmits(['update:modelValue'])

const $T = '$FNX:'

const fn = ref()
const visible = ref(false)
const activeData = ref(null)
const val = ref(null)
const defActive = ref('no')
const event = ref({})
const cus = ref(false)
const cusValue = ref('')
const eventStr = ref('')

const designer = inject('designer', null)

const eventNum = computed(() => {
  let num = 0
  Object.keys(props.modelValue || {}).forEach((k) => {
    num += Array.isArray(props.modelValue[k]) ? props.modelValue[k].length : 1
  })
  return num
})

const t = computed(() => designer.setupState.t)

const fnArgs = computed(() => [getInjectArg(t)])

watch(() => visible, (v) => {
  event.value = v ? loadFN(deepExtend({}, props.modelValue || {})) : {}
  if (!v) {
    destroy()
    closeCus()
  }
})

function isFNX(v) {
  return isString(v) && v.indexOf($T) === 0
}

function addCus() {
  const val = cusValue.value && cusValue.value.trim()
  if (val) {
    closeCus()
    add(val)
  }
}
function closeCus() {
  cus.value = false
  cusValue.value = ''
}
function cusEvent() {
  cus.value = true
}
function loadFN(e) {
  const val = {}
  Object.keys(e).forEach((k) => {
    if (Array.isArray(e[k])) {
      const data = []
      e[k].forEach((v) => {
        if (isFNX(v)) {
          data.push(v.replace($T, ''))
        }
        else if (isFunction(v) && isFNX(v.__json)) {
          data.push(v.__json.replace($T, ''))
        }
        else if (v && v.indexOf('$GLOBAL:') === 0) {
          data.push(v)
        }
      })
      val[k] = data
    }
    else if (isFNX(e[k])) {
      val[k] = [e[k].replace($T, '')]
    }
    else if (isFunction(e[k]) && isFNX(e[k].__json)) {
      val[k] = [e[k].__json.replace($T, '')]
    }
    else if (e[k] && e[k].indexOf('$GLOBAL:') === 0) {
      val[k] = [e[k]]
    }
  })
  return val
}
function parseFN(e) {
  const on = {}
  Object.keys(e).forEach((k) => {
    const lst = []
    e[k].forEach((v, i) => {
      lst[i] = v.indexOf('$GLOBAL:') !== 0 ? ($T + v) : v
    })
    if (lst.length > 0) {
      on[k] = lst.length === 1 ? lst[0] : lst
    }
  })
  return on
}
function add(name) {
  let data = {}
  if (Array.isArray(event.value[name])) {
    event.value[name].push('')
    data = {
      name,
      item: event.value[name],
      index: event.value[name].length - 1,
    }
  }
  else if (event.value[name]) {
    const arr = [event.value[name], '']
    event.value[name] = arr
    data = {
      name,
      item: arr,
      index: 1,
    }
  }
  else {
    const arr = ['']
    event.value[name] = arr
    data = {
      name,
      item: arr,
      index: 0,
    }
  }
  if (!activeData.value) {
    edit(data)
  }
}
function edit(data) {
  data.key = uniqueId()
  if (data.item) {
    val.value = data.item[data.index]
  }
  else {
    val.value = event.value[data.name]
  }
  activeData.value = data
  eventStr.value = val.value
  defActive.value = data.name + (data.index || 0)
}
function save() {
  if (!fn.value.save()) {
    return
  }
  const str = eventStr.value

  if (activeData.value.item) {
    activeData.value.item[activeData.value.index] = str
  }
  else {
    event.value[activeData.value.name] = str
  }
  destroy()
}
function rm(data) {
  if (data.index !== undefined) {
    data.item.splice(data.index, 1)
  }
  else {
    // this.$delete(event.value, data.name)
  }
  if (defActive.value === (data.name + (data.index || 0))) {
    destroy()
  }
}
function destroy() {
  activeData.value = null
  val.value = null
  defActive.value = 'no'
}
function close() {
  destroy()
}
function submit() {
  if (activeData.value) {
    return errorMessage(t('event.saveMsg'))
  }
  emits('update:modelValue', parseFN(event.value))
  visible.value = false
  destroy()
  closeCus()
}

onBeforeMount(() => {
  window.$inject = {
    $f: {},
    rule: [],
    self: {},
    option: {},
    inject: {},
    args: [],
  }
})
</script>

<template>
  <div class="_fd-event">
    <AlBadge :value="eventNum" type="warning" :hidden="eventNum < 1">
      <AlButton size="small" @click="visible = true">
        {{ t('event.title') }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" class="_fd-event-dialog" :title="t('event.title')" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <AlContainer class="_fd-event-con" style="height: 600px">
        <AlAside style="width:300px;">
          <AlContainer class="_fd-event-l">
            <AlHeader class="_fd-event-head" height="40px">
              <AlDropdown
                popper-class="_fd-event-dropdown" trigger="click" size="default"
                placement="bottom-start"
              >
                <span class="el-dropdown-link">
                  <AlButton link type="primary" size="default">
                    {{ t('event.create') }}<i class="el-icon-arrow-down el-icon--right" />
                  </AlButton>
                </span>
                <template #dropdown>
                  <AlDropdownMenu>
                    <AlDropdownItem v-for="name in eventName" :key="name" @click="add(name)">
                      <div class="_fd-event-item">
                        <span>{{ name }}</span>
                      </div>
                    </AlDropdownItem>
                    <AlDropdownItem :divided="eventName.length > 0" @click="cusEvent">
                      <div>{{ t('props.custom') }}</div>
                    </AlDropdownItem>
                  </AlDropdownMenu>
                </template>
              </AlDropdown>
            </AlHeader>
            <AlMain>
              <AlMenu
                v-model="activeData"
                :default-active="defActive"
              >
                <template v-for="(item, name) in event" :key="name">
                  <template v-if="Array.isArray(item)">
                    <template v-for="(event, index) in item" :key="name + index">
                      <AlMenuItem :index="name + index">
                        <div
                          class="_fd-event-title"
                          @click.stop="edit({ name, item, index })"
                        >
                          <div class="_fd-event-method">
                            <span>function<span>{{
                              name
                            }}</span></span>
                          </div>
                          <i
                            class="fc-icon icon-delete"
                            @click.stop="rm({ name, item, index })"
                          />
                        </div>
                      </AlMenuItem>
                    </template>
                  </template>
                  <AlMenuItem v-else :index="name + 0">
                    <div class="_fd-event-title" @click.stop="edit({ name })">
                      <div class="_fd-event-method">
                        <span>function<span>{{
                          name
                        }}</span></span>
                      </div>
                      <i class="fc-icon icon-delete" @click.stop="rm({ name })" />
                    </div>
                  </AlMenuItem>
                </template>
                <AlMenuItem v-if="cus" style="padding-left: 10px;" index="custom">
                  <div class="_fd-event-title" @click.stop>
                    <AlInput
                      v-model="cusValue" type="text" size="default"
                      :placeholder="t('event.placeholder')"
                      @keydown.enter="addCus"
                    />
                    <div>
                      <i class="fc-icon icon-add" @click.stop="addCus" />
                      <i class="fc-icon icon-delete" @click.stop="closeCus" />
                    </div>
                  </div>
                </AlMenuItem>
              </AlMenu>
            </AlMain>
          </AlContainer>
        </AlAside>
        <AlMain>
          <AlContainer class="_fd-event-r">
            <AlHeader v-if="activeData" class="_fd-event-head" height="40px">
              <div><a target="_blank" href="https://form-create.com/v3/instance">{{ t('form.document') }}</a></div>
              <div>
                <AlButton size="small" @click="close">
                  {{ t('props.cancel') }}
                </AlButton>
                <AlButton size="small" type="primary" color="#2f73ff" @click="save">
                  {{
                    t('props.save')
                  }}
                </AlButton>
              </div>
            </AlHeader>
            <AlMain v-if="activeData">
              <FnEditor
                ref="fn" v-model="eventStr" body :name="activeData.name"
                :args="fnArgs"
                style="height: 519px;"
              />
            </AlMain>
          </AlContainer>
        </AlMain>
      </AlContainer>
      <template #footer>
        <div>
          <AlButton size="default" @click="visible = false">
            {{ t('props.cancel') }}
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="submit">
            {{
              t('props.ok')
            }}
          </AlButton>
        </div>
      </template>
    </AlDialog>
  </div>
</template>

<style>
._fd-event .el-button {
    width: 100%;
    font-weight: 400;
    color: #2E73FF;
    border-color: #2E73FF;
}

._fd-event .el-badge {
    width: 100%;
}

._fd-event-dialog .el-dialog__body {
    padding: 10px 20px;
}

._fd-event-con .el-main {
    padding: 0;
}

._fd-event-l, ._fd-event-r {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    border: 1px solid #ececec;
}

._fd-event-dropdown .el-dropdown-menu {
    max-height: 500px;
    overflow: scroll;
}

._fd-event-head {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    background: #f8f9ff;
    border-bottom: 1px solid #eee;
}

._fd-event-head .el-button.is-link {
    color: #2f73ff;
}

._fd-event-r {
    border-left: 0 none;
}

._fd-event-r ._fd-event-head {
    justify-content: space-between;
}

._fd-event-l > .el-main, ._fd-event-r > .el-main {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-basis: auto;
    flex-direction: row;
    width: 100%;
    min-width: 0;
}

._fd-event-r > .el-main {
    flex-direction: column;
}

._fd-event-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 250px;
    overflow: hidden;
    font-size: 14px;
    white-space: pre-wrap;
}

._fd-event-l .el-menu {
    width: 100%;
    padding: 0 10px 5px;
    overflow: auto;
    border-top: 0 none;
    border-right: 0 none;
}

._fd-event-l .el-menu-item.is-active {
    color: #303133;
    background: #e4e7ed;
}

._fd-event-l .el-menu-item {
    height: auto;
    padding: 0;
    margin-top: 5px;
    line-height: 1em;
    border: 1px solid #ECECEC;
    border-radius: 5px;
}

._fd-event-method {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 225px;
    overflow: hidden;
    font-family: monospace;
    font-size: 14px;
    color: #9D238C;
    white-space: pre-wrap;
}

._fd-event-method > span:first-child, ._fd-fn-list-method > span:first-child {
    color: #9D238C;
}

._fd-event-method > span:first-child > span, ._fd-fn-list-method > span:first-child > span {
    margin-left: 10px;
    color: #000;
}

._fd-event-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
}

._fd-event-title .fc-icon {
    margin-right: 6px;
    font-size: 18px;
    color: #282828;
}

._fd-event-title .el-input {
    width: 200px;
}

._fd-event-title .el-input__wrapper {
    box-shadow: none;
}

._fd-event-title .el-menu-item.is-active i {
    color: #282828;
}

._fd-event-con .CodeMirror {
    width: 100%;
    height: 100%;
}

._fd-event-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}
</style>
