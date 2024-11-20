<script lang="ts" setup>
import { AlContainer } from '@zero-dim/component-adapter'
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
    <!--    左侧面板 -->
    <AlComponentsPanel />
    <AlContainer class="flex flex-col flex-1">
      <AlHeader />
      <AlWorkspace ref="workspaceRef" />
      <AlFooter />
    </AlContainer>
    <!--    属性面板 -->
    <AlAttrsPanel />
  </div>
</template>
