<script lang="ts" setup>
import { AlCollapse, AlCollapseItem } from '@zero-dim/component-adapter'
import { AlRenderer } from '@zero-dim/core'

import { useAttrs } from '../hooks/use-attrs.ts'

import { FieldAttrsSchema } from '../schema/field.ts'
import { FormAttrsSchema } from '../schema/form.ts'

import { PAGE_COMP } from '@/global'

defineOptions({
  name: 'Attrs',
})

const {
  fieldRef,
  compAttrsRef,
  slotsRef,
  slotsData,
  compSchema,
  propsData,
  propsSchema,
  fieldData,
  context,
  changeFieldData,
} = useAttrs()
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
