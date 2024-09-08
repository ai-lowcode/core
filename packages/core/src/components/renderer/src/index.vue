<script lang="ts" setup>
import { generateObjectFromPath, getValueFromPath, setValueAtPath } from '@ai-lowcode/utils'
import { nextTick, provide, ref, watch } from 'vue'

import { AlNode } from '../../node'

import { FormDataType } from './types'

import { Schema } from '@/components'

const props = defineProps<{
  modelValue?: Record<any, any>
  schemas: Array<Schema>
  options?: Record<string, any>
  api?: Record<string, any>
}>()

const emits = defineEmits(['update:modelValue'])

const nodeRef = ref()

const formData = ref<Record<string, any>>(props.modelValue ?? {})

provide<FormDataType>('formData', {
  value: formData,
  getValueFromPath: (path?: string) => {
    if (path)
      return getValueFromPath(formData.value, path)
  },
  generateObjectFromPath: (path?: string) => {
    if (path)
      generateObjectFromPath(formData.value, path)
  },
  setValueAtPath: (path?: string, newValue?: any) => {
    if (path)
      return setValueAtPath(formData.value, path, newValue)
  },
})

const show = ref(true)

// 根据 schemas 值变化更新视图
watch(() => props.schemas, () => {
  updateRender()
})

// 监听 form 值变化
watch(() => formData.value, (newValue) => {
  emits('update:modelValue', newValue)
}, {
  deep: true,
})

watch(() => props.modelValue, (newValue) => {
  formData.value = newValue
  updateRender()
})

async function updateRender() {
  await nextTick()
  show.value = false
  await nextTick()
  show.value = true
}

function updateComponent(form: Record<string, any>) {
  formData.value = form
  updateRender()
}

defineExpose({
  updateComponent,
  nodeRef,
  formData,
})
</script>

<template>
  <div v-if="schemas?.length && show" class="h-full w-full">
    <AlNode v-for="(schema, index) in schemas" ref="nodeRef" :key="index" :component-schema="schema" />
  </div>
</template>
