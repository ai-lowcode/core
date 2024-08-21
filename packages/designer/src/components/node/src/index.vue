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

import { AlNode } from '@/components/node'
import { FormDataType } from '@/components/renderer/src/index.vue'
import { Schema } from '@/types'

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
const keys = (props.componentSchema as Schema)?.field?.split('.')

// 处理 modelValue
const modelValue = computed({
  get() {
    return keys?.length ? formData?.getOrSetFormValue(keys ?? []) : null
  },
  set() {},
})

// 处理 modelValue
function getModelValue() {
  formData?.createFormKeys(keys ?? [])
  return {
    [(props.componentSchema as Schema)?.modelField as string]: modelValue,
    'onUpdate:modelValue': (value: any) => {
      formData?.getOrSetFormValue(keys ?? [], value)
    },
  }
}

// 组装绑定数据
const bindValue = ref({
  ...(props.componentSchema as Schema).props,
  ...(props.componentSchema as Schema).binds,
  ...(props.componentSchema as Schema).events,
  id: (props.componentSchema as Schema).id,
  ...getModelValue(),
})

const exposeApi = {
  data: {
    [(props.componentSchema as Schema).type!]: nodeData,
  },
  componentRef,
  childrenRef,
  slotRef,
}

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
</script>

<template>
  <template v-if="typeof componentSchema === 'string'">
    {{ componentSchema }}
  </template>
  <component :is="componentSchema.type" v-else ref="componentRef" v-bind="bindValue">
    <!-- 默认子节点处理 -->
    <AlNode v-for="(schema, index) in componentSchema.children" ref="childrenRef" :key="index" :component-schema="schema as Schema" />
    <!-- 插槽处理 -->
    <template v-for="(slotSchemaList, slot) in componentSchema?.slots" :key="slot" #[slot]>
      <AlNode v-for="(slotSchema, slotIndex) in slotSchemaList" ref="slotRef" :key="slotIndex" :component-schema="slotSchema" />
    </template>
  </component>
</template>
