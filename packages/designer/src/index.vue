<script lang="ts" setup>
import type { Schema } from '@ai-lowcode/core'

import { AlContainer } from '@ai-lowcode/element-plus'
import { provide, ref } from 'vue'

import { AlAttrsPanel, AlComponentsPanel, AlHeader, AlWorkspace } from '@/components'
import { AlFooter } from '@/components/footer'
import { DESIGNER_CTX, PAGE_COMP } from '@/global'
import { DesignerContext } from '@/types'

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
  <div class="h-full flex">
    <AlComponentsPanel />
    <AlContainer class="flex flex-col">
      <AlHeader />
      <AlWorkspace ref="workspaceRef" />
      <AlFooter />
    </AlContainer>
    <AlAttrsPanel />
  </div>
</template>
