<script setup lang="ts">
import { AlRenderer, Schema } from '@ai-lowcode/core'
import {
  AlButton,
  AlDialog,
  AlHeader,
  AlIcon,
  AlPopconfirm,
} from '@ai-lowcode/element-plus'
import { AlHttp } from '@ai-lowcode/request'
import { convertFunctionsToStrings, deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'

import { computed, inject, ref } from 'vue'

import Page from './components/page.vue'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { removeAlDragBoxAndPromoteChildren } from '@/utils'

// schema码
const schema = ref<Array<Schema>>()

// 预览显示
const visiblePreview = ref(false)

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

// 工作区options
const options = computed(() => context?.workspaceRef?.value.options)

/**
 * 清除页面内容
 */
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

/**
 * 保存页面
 */
async function savePage() {
  await AlHttp.put(`/lowcode/pages/${context?.workspaceRef?.value?.currentSelectPage?.id}`, {
    ...context?.workspaceRef?.value?.currentSelectPage,
    content: JSON.stringify(convertFunctionsToStrings(context?.workspaceRef?.value?.schema)),
  }, {
    isShowSuccessMessage: true,
    successMessageText: '保存成功',
  })
}
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
        bg text size="small"
        @click="savePage"
      >
        <AlIcon class="text-green-600">
          <Icon icon="ant-design:save-outlined" />
        </AlIcon>
      </AlButton>
      <AlButton
        bg text size="small"
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
          <AlButton bg text size="small">
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
