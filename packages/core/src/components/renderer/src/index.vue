<script lang="ts" setup>
import { generateObjectFromPath, getValueFromPath, setValueAtPath } from '@ai-lowcode/utils'

import { nextTick, provide, ref, watch } from 'vue'

import { AlNode } from '../../node'

import { FormDataType, GlobalInstanceType } from './types'

import { Schema } from '@/components'

// 渲染器 props
const props = defineProps<{
  modelValue?: Record<any, any>
  schemas: Array<Schema>
  options?: Record<string, any>
  api?: Record<string, any>
}>()

// 定义 emits
const emits = defineEmits(['update:modelValue'])

// 节点 ref
const nodeRef = ref()

// 是否显示渲染器
const show = ref(true)

// 全局 formData
const formData = ref<Record<string, any>>(props.modelValue ?? {})

// 暴露的 api
const exposeApi = {
  updateComponent,
  nodeRef,
  formData,
}

// 组件实例总线
const instanceBus = ref<Record<string, any>>({
  renderer: exposeApi,
})

// 注入全局 formData
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

// 注入全局 globalInstance
provide<GlobalInstanceType>('globalInstance', {
  value: instanceBus,
  getInstanceFromKey: (key: string) => {
    return instanceBus.value[key]
  },
  setInstance: (key: string, value: any) => {
    instanceBus.value[key] = value
  },
})

// 根据 schemas 值变化更新视图
watch(() => props.schemas, () => {
  updateRender()
})

// 监听 form 值变化
watch(() => formData.value, (newValue: Record<string, any>) => {
  emits('update:modelValue', newValue)
}, {
  deep: true,
})

// 监听渲染器 modelValue
watch(() => props.modelValue, (newValue: Record<string, any>) => {
  formData.value = newValue
  updateRender()
})

/**
 * 更新渲染器状态
 */
async function updateRender() {
  await nextTick()
  show.value = false
  await nextTick()
  show.value = true
}

/**
 * 更新渲染器组件值内容
 * @param form
 */
function updateComponent(form: Record<string, any>) {
  formData.value = form
  updateRender()
}

defineExpose(exposeApi)
</script>

<template>
  <div v-if="schemas?.length && show" class="h-full w-full">
    <AlNode v-for="(schema, index) in schemas" ref="nodeRef" :key="index" :component-schema="schema" />
  </div>
</template>
