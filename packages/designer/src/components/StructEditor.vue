<script lang="ts" setup name="StructEditor">
import 'codemirror/lib/codemirror.css'
// eslint-disable-next-line import/order
import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/mode/javascript/javascript'

import { markRaw, nextTick, onMounted, ref } from 'vue'

import { toJSON } from '@/utils'

const props = defineProps<{
  modelValue: any
  defaultValue: {
    require: false
  }
}>()

const emits = defineEmits(['update:modelValue'])

const oldVal = ref(null)
const editor = ref()
const editorRef = ref()

function load() {
  const val = props.modelValue ? toJSON(props.modelValue) : ''
  oldVal.value = val
  nextTick(() => {
    editor.value = markRaw(CodeMirror(editorRef.value, {
      lineNumbers: true,
      mode: 'javascript',
      lint: true,
      line: true,
      tabSize: 2,
      lineWrapping: true,
      value: val || '',
    }))
  })
}

// function save() {
//   const str = editor.value.getValue()
//   let val
//   try {
//     val = (new Function(`return ${str}`))()
//   }
//   catch (e) {
//     console.error(e)
//     errorMessage(t('struct.errorMsg'))
//     return false
//   }
//   if (this.validate && this.validate(val) === false) {
//     err.value = true
//     return false
//   }
//   visible.value = false
//   if (toJSON(val, null, 2) !== oldVal.value) {
//     emits('update:modelValue', val)
//   }
//   return true
// }

onMounted(() => {
  nextTick(() => {
    load()
  })
})
</script>

<template>
  <div class="_fd-struct-editor">
    <div ref="editorRef" />
  </div>
</template>

<style>
._fd-struct-editor {
    flex: 1;
    width: 100%;
}

._fd-struct-editor > div {
    height: 100%;
}
</style>
