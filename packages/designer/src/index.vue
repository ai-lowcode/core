<script lang="ts" setup>
import { AlContainer } from '@ai-lowcode/element-plus'

import { provide, ref } from 'vue'

import AttrsPanel from './layout/attrs-panel/index.vue'
import ComponentsPanel from './layout/components-panel/index.vue'
import Header from './layout/header/index.vue'
import Workspace from './layout/workspace/index.vue'

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
    selectComponent.value = comp
  },
  workspaceRef,
})
</script>

<template>
  <AlContainer style="height: 100vh" class="p-4">
    <ComponentsPanel />
    <AlContainer class="flex flex-col">
      <Header />
      <Workspace ref="workspaceRef" />
    </AlContainer>
    <AttrsPanel />
  </AlContainer>
</template>
