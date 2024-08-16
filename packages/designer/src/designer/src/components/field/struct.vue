<script lang="ts" setup name="Struct">
import { AlBadge, AlButton, AlDialog, AlMessage } from '@ai-lowcode/element-plus'

import { deepCopy, isEmpty } from '@ai-lowcode/utils'
import type { EditorConfiguration } from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import Codemirror from 'codemirror-editor-vue3'
import type { CmComponentRef } from 'codemirror-editor-vue3'

import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

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

const configured = computed(() => !isEmpty(props.modelValue))

const visible = ref(false)
const value = ref()
const cmRef = ref<CmComponentRef>()
const cmOptions: EditorConfiguration = {
  mode: 'javascript',
  readOnly: false,
  lineNumbers: true,
  lineWiseCopyCut: true,
  gutters: ['CodeMirror-lint-markers'],
}

function setupEditor() {
  setTimeout(() => {
    cmRef.value?.refresh()
  }, 100)
}

function loadEditorData() {
  value.value = toJSON(deepParseFn(props.modelValue ? deepCopy(props.modelValue) : props.defaultValue))
}

function handleClose() {
  visible.value = false
}

function openEditor() {
  setupEditor()
  visible.value = true
}

function handleConfirm() {
  const str = value.value
  let val
  try {
    // eslint-disable-next-line no-new-func
    val = (new Function(`return ${str}`))()
  }
  catch (e) {
    AlMessage.error('输入的内容语法错误')
    return false
  }
  if (props.validate && props.validate(val) === false) {
    AlMessage.error('输入的内容语法错误')
    return false
  }
  visible.value = false
  if (toJSON(val) !== value.value) {
    emits('update:modelValue', val)
  }
  return true
}

watch(() => visible, () => {
  loadEditorData()
})

watch(() => props.modelValue, () => {
  loadEditorData()
})

onMounted(() => {
  setupEditor()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>

<template>
  <div class="_fd-struct">
    <AlBadge type="warning" is-dot :hidden="!configured">
      <AlButton size="small" @click="openEditor">
        {{ title || '编辑数据' }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" :title="title || '编辑数据'" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
    >
      <Codemirror
        ref="cmRef"
        v-model:value="value"
        :options="cmOptions"
        border
        height="600"
      />
      <template #footer>
        <div>
          <AlButton size="default" @click="handleClose">
            取消
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="handleConfirm">
            确定
          </AlButton>
        </div>
      </template>
    </AlDialog>
  </div>
</template>
