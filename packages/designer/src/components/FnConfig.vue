<script lang="ts" setup name="FnConfig">
import {
  AlAside,
  AlBadge,
  AlButton,
  AlContainer,
  AlDialog,
  AlHeader,
  AlMain,
  AlMenu,
  AlMenuItem,
  AlText,
} from '@ai-lowcode/element-plus'
import { deepExtend, uniqueId } from '@ai-lowcode/utils'
import { computed, inject, ref, watch } from 'vue'

import errorMessage from '../utils/message'

// import FnEditor from './FnEditor.vue'

const props = defineProps<{
  modelValue: [object, undefined, null]
  eventConfig: any
}>()
const emits = defineEmits(['update:modelValue'])
const PREFIX = '[[FORM-CREATE-PREFIX-'
const SUFFIX = '-FORM-CREATE-SUFFIX]]'

const designer = inject<any>('designer', null)

const t = computed(() => designer.setupState.t)

const visible = ref(false)
const activeData = ref<any>(null)
const defActive = ref('no')
const event = ref({})
const eventStr = ref('')
const FnEditorRef = ref()

const eventNum = computed(() => {
  let num = 0
  Object.keys(props.modelValue || {}).forEach((k: any) => {
    if (props.modelValue[k]) {
      num++
    }
  })
  return num
})

watch(() => visible, (v) => {
  event.value = v ? loadFN(deepExtend({}, props.modelValue || {})) : {}
  if (!v) {
    destroy()
  }
})

function getArgs(item: any) {
  return item.args.join(', ')
}

function loadFN(e: any) {
  const val: any = {}
  props.eventConfig.forEach((item: any) => {
    const k = item.name
    const fn = e[k] || ''
    val[k] = {
      item,
      fn,
    }
  })
  return val
}

function parseFN(e: any) {
  const on: any = {}
  Object.keys(e).forEach((k) => {
    if (e[k].fn) {
      on[k] = e[k].fn
    }
  })
  return on
}

function edit(data: any) {
  data.key = uniqueId()
  activeData.value = data
  eventStr.value = data.fn || (`${PREFIX}function ${data.item.name}(${getArgs(data.item)}){}${SUFFIX}`)
  defActive.value = data.item.name
}

function save() {
  if (FnEditorRef.value.save()) {
    activeData.value.fn = eventStr.value
    destroy()
  }
}

function destroy() {
  activeData.value = null
  defActive.value = 'no'
}

function close() {
  destroy()
}

function submit() {
  if (activeData.value) {
    return errorMessage(t.value('event.saveMsg'))
  }
  emits('update:modelValue', parseFN(event.value))
  visible.value = false
  destroy()
}
</script>

<template>
  <div class="_fd-fn-list">
    <AlBadge :value="eventNum" type="warning" :hidden="eventNum < 1">
      <AlButton size="small" @click="visible = true">
        {{ t('event.title') }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" class="_fd-fn-list-dialog" :title="t('event.title')" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <AlContainer class="_fd-fn-list-con" style="height: 600px">
        <AlAside style="width:300px;">
          <AlContainer class="_fd-fn-list-l">
            <AlHeader class="_fd-fn-list-head" height="40px">
              <AlText type="primary" size="default">
                {{ t('event.list') }}
              </AlText>
            </AlHeader>
            <AlMain>
              <AlMenu
                v-model="activeData"
                :default-active="defActive"
              >
                <template v-for="(item, name) in event" :key="name">
                  <AlMenuItem :index="name">
                    <div class="_fd-fn-list-method" @click.stop="edit(item)">
                      <span>function<span>{{ name }}</span></span>
                    </div>
                  </AlMenuItem>
                </template>
              </AlMenu>
            </AlMain>
          </AlContainer>
        </AlAside>
        <AlMain>
          <AlContainer class="_fd-fn-list-r">
            <AlHeader v-if="activeData" class="_fd-fn-list-head" height="40px">
              <AlButton size="small" @click="close">
                {{ t('props.cancel') }}
              </AlButton>
              <AlButton size="small" type="primary" color="#2f73ff" @click="save">
                {{
                  t('props.save')
                }}
              </AlButton>
            </AlHeader>
            <AlMain v-if="activeData">
              <FnEditor
                ref="FnEditorRef" v-model="eventStr" :name="activeData.item.name"
                :args="activeData.item.args"
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
._fd-fn-list, ._fd-fn-list .el-badge {
    width: 100%;
}

._fd-fn-list .el-button {
    width: 100%;
    font-weight: 400;
    color: #2E73FF;
    border-color: #2E73FF;
}

._fd-fn-list-dialog .el-dialog__body {
    padding: 10px 20px;
}

._fd-fn-list-con .el-main {
    padding: 0;
}

._fd-fn-list-l, ._fd-fn-list-r {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    border: 1px solid #ececec;
}

._fd-fn-list-head {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    background: #f8f9ff;
    border-bottom: 1px solid #eee;
}

._fd-fn-list-head .el-button.is-link {
    color: #2f73ff;
}

._fd-fn-list-r {
    border-left: 0 none;
}

._fd-fn-list-r ._fd-fn-list-head {
    justify-content: flex-end;
}

._fd-fn-list-l > .el-main, ._fd-fn-list-r > .el-main {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-basis: auto;
    flex-direction: row;
    width: 100%;
    min-width: 0;
}

._fd-fn-list-r > .el-main {
    flex-direction: column;
}

._fd-fn-list-l .el-menu {
    width: 100%;
    padding: 0 10px 5px;
    overflow: auto;
    border-top: 0 none;
    border-right: 0 none;
}

._fd-fn-list-l .el-menu-item.is-active {
    color: #303133;
    background: #e4e7ed;
}

._fd-fn-list-l .el-menu-item {
    height: auto;
    padding: 0;
    margin-top: 5px;
    line-height: 1em;
    border: 1px solid #ECECEC;
    border-radius: 5px;
}

._fd-fn-list-method {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 10px 0;
    overflow: hidden;
    font-family: monospace;
    font-size: 14px;
    line-height: 1em;
    white-space: pre-wrap;
}

._fd-fn-list-method-info > span:first-child, ._fd-fn-list-method > span:first-child {
    color: #9D238C;
}

._fd-fn-list-method-info > span:first-child > span, ._fd-fn-list-method > span:first-child > span {
    margin-left: 10px;
    color: #000;
}

._fd-fn-list-con .CodeMirror {
    width: 100%;
    height: 100%;
}

._fd-fn-list-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}
</style>
