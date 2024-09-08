<script lang="ts" setup>
import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'

import { FormDataType } from '../../renderer/src/index.vue'

import { Schema } from './types'

defineOptions({
  name: 'AlNode',
})

const props = defineProps<{
  componentSchema: Schema | string
}>()

const componentRef = ref()
const childrenRef = ref()
const slotRef = ref()
const nodeData = ref()

const formData = inject<FormDataType>('formData')

// 处理 modelValue
const modelValue = computed({
  get() {
    return formData?.getValueFromPath((props.componentSchema as Schema)?.field)
  },
  set() {},
})

const exposeApi = {
  data: {
    [(props.componentSchema as Schema).type!]: nodeData,
  },
  componentRef,
  childrenRef,
  slotRef,
  modelValue,
  formData,
}

// 处理 modelValue
function parseModelValue() {
  formData?.generateObjectFromPath((props.componentSchema as Schema)?.field)
  formData?.setValueAtPath((props.componentSchema as Schema)?.field, (props.componentSchema as Schema)?.defaultValue)
  return {
    [(props.componentSchema as Schema)?.modelField as string]: modelValue,
    [`onUpdate:${(props.componentSchema as Schema)?.modelField}`]: (value: any) => {
      formData?.setValueAtPath((props.componentSchema as Schema)?.field, value)
      console.log(formData?.value)
    },
  }
}

function injectContextToEvents() {
  const newEvents: Record<string, any> = {}
  for (const eventsKey in (props.componentSchema as Schema)?.events) {
    newEvents[eventsKey] = (props.componentSchema as Schema)?.events?.[eventsKey].bind({
      exposeApi,
      props,
    })
  }
  return newEvents
}

// 组装绑定数据
const bindValue = ref({
  ...(props.componentSchema as Schema)?.props,
  ...(props.componentSchema as Schema)?.binds,
  ...injectContextToEvents(),
  id: (props.componentSchema as Schema).id,
  ...parseModelValue(),
  __schema: props.componentSchema,
})

onBeforeMount(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onBeforeMount?.(exposeApi)
})

onMounted(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onMounted?.(exposeApi)
})

onBeforeUpdate(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onBeforeUpdate?.(exposeApi)
})

onUpdated(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onUpdated?.(exposeApi)
})

onBeforeUnmount(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onBeforeUnmount?.(exposeApi)
})

onUnmounted(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onUnmounted?.(exposeApi)
})

onErrorCaptured(() => {
  if (typeof props.componentSchema !== 'string')
    props.componentSchema?.lifeCycle?.onErrorCaptured?.(exposeApi)
})

defineExpose(exposeApi)

const newComponentSchema = props.componentSchema?.children?.map((child) => {
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
  <component :is="componentSchema?.type" v-if="typeof componentSchema !== 'string' && !componentSchema?.slotHidden" ref="componentRef" v-bind="bindValue">
    <template v-for="childrens in newComponentSchema" #[childrens.slotName]>
      <AlNode v-for="(schema, index) in newComponentSchema.filter(i => i?.slotName === childrens?.slotName)" :key="index" ref="childrenRef" :component-schema="schema" />
    </template>
  </component>
  <template v-if="typeof componentSchema?.content === 'string'">
    {{ componentSchema?.content }}
  </template>
</template>
