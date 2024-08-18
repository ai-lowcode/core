<script lang="ts" setup>
import * as monaco from 'monaco-editor'
import { IStandaloneCodeEditor } from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// 引入vue模块
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { onMounted, ref } from 'vue'
// 引入monaco编辑器

defineOptions({
  name: 'AlEventEditor',
})

// 定义从父组件接收的属性
const props = defineProps({
  option: Object,
})

// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      // eslint-disable-next-line new-cap
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      // eslint-disable-next-line new-cap
      return new cssWorker()
    }
    if (label === 'html') {
      // eslint-disable-next-line new-cap
      return new htmlWorker()
    }
    if (['typescript', 'javascript'].includes(label)) {
      // eslint-disable-next-line new-cap
      return new tsWorker()
    }
    // eslint-disable-next-line new-cap
    return new editorWorker()
  },
}
const code = ref('') // 代码
const language = ref('') // 语言
const editor = ref<null | IStandaloneCodeEditor>(null) // 编辑器实例
const monacoEditor = ref(null)

// 挂载
onMounted(() => {
  language.value = props.option?.options.language
  code.value = props.option?.options.code
  initEditor(language.value, code.value)
})

defineExpose({
  editor,
})

// 初始化编辑器
function initEditor(language: string, code: string) {
  if (monacoEditor.value) {
    editor.value = monaco.editor.create(monacoEditor.value!, {
      value: code,
      theme: 'vs', // 主题
      language,
      folding: true, // 是否折叠
      foldingHighlight: true, // 折叠等高线
      foldingStrategy: 'indentation', // 折叠方式  auto | indentation
      showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
      disableLayerHinting: true, // 等宽优化
      emptySelectionClipboard: false, // 空选择剪切板
      selectionClipboard: false, // 选择剪切板
      automaticLayout: true, // 自动布局
      codeLens: false, // 代码镜头
      scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
      colorDecorators: true, // 颜色装饰器
      accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
      lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
      lineNumbersMinChars: 5, // 行号最小字符   number
      readOnly: false, // 是否只读  取值 true | false
    })
  }
}
</script>

<template>
  <div id="monacoEditor" ref="monacoEditor" />
</template>
