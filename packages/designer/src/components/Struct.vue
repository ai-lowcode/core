<script lang="ts" setup name="Struct">
import { AlBadge, AlButton, AlDialog } from '@ai-lowcode/element-plus'

import { deepCopy, isEmpty } from '@ai-lowcode/utils'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'

import { computed, inject, markRaw, nextTick, ref, watch } from 'vue'

import errorMessage from '../utils/message.js'

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
const editorRef = ref(null)
const visible = ref(false)
const oldVal = ref()

const designer = inject<any>('designer', null)

const t = computed(() => designer.setupState.t)

const configured = computed(() => !isEmpty(props.modelValue))

function load() {
  const val = toJSON(deepParseFn(props.modelValue ? deepCopy(props.modelValue) : props.defaultValue))
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

function onOk() {
  const str = editor.value.getValue()
  let val
  try {
    // eslint-disable-next-line no-new-func
    val = (new Function(`return ${str}`))()
  }
  catch (e) {
    console.error(e)
    errorMessage(t.value('struct.errorMsg'))
    return false
  }
  if (props.validate && props.validate(val) === false) {
    errorMessage(t.value('struct.errorMsg'))
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
  <div class="_fd-struct">
    <AlBadge type="warning" is-dot :hidden="!configured">
      <AlButton size="small" @click="visible = true">
        {{ title || t('struct.title') }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" class="_fd-struct-con" :title="title || t('struct.title')" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
    >
      <div v-if="visible" ref="editorRef" />
      <template #footer>
        <div>
          <AlButton size="default" @click="visible = false">
            {{ t('props.cancel') }}
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="onOk">
            {{ t('props.ok') }}
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
