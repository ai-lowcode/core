<script lang="ts" setup name="Struct">
import { AlBadge, AlButton, AlDialog, AlMessage } from '@ai-lowcode/element-plus'

import { deepCopy, isEmpty } from '@ai-lowcode/utils'
// placeholder
import 'codemirror/addon/display/placeholder.js'
// language
import 'codemirror/mode/javascript/javascript.js'
// theme
import 'codemirror/theme/dracula.css'
import Codemirror from 'codemirror-editor-vue3'

import { computed, ref, watch } from 'vue'

import { deepParseFn, toJSON } from '@/utils'

const props = defineProps<{
  modelValue: [object, Array<any>, Function]
  title: string
  defaultValue: {
    require: false
  }
  validate: Function
}>()

const emits = defineEmits(['update:modelValue'])
const editor = ref<any>(null)
const visible = ref(false)
const oldVal = ref()

const configured = computed(() => !isEmpty(props.modelValue))

function load() {
  oldVal.value = toJSON(deepParseFn(props.modelValue ? deepCopy(props.modelValue) : props.defaultValue))
}

function onOk() {
  const str = oldVal.value
  let val
  try {
    // eslint-disable-next-line no-new-func
    val = (new Function(`return ${str}`))()
  }
  catch (e) {
    console.error(e)
    AlMessage.error('输入的内容语法错误')
    return false
  }
  if (props.validate && props.validate(val) === false) {
    AlMessage.error('输入的内容语法错误')
    return false
  }
  visible.value = false
  if (toJSON(val, null, 2) !== oldVal.value) {
    emits('update:modelValue', val)
  }
  return true
}

watch(() => visible, () => {
  load()
})
watch(() => props.modelValue, () => {
  load()
})
</script>

<template>
  12
  <div class="_fd-struct">
    <AlBadge type="warning" is-dot :hidden="!configured">
      <AlButton size="small" @click="visible = true">
        {{ title || '编辑数据' }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" :title="title || '编辑数据'" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
    >
      <Codemirror
        v-if="visible" v-model:value="oldVal" border
        :height="200" :options="{
          mode: 'text/javascript',
          theme: 'dracula', // Theme
        }"
      />
      <template #footer>
        <div>
          <AlButton size="default" @click="visible = false">
            取消
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="onOk">
            确定
          </AlButton>
        </div>
      </template>
    </AlDialog>
  </div>
</template>

<style>
._fd-struct {
    width: 100%;
}

._fd-struct .el-badge {
    width: 100%;
}

._fd-struct .el-button {
    width: 100%;
    font-weight: 400;
    color: #2E73FF;
    border-color: #2E73FF;
}

._fd-struct .CodeMirror {
    height: 450px;
}

._fd-struct .CodeMirror-line {
    font-size: 13px !important;
    line-height: 16px !important;
}

._fd-struct-con .CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fd-struct-con .el-dialog__body {
    padding: 0 20px;
}
</style>
