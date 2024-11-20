<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  AlHeader,
  AlIcon,
  AlSlider,
} from '@zero-dim/component-adapter'

import { computed, inject } from 'vue'

import { DeviceEnum } from '@/enums'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'

// 设备
const devices = [
  {
    device: DeviceEnum.PC,
    icon: 'grommet-icons:personal-computer',
  },
  {
    device: DeviceEnum.PAD,
    icon: 'mingcute:pad-line',
  },
  {
    device: DeviceEnum.MOBILE,
    icon: 'fa:mobile',
  },
]

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

// 工作区缩放
const workspaceScale = computed({
  get() {
    return context?.workspaceRef?.value?.workspaceScale
  },
  set(newValue) {
    context?.workspaceRef?.value?.changeWorkspaceScale(newValue)
  },
})
</script>

<template>
  <AlHeader class="flex items-center h-[40px] px-2 justify-between border border-solid border-basic-color bg-basic-color" height="45">
    <div class="flex items-center" />
    <div class="flex items-center footer-tools">
      <AlIcon v-for="(item, index) in devices" :key="index" class="cursor-pointer mx-1 duration-300" :class="item.device === context?.workspaceRef?.value?.currentDevice ? 'text-active-color' : ''" @click="context?.workspaceRef?.value?.changeDevice(item.device)">
        <Icon :icon="item.icon" />
      </AlIcon>
      <AlSlider v-model="workspaceScale" size="small" :min="0" :max="1" :step="0.01" class="w-[100px] mx-2" />
    </div>
  </AlHeader>
</template>

<style lang="scss" scoped>
:deep(.footer-tools) {
  .el-slider {
    --el-slider-button-wrapper-size: 16px;
    --el-slider-button-size: 14px;
    --el-slider-height: 4px;
    --el-slider-button-wrapper-offset: -10px;
  }
}
</style>
