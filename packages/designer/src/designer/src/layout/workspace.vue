<script setup lang="ts">
import { AlButton, AlMain } from '@ai-lowcode/element-plus'

import { useWorkspace } from '../hooks/use-workspace.ts'

import { DeviceEnum, DragForm, Rule, designerForm, viewForm } from '@/designer'

export interface WorkspaceProps {
  activeRule?: Rule
  device: DeviceEnum
  workspacePreviewConfig: DragForm
  workspaceEditConfig: DragForm
}

defineProps<WorkspaceProps>()

const ViewForm = viewForm.$form()
const DragFormView = designerForm.$form()
const {
  workspaceScale,
  inputFormApi,
  dragFormApi,
  inputClear,
  inputReset,
  inputSave,
} = useWorkspace()
</script>

<template>
  <AlMain class="relative bg-[#F5F5F5] flex items-center justify-center" style="background-image: linear-gradient(#fafafc 14px,transparent 0),linear-gradient(90deg,transparent 14px,#373739 0);background-size: 15px 15px;">
    <div
      class="relative bg-white h-full border border-dashed border-gray-200 p-[16px] duration-300 overflow-auto"
      :style="`transform: scale(${workspaceScale});`"
      :class="device"
    >
      <div v-if="workspacePreviewConfig.isShow">
        <ViewForm
          :key="workspacePreviewConfig.key"
          v-model:api="inputFormApi" class="h-full" :rule="workspacePreviewConfig.rule"
          :option="workspacePreviewConfig.options" :disabled="false"
        />
      </div>
      <!-- 工作区表单展示区 -->
      <DragFormView
        v-else v-model:api="dragFormApi" :rule="workspaceEditConfig.rule"
        :option="workspaceEditConfig.options"
      />
    </div>
    <div v-if="workspacePreviewConfig.isShow" class="absolute left-0 right-0 bottom-4 flex justify-center pt-[10px]" style="box-shadow: 0 -8px 20px 0 rgb(0 0 0 / 10%)">
      <AlButton plain @click="inputClear()">
        清空
      </AlButton>
      <AlButton plain @click="inputReset()">
        重置
      </AlButton>
      <AlButton type="primary" plain @click="inputSave()">
        保存
      </AlButton>
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
  height: 94%;
}
</style>
