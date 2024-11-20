<script lang="ts" setup>
import { deepCopy } from '@zero-dim/utils'
import {
  computed,
  inject,
  nextTick,
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

import { FormDataType, GlobalInstanceType } from '@/renderer'

import { getExposeApi } from '@/utils'

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

// 全局暴露api
const exposeGlobalApi = ref()

// 用于组件刷新
const show = ref(true)

// 组件 schema
const schema = ref(props.componentSchema)

// 全局 formData
const formData = inject<FormDataType>('formData')

// 全局 instance
const globalInstance = inject<GlobalInstanceType>('globalInstance')

// 获取 modelValue 值
const modelValue = ref(formData?.getValueFromPath(schema.value?.field))

// 暴露 api
const exposeApi = {
  componentRef,
  childrenRef,
  slotRef,
  modelValue,
  formData,
  globalInstance,
  updateRender,
  __schema: schema.value,
}

// 组装绑定数据
const bindValue = ref(getBindValue())

// 处理子组件，适配自定义插槽情况
const newComponentSchema = computed(() => (schema.value?.children as Array<Schema>)?.map((child: any) => {
  return typeof child === 'string'
    ? {
        content: child,
        slotName: 'default',
      }
    : {
        ...child,
        slotName: child?.slotName ?? 'default',
      }
}))

/**
 * 监听 modelValue 值变化
 */
watch(() => formData?.getValueFromPath(schema.value?.field), (newValue) => {
  modelValue.value = newValue
}, { deep: true })

/**
 * 监听 modelValue 值变化
 */
watch(() => modelValue.value, (newValue) => {
  formData?.setValueAtPath(schema.value?.field, newValue)
})

/**
 * 监听 componentSchema 值变化
 */
watch(() => props.componentSchema, (newValue) => {
  schema.value = newValue
  bindValue.value = getBindValue()
}, {
  deep: true,
})

/**
 * 获取绑定值
 */
function getBindValue() {
  return {
    ...handleContextProps(),
    ...schema.value?.binds,
    ...injectContextToEvents(),
    id: schema.value?.id,
    ...parseModelValue(),
    __schema: schema.value,
    __parentSchema: props?.parentSchema,
  }
}

/**
 * 组装 modelValue
 */
function parseModelValue() {
  formData?.generateObjectFromPath(schema.value?.field)
  formData?.setValueAtPath(schema.value?.field, schema.value?.defaultValue)
  return {
    [schema.value?.modelField as string]: modelValue,
    [`onUpdate:${schema.value?.modelField}`]: (value: any) => {
      formData?.setValueAtPath(schema.value?.field, value)
    },
  }
}

/**
 * 组件事件处理
 */
function injectContextToEvents() {
  const newEvents: Record<string, any> = {}
  for (const eventsKey in schema.value?.events) {
    if (schema.value?.events?.[eventsKey]?.run) {
      newEvents[eventsKey] = schema.value?.events?.[eventsKey]?.run?.bind({
        ...exposeApi,
        exposeGlobalApi,
        __event: schema.value?.events?.[eventsKey]?.__event,
      })
    }
    else {
      newEvents[eventsKey] = schema.value?.events?.[eventsKey].bind({
        ...exposeApi,
        exposeGlobalApi,
      })
    }
  }
  return newEvents
}

/**
 * 处理 props
 */
function handleContextProps() {
  let compSchema = deepCopy(schema.value?.props)
  const newProps: Record<string, any> = {}
  const regex = /\{\{([\w.]+)\}\}/
  if (typeof schema.value?.props === 'function') {
    compSchema = schema.value?.props?.apply({
      ...exposeApi,
      exposeGlobalApi,
    })
  }
  for (const propsKey in compSchema) {
    const propsValue = compSchema[propsKey]?.match?.(regex)
    if (typeof compSchema[propsKey]?.run === 'function') {
      newProps[propsKey].run = compSchema[propsKey]?.run?.bind({
        ...exposeApi,
        exposeGlobalApi,
      })
    }
    else if (propsValue?.[1]) {
      formData?.generateObjectFromPath(propsValue[1])
      newProps[propsKey] = computed({
        get() {
          return formData?.getValueFromPath(propsValue[1])
        },
        set() {
        },
      })
    }
    else if (compSchema[propsKey] !== undefined && compSchema[propsKey] !== '') {
      newProps[propsKey] = compSchema[propsKey]
    }
  }
  return newProps
}

/**
 * 更新渲染器状态
 */
async function updateRender() {
  await nextTick()
  show.value = false
  await nextTick()
  show.value = true
}

onBeforeMount(async () => {
  exposeGlobalApi.value = await getExposeApi()
  schema.value?.lifeCycle?.onBeforeMount?.run?.()
})

onMounted(() => {
  if (schema.value?.name)
    globalInstance?.setInstance(`${schema.value?.name}_${schema.value?.id}`, exposeApi)
  schema.value?.lifeCycle?.onMounted?.run?.()
})

onBeforeUpdate(() => {
  schema.value?.lifeCycle?.onBeforeUpdate?.run?.()
})

onUpdated(() => {
  schema.value?.lifeCycle?.onUpdated?.run?.()
})

onBeforeUnmount(() => {
  schema.value?.lifeCycle?.onBeforeUnmount?.run?.()
})

onUnmounted(() => {
  schema.value?.lifeCycle?.onUnmounted?.run?.()
})

onErrorCaptured(() => {
  schema.value?.lifeCycle?.onErrorCaptured?.run?.()
})

defineExpose(exposeApi)
</script>

<template>
  <template v-if="schema?.hidden !== true">
    <component :is="schema?.type" v-if="!schema?.slotHidden && show" ref="componentRef" v-bind="bindValue" :schema="schema" :expose-api="exposeApi">
      <template v-for="children in newComponentSchema" #[children.slotName]>
        <AlNode v-for="(schemaItem, index) in newComponentSchema.filter((i: Schema) => i?.slotName === children?.slotName)" :key="index" ref="childrenRef" :component-schema="schemaItem" :parent-schema="schema" />
      </template>
    </component>
    <template v-if="schema?.content && show">
      {{ schema?.content }}
    </template>
  </template>
</template>
