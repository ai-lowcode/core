<script lang="ts" setup>
import {
  AlButton,
  AlDialog,
  AlEmpty,
  AlForm,
  AlFormItem,
  AlIcon,
  AlInput,
  AlPopover,
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/component-adapter'
import { Icon } from '@iconify/vue'

import { usePage } from '../hooks/use-page.ts'

const {
  pageCreateRef,
  pageRef,
  isEdit,
  handlePage,
  pageList,
  visiblePageCreate,
  context,
  selectPage,
  pageCreateData,
  createPage,
  copyPage,
  editPage,
  deletePage,
  pageCreateDialog,
} = usePage()
</script>

<template>
  <AlPopover
    placement="bottom-start"
    :width="360"
    :hide-after="0"
    trigger="click"
    @show="handlePage"
  >
    <template #reference>
      <AlButton size="small" text bg>
        <AlIcon size="14" class="mr-1">
          <Icon icon="iconoir:page" />
        </AlIcon>
        {{ context?.workspaceRef?.value?.currentSelectPage?.pageName }}
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
      <div ref="pageRef" class="mt-3 min-h-[200px]">
        <template v-if="pageList?.length">
          <div v-for="(page, index) in pageList" :key="index" class="flex my-1 justify-between items-center px-2 py-1 cursor-pointer hover:bg-[#f5f5f5]">
            <div
              class="flex items-center"
              :class="{
                'text-blue-600': context?.workspaceRef?.value?.currentSelectPage?.pageSlug === page?.pageSlug,
              }"
              @click="selectPage(page)"
            >
              <AlIcon class="mr-1">
                <Icon icon="material-symbols-light:home" />
              </AlIcon>
              <div>{{ page?.pageName }}</div>
            </div>
            <div class="flex items-center">
              <AlIcon class="mr-2" @click="copyPage(page)">
                <Icon icon="ph:copy-fill" />
              </AlIcon>
              <AlIcon class="mr-2" @click="editPage(page)">
                <Icon icon="bxs:edit" />
              </AlIcon>
              <AlIcon @click="deletePage(page)">
                <Icon icon="material-symbols:delete-outline" />
              </AlIcon>
            </div>
          </div>
        </template>
        <AlEmpty v-else description="暂无数据" :image-size="88" />
      </div>
    </div>
  </AlPopover>
  <AlDialog v-model="visiblePageCreate" :title="isEdit ? '页面编辑' : '页面新建'" width="800" class="page-create">
    <AlTabs size="small" type="card">
      <AlTabPane class="flex bg-[#f5f5f5]" label="全部">
        <div class="flex-1">
          全部
        </div>
        <div class="w-[200px] p-4 bg-white">
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
              prop="pageName"
              label="名称"
              required
            >
              <AlInput v-model="pageCreateData.pageName" />
            </AlFormItem>
            <AlFormItem
              prop="pageSlug"
              label="标识"
              required
            >
              <AlInput v-model="pageCreateData.pageSlug" />
            </AlFormItem>
            <AlFormItem
              prop="pageDescribe"
              label="描述"
            >
              <AlInput v-model="pageCreateData.pageDescribe" type="textarea" />
            </AlFormItem>
            <div class="w-full flex justify-end">
              <AlButton type="primary" @click="createPage">
                {{ isEdit ? '更新' : '新建' }}
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
</template>
