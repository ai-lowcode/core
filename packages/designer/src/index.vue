<script lang="ts" setup>
import { AlContainer } from '@ai-lowcode/element-plus'

import { provide, ref } from 'vue'

import { AlAttrsPanel } from '@/components/attrs-panel'
import { AlComponentsPanel } from '@/components/components-panel'
import { AlHeader } from '@/components/header'
import { AlWorkspace } from '@/components/workspace'

import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext, Schema } from '@/types'

defineOptions({
  name: 'AlDesigner',
})

const selectComponent = ref<Schema>({
  field: PAGE_COMP,
} as Schema)

const workspaceRef = ref()

// 注入designer全局上下文
provide<DesignerContext>(DESIGNER_CTX, {
  selectComponent,
  changeComponentSelect: (comp: Schema) => {
    if (comp?.id !== selectComponent.value?.id)
      selectComponent.value = comp
  },
  workspaceRef,
})
</script>

<template>
  <AlContainer style="height: 100vh" class="p-4">
    <AlComponentsPanel />
    <AlContainer class="flex flex-col">
      <AlHeader />
      <AlWorkspace ref="workspaceRef" />
    </AlContainer>
    <AlAttrsPanel />
  </AlContainer>
</template>
