<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { AlCollapse, AlCollapseItem } from '@ai-lowcode/element-plus'

import { computed, inject, ref, watch } from 'vue'

import { FieldAttrsSchema } from '../schema/field.ts'
import { FormAttrsSchema } from '../schema/form.ts'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import componentSchemaList from '@/schema'
import { DesignerContext, Schema } from '@/types'
import { findAndModifyById } from '@/utils'

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

const compSchema = computed(() => componentSchemaList.find(item => item.name === context?.selectComponent?.value.name))

// 监听字段变化
watch(() => fieldData.value, (newValue) => {
  if (context?.workspaceRef?.value?.schema) {
    // 调用函数，查找并修改
    const newNodes = findAndModifyById(context?.workspaceRef?.value.schema, context?.selectComponent?.value.id, (node: Schema) => {
      if (newValue?.field?.id)
        node.id = newValue.field.id
      if (newValue?.field?.name)
        node.name = newValue.field.name
      if (newValue?.field?.label)
        node.label = newValue.field.label
    })
    context?.workspaceRef?.value.changeSchema(newNodes)
  }
}, {
  deep: true,
})

// 监听属性变化
watch(() => propsData.value, (newValue) => {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(context?.workspaceRef?.value.schema, context?.selectComponent?.value.id, (node: Schema) => {
    node.props = {
      ...node.props,
      ...newValue.props,
    }
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
}, {
  deep: true,
})

// 监听插槽变化
watch(() => slotsData.value, (newValue) => {
  // 调用函数，查找并修改
  const newNodes = findAndModifyById(context?.workspaceRef?.value.schema, context?.selectComponent?.value.id, (node: Schema) => {
    node.children = (node.children as Schema[])?.map((item) => {
      return {
        ...item,
        slotName: item.slotName ?? 'default',
        slotHidden: newValue.slots[item.slotName ?? 'default'],
      }
    })
  })
  context?.workspaceRef?.value.changeSchema(newNodes)
  slotsRef.value?.updateComponent(newValue)
}, {
  deep: true,
})

// 选中组件改变时
watch(() => context?.selectComponent, (newValue) => {
  findAndModifyById(context?.workspaceRef?.value.schema, newValue?.value.id, (node: Schema) => {
    propsData.value = {
      props: node.props,
    }
    fieldData.value = {
      field: {
        id: node.id,
        name: node.name,
        label: node.label,
      },
    }
    if (!slotsData.value) {
      slotsData.value = {
        slots: {},
      }
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
    <AlCollapseItem v-if="context?.selectComponent?.value?.id !== PAGE_COMP" title="基础属性" name="1">
      <div class="p-4">
        <AlRenderer ref="fieldRef" v-model="fieldData" :schemas="FieldAttrsSchema" />
      </div>
    </AlCollapseItem>
    <AlCollapseItem title="组件属性" name="2">
      <div class="p-4">
        <AlRenderer ref="compAttrsRef" v-model="propsData" :schemas="context?.selectComponent?.value?.id === PAGE_COMP ? FormAttrsSchema : compSchema?.props()!" />
      </div>
    </AlCollapseItem>
    <AlCollapseItem v-if="context?.selectComponent?.value?.id !== PAGE_COMP && compSchema?.slots?.()!" title="插槽属性" name="3">
      <div class="p-4">
        <AlRenderer ref="slotsRef" v-model="slotsData" :schemas="compSchema?.slots?.()!" />
      </div>
    </AlCollapseItem>
  </AlCollapse>
</template>

<style lang="scss" scoped>
.el-collapse {
  --el-collapse-header-height: 38px;
  --el-collapse-header-text-color: #6e6e6e;
  --el-collapse-header-bg-color:#f8f8f8;
  --el-collapse-border-color: #e3e3e3;
}
</style>
