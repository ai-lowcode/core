<script setup lang="ts">
import { AlRenderer, Schema } from '@ai-lowcode/core'
import {
  AlButton,
  AlDialog,
  AlEmpty,
  AlForm,
  AlFormItem,
  AlHeader,
  AlIcon,
  AlInput,
  AlMessage,
  AlPopconfirm,
  AlPopover,
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import { AlHttp, ResponseCodeEnum } from '@ai-lowcode/request'
import { deepCopy } from '@ai-lowcode/utils'
import { Icon } from '@iconify/vue'

import { computed, inject, ref } from 'vue'

import { DeviceEnum } from '@/enums'
import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
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

const pageCreateRef = ref()

const pageList = ref([])

// schema码
const schema = ref<Array<Schema>>()

// 预览显示
const visiblePreview = ref(false)

const visiblePageCreate = ref(false)

const pageCreateData = ref({
  name: '',
  slug: '',
  desc: '',
})

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

async function handlePage() {
  const { data } = await AlHttp.get('/lowcode/pages', {})
  pageList.value = data?.items
}

function pageCreateDialog() {
  visiblePageCreate.value = true
}

function createPage() {
  pageCreateRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { code } = await AlHttp.post('/lowcode/pages', pageCreateData.value)
      if (code === ResponseCodeEnum.SUCCESS)
        AlMessage.success('新增成功')
    }
    else {
      console.log('error submit!')
    }
  })
}

function selectPage(page: any) {
  context?.workspaceRef?.value?.changeSelectPage(page)
}

function convertFunctionsToStrings(input: any | Function): any {
  if (typeof input === 'function') {
    return input.toString()
  }
  else if (Array.isArray(input)) {
    return input.map(item => convertFunctionsToStrings(item))
  }
  else if (typeof input === 'object' && input !== null) {
    const result: any = {}
    for (const [key, value] of Object.entries(input)) {
      result[key] = convertFunctionsToStrings(value)
    }
    return result
  }
  return input
}

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
      <AlPopover
        placement="bottom-start"
        :width="360"
        :hide-after="0"
        trigger="click"
        @show="handlePage"
      >
        <template #reference>
          <AlButton size="small" text bg>
            页面：门户快速开...
          </AlButton>
        </template>
        <div class="p-2">
          <div class="flex items-center justify-between">
            <div>页面</div>
            <AlButton size="small" type="primary" @click="pageCreateDialog">
              <AlIcon class="mr-1">
                <Icon icon="ic:sharp-plus" />
              </AlIcon>
              新建页面
            </AlButton>
          </div>
          <AlInput size="small" class="mt-3" placeholder="搜索页面名称">
            <template #prefix>
              <AlIcon>
                <Icon icon="ic:baseline-search" />
              </AlIcon>
            </template>
          </AlInput>
          <div class="mt-3">
            <template v-if="pageList?.length">
              <div v-for="(page, index) in pageList" :key="index" class="flex my-1 justify-between items-center px-2 py-1 cursor-pointer hover:bg-[#f5f5f5]" @click="selectPage(page)">
                <div
                  class="flex items-center" :class="{
                    'text-blue-600': context?.workspaceRef?.value?.currentSelectPage?.slug === page?.slug,
                  }"
                >
                  <AlIcon class="mr-1">
                    <Icon icon="material-symbols-light:home" />
                  </AlIcon>
                  <div>{{ page?.name }}</div>
                </div>
                <div class="flex items-center">
                  <AlIcon class="mr-2">
                    <Icon icon="uil:setting" />
                  </AlIcon>
                  <AlIcon>
                    <Icon icon="ri:more-fill" />
                  </AlIcon>
                </div>
              </div>
            </template>
            <AlEmpty v-else description="暂无数据" :image-size="88" />
          </div>
        </div>
      </AlPopover>
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
    <AlDialog v-model="visiblePageCreate" title="页面创建" width="800" class="page-create">
      <AlTabs size="small" type="card">
        <AlTabPane class="flex bg-[#f5f5f5]" label="全部">
          <div class="flex-1">
            全部
          </div>
          <div class="w-[200px] p-2 bg-white">
            <div class="text-[16px] font-semibold">
              空白页
            </div>
            <div class="text-xs mt-1">
              你可以创建一个新的空白页面
            </div>
            <AlForm
              ref="pageCreateRef"
              class="mt-4"
              size="small"
              :model="pageCreateData"
              label-position="top"
              label-width="auto"
            >
              <AlFormItem
                prop="name"
                label="名称"
                required
              >
                <AlInput v-model="pageCreateData.name" />
              </AlFormItem>
              <AlFormItem
                prop="slug"
                label="标识"
                required
              >
                <AlInput v-model="pageCreateData.slug" />
              </AlFormItem>
              <AlFormItem
                prop="desc"
                label="描述"
                required
              >
                <AlInput v-model="pageCreateData.desc" />
              </AlFormItem>
              <div class="w-full flex justify-end">
                <AlButton type="primary" @click="createPage">
                  新建
                </AlButton>
              </div>
            </AlForm>
          </div>
        </AlTabPane>
        <AlTabPane label="空白">
          空白
        </AlTabPane>
        <AlTabPane label="数据管理">
          数据管理
        </AlTabPane>
        <AlTabPane label="门户官网">
          门户官网
        </AlTabPane>
      </AlTabs>
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
