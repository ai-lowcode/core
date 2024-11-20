<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  AlButton,
  AlDialog,
  AlHeader,
  AlIcon,
  AlPopconfirm,
} from '@zero-dim/component-adapter'
import { AlRenderer } from '@zero-dim/core'

import Page from './components/page.vue'
import { useHeader } from './hooks/use-header.ts'

const {
  visiblePreview,
  schema,
  options,
  savePage,
  previewPage,
  clearPage,
} = useHeader()
</script>

<template>
  <AlHeader class="flex items-center px-2 h-[40px] justify-between border border-solid border-basic-color bg-basic-color" height="45">
    <div class="flex items-center">
      <Page />
      <div class="flex items-center ml-2">
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
        circle size="small"
        @click="savePage"
      >
        <AlIcon class="text-green-600">
          <Icon icon="ant-design:save-outlined" />
        </AlIcon>
      </AlButton>
      <AlButton
        circle size="small"
        @click="previewPage"
      >
        <AlIcon class="text-blue-600">
          <Icon icon="ant-design:eye-filled" />
        </AlIcon>
      </AlButton>
      <AlPopconfirm
        title="清空后将不能恢复，确定要清空吗？"
        width="200px"
        confirm-button-text="清空"
        cancel-button-text="取消"
        @confirm="clearPage"
      >
        <template #reference>
          <AlButton circle size="small">
            <AlIcon class="text-red-600">
              <Icon icon="ant-design:delete-filled" />
            </AlIcon>
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

<style lang="scss" scoped>
:deep(.page-create) {
  .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }

  .el-form-item--label-top .el-form-item__label {
    margin-bottom: 2px;
  }

  .el-tabs__header {
    margin: 0;
  }
}
</style>
