<script lang="ts" setup>
import { AlContainer } from '@ai-lowcode/element-plus'
import { provide, ref } from 'vue'

import { AlAttrsPanel, AlComponentsPanel, AlHeader, AlWorkspace } from '@/components'
import { AlFooter } from '@/components/footer'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'

defineOptions({
  name: 'AlDesigner',
})

const workspaceRef = ref()

// 注入designer全局上下文
provide<DesignerContext>(DESIGNER_CTX, {
  workspaceRef,
})
</script>

<template>
  <div class="h-full flex">
    <AlComponentsPanel />
    <AlContainer class="flex flex-col flex-1">
      <AlHeader />
      <AlWorkspace ref="workspaceRef" />
      <AlFooter />
    </AlContainer>
    <AlAttrsPanel />
  </div>
</template>
