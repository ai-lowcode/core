<script lang="ts" setup>
import { Schema } from '@ai-lowcode/designer'
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
    return keys?.length ? formData?.getOrSetFormValue(keys ?? [], (props.componentSchema as Schema)?.defaultValue) : null
  },
  set() {},
})

// 处理 modelValue
function getModelValue() {
  formData?.createFormKeys(keys ?? [])
  return {
    [(props.componentSchema as Schema)?.modelField as string]: modelValue,
    [`onUpdate:${(props.componentSchema as Schema)?.modelField}`]: (value: any) => {
      formData?.getOrSetFormValue(keys ?? [], value)
    },
  }
}

// 组装绑定数据
const bindValue = ref({
  ...(props.componentSchema as Schema)?.props,
  ...(props.componentSchema as Schema)?.binds,
  ...(props.componentSchema as Schema)?.events,
  id: (props.componentSchema as Schema).id,
  ...getModelValue(),
  __schema: props.componentSchema,
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

const slotComputed = computed(() => (props.componentSchema as Schema)?.slotName ?? 'default')
</script>

<template>
  <component :is="componentSchema?.type" v-if="typeof componentSchema !== 'string' && !componentSchema?.slotHidden" ref="componentRef" v-bind="bindValue">
    <template #[slotComputed]>
      <AlNode v-for="(schema, index) in componentSchema?.children" :key="index" ref="childrenRef" :component-schema="schema" />
    </template>
  </component>
  <template v-if="typeof componentSchema === 'string'">
    {{ componentSchema }}
  </template>
</template>
