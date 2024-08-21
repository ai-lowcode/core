<script lang="ts" setup>
import { uniqueId } from '@ai-lowcode/utils'
import { Ref, provide, ref, watch } from 'vue'

import { AlNode } from '@/components/node'
import { Schema } from '@/types'
import { accessOrSetNestedValue, setNestedObjectValue } from '@/utils'

const props = defineProps<{
  modelValue?: Record<any, any>
  schemas: Array<Schema>
  options: Record<string, any>
  api?: Record<string, any>
}>()

const emits = defineEmits(['update:modelValue'])

const key = ref(uniqueId())

const nodeRef = ref()

const formData = ref<Record<string, any>>(props.modelValue ?? {})

export interface FormDataType {
  value: Ref<Record<string, any>>
  createFormKeys: (key: string[]) => void
  getOrSetFormValue: (key: string[], newValue?: any) => void
}

provide<FormDataType>('formData', {
  value: formData,
  createFormKeys: (keys: string[]) => {
    setNestedObjectValue(formData.value, keys)
  },
  getOrSetFormValue: (keys: string[], newValue?: any) => {
    return accessOrSetNestedValue(formData.value, keys, newValue)
  },
})

// 根据 schemas 值变化更新视图
watch(() => props.schemas, () => {
  key.value = uniqueId()
})

// 监听 form 值变化
watch(() => formData.value, (newValue) => {
  emits('update:modelValue', newValue)
}, {
  deep: true,
})

function updateComponent(form: Record<string, any>) {
  formData.value = form
  key.value = uniqueId()
}

defineExpose({
  updateComponent,
  nodeRef,
  formData,
})
</script>

<template>
  <div :key="key" class="h-full w-full">
    <AlNode v-for="(schema, index) in schemas" ref="nodeRef" :key="index" :component-schema="schema" />
  </div>
</template>
