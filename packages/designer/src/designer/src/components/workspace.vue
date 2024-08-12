<script setup lang="ts">
import { AlButton, AlMain } from '@ai-lowcode/element-plus'

import { useWorkspace } from '../hooks/use-workspace.ts'

import { DeviceEnum, DragForm, Rule, designerForm, viewForm } from '@/designer'

defineProps<{
  activeRule: Rule
  device: DeviceEnum
  workspacePreviewConfig: DragForm
  workspaceEditConfig: DragForm
  formOptions: any
  getJson: any
  addOperationRecord: any
}>()

const ViewForm = viewForm.$form()
const DragFormView = designerForm.$form()
const {
  t,
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
      :style="{ '--fc-drag-empty': `'${t('designer.dragEmpty')}'`, '--fc-child-empty': `'${t('designer.childEmpty')}'` }"
    >
      <div v-if="workspacePreviewConfig.state">
        <ViewForm
          :key="workspacePreviewConfig.key"
          v-model:api="inputFormApi" class="h-full" :rule="workspacePreviewConfig.rule"
          :option="workspacePreviewConfig.options" :disabled="false"
        />
      </div>
      <!-- 工作区表单展示区 -->
      <DragFormView
        v-else v-model:api="dragFormApi" :rule="workspaceEditConfig.rule"
        :option="formOptions"
      />
    </div>
    <div v-if="workspacePreviewConfig.state" class="absolute left-0 right-0 bottom-4 flex justify-center pt-[10px]" style="box-shadow: 0 -8px 20px 0 rgb(0 0 0 / 10%)">
      <AlButton plain @click="inputClear()">
        {{ t('props.clear') }}
      </AlButton>
      <AlButton plain @click="inputReset()">
        {{ t('props.reset') }}
      </AlButton>
      <AlButton type="primary" plain @click="inputSave()">
        {{ t('props.save') }}
      </AlButton>
    </div>
  </AlMain>
</template>
