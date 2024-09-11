<script lang="ts" setup>
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

const props = defineProps<{
  componentSchema: Schema
}>()

const componentRef = ref()
const childrenRef = ref()
const slotRef = ref()

const formData = inject<FormDataType>('formData')

const globalInstance = inject<GlobalInstanceType>('globalInstance')

// 处理 modelValue
const modelValue = ref(formData?.getValueFromPath(props.componentSchema?.field))

watch(() => formData?.getValueFromPath(props.componentSchema?.field), (newValue) => {
  modelValue.value = newValue
}, { deep: true })

const exposeApi = {
  componentRef,
  childrenRef,
  slotRef,
  modelValue,
  formData,
  __schema: props.componentSchema,
}

// 处理 modelValue
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

function injectContextToEvents() {
  const newEvents: Record<string, any> = {}
  for (const eventsKey in props.componentSchema?.events) {
    newEvents[eventsKey] = props.componentSchema?.events?.[eventsKey]?.run?.bind({
      exposeApi,
      props,
      globalInstance,
    })
  }
  return newEvents
}

// 组装绑定数据
const bindValue = ref({
  ...props.componentSchema?.props,
  ...props.componentSchema?.binds,
  ...injectContextToEvents(),
  id: props.componentSchema.id,
  ...parseModelValue(),
  __schema: props.componentSchema,
})

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
  <component :is="componentSchema?.type" v-if="!componentSchema?.slotHidden" ref="componentRef" v-bind="bindValue">
    <template v-for="children in newComponentSchema" #[children.slotName]>
      <AlNode v-for="(schema, index) in newComponentSchema.filter(i => i?.slotName === children?.slotName)" :key="index" ref="childrenRef" :component-schema="schema" />
    </template>
  </component>
  <template v-if="typeof componentSchema?.content === 'string'">
    {{ componentSchema?.content }}
  </template>
</template>
