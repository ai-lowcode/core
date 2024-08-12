<script setup lang="ts">
import {
  AlButton,
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlHeader,
  AlIcon,
  AlPopconfirm,
  AlSwitch,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'

import { useHeaderTools } from '../hooks/use-header-tools.ts'

import { DeviceEnum, DragForm, Handle } from '@/designer'

defineProps<{
  workspacePreviewConfig: DragForm
  device: string
  deviceChange: any
  operation: any
  handle: Handle
  config: any
  workspaceEditConfig: DragForm
  formOptions: any
  unloadStatus: any
  previewDialogConfig: DragForm
  getJson: any
  getOptionsJson: any
  clearActiveRule: any
  setRule: any
  addOperationRecord: any
  getOption: any
}>()

const {
  triggerHandle,
  handleSave,
  getConfig,
  t,
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
      <template v-if="!workspacePreviewConfig.state">
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
            :class="{ disabled: !operation.list[operation.idx - 1] }"
            @click="prevOperationRecord"
          >
            <Icon icon="ant-design:caret-left-filled" />
          </AlIcon>
          <AlIcon
            class="cursor-pointer mx-1"
            :class="{ disabled: !operation.list[operation.idx + 1] }"
            @click="nextOperationRecord"
          >
            <Icon icon="ant-design:caret-right-filled" />
          </AlIcon>
        </div>
      </template>
    </div>
    <div class="flex items-center">
      <template v-if="!workspacePreviewConfig.state">
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
          {{
            t('props.save')
          }}
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
          {{
            t('props.preview')
          }}
        </AlButton>
        <AlPopconfirm
          :title="t('designer.clearWarn')"
          width="200px"
          :confirm-button-text="t('props.clear')"
          :cancel-button-text="t('props.cancel')"
          @confirm="clearDragRule"
        >
          <template #reference>
            <AlButton type="danger" plain size="small">
              <AlIcon
                class="mr-1"
              >
                <Icon icon="ant-design:delete-filled" />
              </AlIcon>
              {{ t('props.clear') }}
            </AlButton>
          </template>
        </AlPopconfirm>
        <AlDropdown v-if="handle && handle.length" trigger="click" size="default">
          <AlButton class="mx-4" plain size="small">
            <AlIcon>
              <Icon icon="ant-design:more-outlined" />
            </AlIcon>
          </AlButton>
          <template #dropdown>
            <AlDropdownMenu>
              <AlDropdownItem v-for="item in handle" :key="item.label" @click.stop="triggerHandle(item)">
                <div>{{ item.label }}</div>
              </AlDropdownItem>
            </AlDropdownMenu>
          </template>
        </AlDropdown>
      </template>
      <div class="line" />
      <div class="text-sm flex items-center">
        <span>{{
          t('props.inputData')
        }}：</span>
        <AlSwitch
          size="small" :model-value="workspacePreviewConfig.state" inline-prompt
          @update:model-value="openInputData"
        />
      </div>
    </div>
  </AlHeader>
</template>
