<script lang="ts" setup name="HtmlEditor">
import { AlButton, AlDialog, AlMessage } from '@ai-lowcode/element-plus'
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import { markRaw, nextTick, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  title: string
  defaultValue: {
    require: false
  }
}>()

const emits = defineEmits(['update:modelValue'])

const editorRef = ref()
const editor = ref<any>(null)
const visible = ref(false)
const oldVal = ref<any>(null)

function validateXML(xmlString: any) {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml')
  const parseErrors: any = xmlDoc.getElementsByTagName('parsererror')
  if (parseErrors.length > 0) {
    return parseErrors[0].textContent.split('\n')[0] ?? ''
  }
  else {
    return ''
  }
}

function load() {
  oldVal.value = props.modelValue
  nextTick(() => {
    editor.value = markRaw(CodeMirror(editorRef.value, {
      lineNumbers: true,
      mode: 'xml',
      lint: true,
      line: true,
      tabSize: 2,
      lineWrapping: true,
      value: props.modelValue || '',
    }))
  })
}

function onOk() {
  const str = editor.value.getValue()
  if (validateXML(str)) {
    AlMessage.error('输入的内容语法错误')
    return false
  }
  visible.value = false
  if (str !== oldVal.value) {
    emits('update:modelValue', str)
  }
  return true
}
watch(() => props.modelValue, () => {
  load()
})
watch(() => visible, () => {
  load()
})
</script>

<template>
  <div class="_fd-html-editor">
    <AlButton style="width: 100%;" @click="visible = true">
      {{ title || '编辑数据' }}
    </AlButton>
    <AlDialog
      v-model="visible" class="_fd-html-editor-con" :title="title || '编辑数据'"
      :close-on-click-modal="false" append-to-body
    >
      <div v-if="visible" ref="editorRef" />
      <template #footer>
        <div>
          <AlButton size="default" @click="visible = false">
            取消
          </AlButton>
          <AlButton type="primary" size="default" @click="onOk">
            确定
          </AlButton>
        </div>
      </template>
    </AlDialog>
  </div>
</template>

<style>
._fd-html-editor {
    width: 100%;
}

._fd-html-editor .el-button {
    width: 100%;
    font-weight: 400;
    color: #2E73FF;
    border-color: #2E73FF;
}

._fd-html-editor-con .CodeMirror {
    height: 450px;
}

._fd-html-editor-con .CodeMirror-line {
    font-size: 13px !important;
    line-height: 16px !important;
}

._fd-html-editor-con .CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}

._fd-html-editor-con .el-dialog__body {
    padding: 0 20px;
}
</style>
