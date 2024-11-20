<script lang="ts" setup>
import { deepCopy, generateObjectFromPath, getValueFromPath, setValueAtPath } from '@zero-dim/utils'

import { nextTick, onMounted, provide, ref, watch } from 'vue'

import { FormDataType, GlobalInstanceType } from './types'

import { AlNode, Schema } from '@/node'

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

// schema 列表
const schemaList = ref(props.schemas)

// 是否显示渲染器
const show = ref(true)

// 全局 formData
const formData = ref<Record<string, any>>(props.modelValue ?? {})

// 组件实例总线
const instanceBus = ref<Record<string, any>>({})

// 暴露的 api
const exposeApi = {
  updateComponent,
  updateRender,
  nodeRef,
  formData,
  instanceBus,
}

// 初始化 formData
const formDataProvide: FormDataType = {
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
}

// 创建代理
const formDataProxy: FormDataType = Object.defineProperty(formDataProvide, 'value', {
  configurable: false,
  enumerable: true,
  get() {
    return formData.value
  },
  set(newValue) {
    formData.value = newValue
  },
})

// 注入全局 formData
provide<FormDataType>('formData', formDataProxy)

// 初始化 formData
const globalInstanceProvide: GlobalInstanceType = {
  getInstanceFromKey: (key: string) => {
    return instanceBus.value[key]
  },
  setInstance: (key: string, value: any) => {
    instanceBus.value[key] = value
  },
}

// 创建代理
const globalInstanceProxy: GlobalInstanceType = Object.defineProperty(globalInstanceProvide, 'value', {
  configurable: false,
  enumerable: true,
  get() {
    return instanceBus.value
  },
  set(newValue) {
    instanceBus.value = newValue
  },
})

// 注入全局 globalInstance
provide<GlobalInstanceType>('globalInstance', globalInstanceProxy)

// 根据 schemas 值变化更新视图
watch(() => props.schemas, (newValue) => {
  schemaList.value = newValue
}, {
  deep: true,
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
  if (deepCopy(form) !== deepCopy(formData.value)) {
    formData.value = form
    updateRender()
  }
}

onMounted(() => {
  instanceBus.value.renderer = exposeApi
})

defineExpose(exposeApi)
</script>

<template>
  <div v-if="schemaList?.length && show" class="h-full w-full">
    <AlNode v-for="(schema, index) in schemaList" ref="nodeRef" :key="index" :component-schema="schema" />
  </div>
</template>
