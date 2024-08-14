<script setup lang="ts">
import {
  AlButton,
  AlHeader,
  AlIcon,
  AlPopconfirm,
  AlSwitch,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'

import { useHeaderTools } from '../hooks/use-header-tools.ts'

import { DeviceEnum, DragForm, OperationCache } from '@/designer'

export interface HeaderToolsProps {
  device: string
  deviceChange: any
  config: any
  workspacePreviewConfig: DragForm
  workspaceEditConfig: DragForm
  previewDialogConfig: DragForm
  getOptionsJson: any
  clearActiveRule: any
  setRule: any
  getOption: any
  operation: OperationCache
  unloadStatus: any
  addOperationRecord: any
}

defineProps<HeaderToolsProps>()

const {
  handleSave,
  getConfig,
  prevOperationRecord,
  nextOperationRecord,
  openPreview,
  clearDragRule,
  openInputData,
} = useHeaderTools()
</script>

<template>
  <AlHeader class="flex items-center h-[40px] justify-between" height="45">
    <div class="flex items-center">
      <template v-if="!workspacePreviewConfig.isShow">
        <template v-if="getConfig('showDevice') !== false">
          <AlIcon class="cursor-pointer mx-1" :class="device === DeviceEnum.PC ? 'text-blue-600' : ''" @click="deviceChange(DeviceEnum.PC)">
            <Icon icon="grommet-icons:personal-computer" />
          </AlIcon>
          <AlIcon class="cursor-pointer mx-1" :class="device === DeviceEnum.PAD ? 'text-blue-600' : ''" @click="deviceChange(DeviceEnum.PAD)">
            <Icon icon="mingcute:pad-line" />
          </AlIcon>
          <AlIcon class="cursor-pointer mx-1" :class="device === DeviceEnum.MOBILE ? 'text-blue-600' : ''" @click="deviceChange(DeviceEnum.MOBILE)">
            <Icon icon="fa:mobile" />
          </AlIcon>
          <div class="line" />
        </template>
        <div class="flex items-center">
          <AlIcon
            class="cursor-pointer mx-1"
            :class="!operation.list[operation.index - 1] ? 'text-gray-400 cursor-not-allowed' : ''"
            @click="prevOperationRecord"
          >
            <Icon icon="ant-design:caret-left-filled" />
          </AlIcon>
          <AlIcon
            class="cursor-pointer mx-1"
            :class="!operation.list[operation.index + 1] ? 'text-gray-400 cursor-not-allowed' : ''"
            @click="nextOperationRecord"
          >
            <Icon icon="ant-design:caret-right-filled" />
          </AlIcon>
        </div>
      </template>
    </div>
    <div class="flex items-center">
      <template v-if="!workspacePreviewConfig.isShow">
        <slot name="handle" />
        <AlButton
          v-if="getConfig('showSaveBtn', false)" type="success" plain size="small"
          @click="handleSave"
        >
          <AlIcon
            class="mr-1"
          >
            <Icon icon="ant-design:save-outlined" />
          </AlIcon>
          保存
        </AlButton>
        <AlButton
          type="primary" plain size="small"
          @click="openPreview"
        >
          <AlIcon
            class="mr-1"
          >
            <Icon icon="ant-design:eye-filled" />
          </AlIcon>
          预览
        </AlButton>
        <AlPopconfirm
          title="清空后将不能恢复，确定要清空吗？"
          width="200px"
          confirm-button-text="清空"
          cancel-button-text="取消"
          @confirm="clearDragRule"
        >
          <template #reference>
            <AlButton type="danger" plain size="small">
              <AlIcon
                class="mr-1"
              >
                <Icon icon="ant-design:delete-filled" />
              </AlIcon>
              清空
            </AlButton>
          </template>
        </AlPopconfirm>
      </template>
      <div class="line" />
      <div class="text-sm flex items-center">
        <span>录入数据：</span>
        <AlSwitch
          size="small" :model-value="workspacePreviewConfig.isShow" inline-prompt
          @update:model-value="openInputData"
        />
      </div>
    </div>
  </AlHeader>
</template>
