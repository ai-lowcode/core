<script lang="ts" setup>
import { AlRenderer, Schema } from '@ai-lowcode/core'
import { AlCollapse, AlCollapseItem } from '@ai-lowcode/element-plus'

import { deepCopy } from '@ai-lowcode/utils'
import { computed, inject, nextTick, ref, watch } from 'vue'

import { FieldAttrsSchema } from '../schema/field.ts'
import { FormAttrsSchema } from '../schema/form.ts'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import componentSchemaList from '@/schema'
import { DesignerContext } from '@/types'
import { findAndModifyById, getSchemaInstanceName } from '@/utils'

defineOptions({
  name: 'Attrs',
})

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

const fieldRef = ref()

const slotsRef = ref()

const compAttrsRef = ref()

const fieldData = ref()

const propsData = ref()

const slotsData = ref()

const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.workspaceRef?.value?.selectComponent?.name))

const propsSchema = computed({
  get() {
    const schema = compSchema.value?.props(changePropsData)
    schema?.[0].children.forEach((props) => {
      switch (props.children[0]?.type) {
        case 'al-switch':
          if (!props.children[0].events) {
            props.children[0].events = {}
          }
          props.children[0].events.onChange = changePropsData
          break
        case 'al-select':
          if (!props.children[0].events) {
            props.children[0].events = {}
          }
          props.children[0].events.onChange = changePropsData
          break
        case 'al-input-number':
          if (!props.children[0].events) {
            props.children[0].events = {}
          }
          props.children[0].events.onChange = changePropsData
          break
        case 'al-input':
          if (!props.children[0].events) {
            props.children[0].events = {}
          }
          props.children[0].events.onBlur = changePropsData
          break
      }
    })
    return schema
  },
  set() {},
})

function changeFieldData() {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
    if (fieldData.value?.field?.id)
      node.id = fieldData.value.field.id
    if (fieldData.value?.field?.name)
      node.name = fieldData.value.field.name
    if (fieldData.value?.field?.label)
      node.label = fieldData.value.field.label
    if (fieldData.value?.field?.field)
      node.field = fieldData.value.field.field
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
  nextTick(() => {
    context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
  })
}

function changePropsData() {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
    node.props = {
      ...node.props,
      ...propsData.value.props,
    }
    if (propsData.value?.props?.elText)
      node.children[0] = propsData.value?.props?.elText
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
  nextTick(() => {
    context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
  })
}

// 监听插槽变化
watch(() => slotsData.value, (newValue) => {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), context?.workspaceRef?.value?.selectComponent?.id, (node: Schema) => {
    node.children = (node.children as Schema[])?.map((item) => {
      return {
        ...item,
        slotName: item.slotName ?? 'default',
        slotHidden: newValue.slots[item.slotName ?? 'default'],
      }
    })
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
  nextTick(() => {
    context?.workspaceRef?.value.rendererRef.instanceBus?.[getSchemaInstanceName(context?.workspaceRef?.value?.selectComponent)]?.updateRender()
  })
}, {
  deep: true,
})

// 选中组件改变时
watch(() => context?.workspaceRef?.value?.selectComponent, (newValue) => {
  findAndModifyById(deepCopy(context?.workspaceRef?.value.schema), newValue?.id, (node: Schema) => {
    propsData.value = {
      props: node.props,
    }
    fieldData.value = {
      field: {
        id: node.id,
        name: node.name,
        label: node.label,
        field: node.field,
      },
    }
    if (!slotsData.value) {
      slotsData.value = {
        slots: {},
      }
    }
    if (node?.type === 'al-text') {
      propsData.value.props['al-text'] = String(node.children?.[0])
    }
    (node?.children as Schema[])?.map((slot: Schema) => {
      slotsData.value.slots[slot.slotName ?? 'default'] = slot.slotHidden ? slot.slotHidden : false
    })
    compAttrsRef.value?.updateComponent(propsData.value)
    fieldRef.value?.updateComponent(fieldData.value)
    slotsRef.value?.updateComponent(slotsData.value)
  })
}, {
  deep: true,
})
</script>

<template>
  <AlCollapse :model-value="['1', '2', '3']">
    <AlCollapseItem v-show="context?.workspaceRef?.value?.selectComponent?.id !== PAGE_COMP" title="基础属性" name="1">
      <div class="p-4">
        <AlRenderer ref="fieldRef" v-model="fieldData" :schemas="context?.workspaceRef?.value?.selectComponent?.field === PAGE_COMP ? {} : FieldAttrsSchema(changeFieldData)" />
      </div>
    </AlCollapseItem>
    <AlCollapseItem title="组件属性" name="2">
      <div class="p-4">
        <AlRenderer ref="compAttrsRef" v-model="propsData" :schemas="context?.workspaceRef?.value?.selectComponent?.field === PAGE_COMP ? FormAttrsSchema : propsSchema" />
      </div>
    </AlCollapseItem>
    <AlCollapseItem v-if="context?.workspaceRef?.value?.selectComponent?.id !== PAGE_COMP && compSchema?.slots?.()!" title="插槽属性" name="3">
      <div class="p-4">
        <AlRenderer ref="slotsRef" v-model="slotsData" :schemas="compSchema?.slots?.()!" />
      </div>
    </AlCollapseItem>
  </AlCollapse>
</template>

<style lang="scss" scoped>
.el-collapse {
  --el-collapse-header-height: 38px;
}
</style>
