<script setup lang="ts">
import { AlRenderer } from '@ai-lowcode/core'
import {
  AlButton,
  AlDialog,
  AlHeader,
  AlIcon,
  AlPopconfirm,
} from '@ai-lowcode/element-plus'
import { deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'

import { computed, inject, ref } from 'vue'

import { DeviceEnum } from '@/enums'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext, Schema } from '@/types'
import { removeAlDragBoxAndPromoteChildren } from '@/utils'

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

// schema码
const schema = ref<Array<Schema>>()

// 预览显示
const visiblePreview = ref(false)

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

// 工作区options
const options = computed(() => context?.workspaceRef?.value.options)

// 清除页面内容
function clearPage() {
  context?.workspaceRef?.value.clearPage()
}

/**
 * 预览页面
 */
function previewPage() {
  schema.value = removeAlDragBoxAndPromoteChildren(deepCopy(context?.workspaceRef?.value.schema))
  visiblePreview.value = true
}
</script>

<template>
  <AlHeader class="flex items-center h-[40px] justify-between border border-solid border-[#e3e3e3] bg-white" height="45">
    <div class="flex items-center">
      <AlIcon v-for="(item, index) in devices" :key="index" class="cursor-pointer mx-1 duration-300" :class="item.device === context?.workspaceRef?.value?.currentDevice ? 'text-blue-600' : ''" @click="context?.workspaceRef?.value?.changeDevice(item.device)">
        <Icon :icon="item.icon" />
      </AlIcon>
      <div class="flex items-center">
        <AlIcon
          class="cursor-pointer mx-1"
        >
          <Icon icon="ant-design:caret-left-filled" />
        </AlIcon>
        <AlIcon
          class="cursor-pointer mx-1"
        >
          <Icon icon="ant-design:caret-right-filled" />
        </AlIcon>
      </div>
    </div>
    <div class="flex items-center">
      <AlButton
        type="success" plain size="small"
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
        @click="previewPage"
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
        @confirm="clearPage"
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
    </div>
    <AlDialog v-model="visiblePreview" title="页面预览" width="800">
      <!-- 工作区表单展示区 -->
      <AlRenderer v-if="visiblePreview" :schemas="schema!" :options="options" />
    </AlDialog>
  </AlHeader>
</template>
