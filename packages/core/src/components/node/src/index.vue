<script lang="ts" setup>
import { deepCopy } from '@ai-lowcode/utils'
import {
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  watch,
} from 'vue'

import { Schema } from './types'

import { FormDataType, GlobalInstanceType } from '@/components'

defineOptions({
  name: 'AlNode',
})

// 组件 props
const props = defineProps<{
  /**
   * 组件 schema
   */
  componentSchema: Schema
  /**
   * 父级 schema
   */
  parentSchema?: Schema
}>()

// 当前组件 ref
const componentRef = ref()

// 子组件 ref
const childrenRef = ref()

// 插槽 ref
const slotRef = ref()

// 全局 formData
const formData = inject<FormDataType>('formData')

// 全局 instance
const globalInstance = inject<GlobalInstanceType>('globalInstance')

// 获取 modelValue 值
const modelValue = ref(formData?.getValueFromPath(props.componentSchema?.field))

// 暴露 api
const exposeApi = {
  componentRef,
  childrenRef,
  slotRef,
  modelValue,
  formData,
  globalInstance,
  __schema: props.componentSchema,
}

// 组装绑定数据
const bindValue = ref({
  ...handleContextProps(),
  ...props.componentSchema?.binds,
  ...injectContextToEvents(),
  id: props.componentSchema?.id,
  ...parseModelValue(),
  __schema: props.componentSchema,
  __parentSchema: props?.parentSchema,
})

/**
 * 监听 modelValue 值变化
 */
watch(() => formData?.getValueFromPath(props.componentSchema?.field), (newValue) => {
  modelValue.value = newValue
}, { deep: true })

watch(() => modelValue.value, (newValue) => {
  formData?.setValueAtPath(props.componentSchema?.field, newValue)
})

/**
 * 组装 modelValue
 */
function parseModelValue() {
  formData?.generateObjectFromPath(props.componentSchema?.field)
  formData?.setValueAtPath(props.componentSchema?.field, props.componentSchema?.defaultValue)
  return {
    [props.componentSchema?.modelField as string]: modelValue,
    [`onUpdate:${props.componentSchema?.modelField}`]: (value: any) => {
      formData?.setValueAtPath(props.componentSchema?.field, value)
    },
  }
}

/**
 * 组件事件处理
 */
function injectContextToEvents() {
  const newEvents: Record<string, any> = {}
  for (const eventsKey in props.componentSchema?.events) {
    newEvents[eventsKey] = props.componentSchema?.events?.[eventsKey]?.run?.bind({
      ...exposeApi,
      __event: props.componentSchema?.events?.[eventsKey]?.__event,
    })
  }
  return newEvents
}

function handleContextProps() {
  const newProps: Record<string, any> = deepCopy(props.componentSchema?.props)
  for (const propsKey in props.componentSchema?.props) {
    if (typeof props.componentSchema?.props[propsKey]?.run === 'function') {
      newProps[propsKey].run = props.componentSchema?.props[propsKey]?.run?.bind(exposeApi)
    }
  }
  return newProps
}

onBeforeMount(() => {
  props.componentSchema?.lifeCycle?.onBeforeMount?.run?.()
})

onMounted(() => {
  globalInstance?.setInstance(props.componentSchema?.name as string, exposeApi)
  props.componentSchema?.lifeCycle?.onMounted?.run?.()
})

onBeforeUpdate(() => {
  props.componentSchema?.lifeCycle?.onBeforeUpdate?.run?.()
})

onUpdated(() => {
  props.componentSchema?.lifeCycle?.onUpdated?.run?.()
})

onBeforeUnmount(() => {
  props.componentSchema?.lifeCycle?.onBeforeUnmount?.run?.()
})

onUnmounted(() => {
  props.componentSchema?.lifeCycle?.onUnmounted?.run?.()
})

onErrorCaptured(() => {
  props.componentSchema?.lifeCycle?.onErrorCaptured?.run?.()
})

defineExpose(exposeApi)

// 处理子组件，适配自定义插槽情况
const newComponentSchema = props.componentSchema?.children?.map((child: any) => {
  return typeof child === 'string'
    ? {
        content: child,
        slotName: 'default',
      }
    : {
        ...child,
        slotName: child?.slotName ?? 'default',
      }
})
</script>

<template>
  <component :is="componentSchema?.type" v-if="!componentSchema?.slotHidden" ref="componentRef" v-bind="bindValue" :expose-api="exposeApi">
    <template v-for="children in newComponentSchema" #[children.slotName]>
      <AlNode v-for="(schema, index) in newComponentSchema.filter((i: Schema) => i?.slotName === children?.slotName)" :key="index" ref="childrenRef" :component-schema="schema" :parent-schema="componentSchema" />
    </template>
  </component>
  <template v-if="typeof componentSchema?.content === 'string'">
    {{ componentSchema?.content }}
  </template>
</template>
