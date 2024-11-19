<script setup lang="ts">
import { AlMain } from '@ai-lowcode/component-adapter'
import { AlRenderer } from '@ai-lowcode/core'

import { useWorkspace } from './hooks/use-workspace.ts'

const {
  formData,
  changeComponentSort,
  deleteComponent,
  copyComponent,
  insertComponent,
  currentDevice,
  changeDevice,
  clearPage,
  changeSchema,
  workspaceScale,
  currentSelectPage,
  changeSelectPage,
  changeWorkspaceScale,
  schema,
  selectComponent,
  rendererRef,
  changeComponentSelect,
  updateRenderer,
} = useWorkspace()

defineExpose({
  changeComponentSort,
  deleteComponent,
  copyComponent,
  insertComponent,
  currentDevice,
  changeDevice,
  clearPage,
  changeSchema,
  workspaceScale,
  currentSelectPage,
  changeSelectPage,
  changeWorkspaceScale,
  schema,
  selectComponent,
  rendererRef,
  changeComponentSelect,
  updateRenderer,
})
</script>

<template>
  <AlMain class="relative bg-workspace-white bg-[#f5f5f5] dark:bg-workspace-dark dark:bg-[#18181c] flex items-center justify-center" style="background-size: 15px 15px;">
    <div
      class="relative bg-basic-color h-full p-[2px] duration-300 overflow-auto workspace shadow-workspace"
      :style="`transform: scale(${workspaceScale});`"
      :class="currentDevice"
    >
      <!-- 工作区表单展示区 -->
      <AlRenderer ref="rendererRef" v-model="formData" :schemas="schema" />
    </div>
  </AlMain>
</template>

<style lang="scss" scoped>
.mobile {
  width: 390px;
  height: 694px;
}

.pad {
  width: 780px;
  height: 694px;
}

.pc{
  width: 100%;
  height: 100%;
}
</style>
