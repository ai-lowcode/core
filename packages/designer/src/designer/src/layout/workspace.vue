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
  inputFormApi,
  dragFormApi,
  inputClear,
  inputReset,
  inputSave,
} = useWorkspace()
</script>

<template>
  <AlMain class="relative bg-[#F5F5F5] p-2">
    <div
      class="relative bg-white h-full"
      :class="device"
      :style="{ '--fc-drag-empty': `'拖拽左侧列表中的组件到此处'`, '--fc-child-empty': `'点击右下角 \e789  按钮添加一列'` }"
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
