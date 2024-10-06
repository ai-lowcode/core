<script lang="ts" setup>
import {
  AlButton,
  AlDialog,
  AlEmpty,
  AlForm,
  AlFormItem,
  AlIcon,
  AlInput,
  AlLoading,
  AlMessage,
  AlMessageBox,
  AlPopover,
  AlTabPane,
  AlTabs,
} from '@ai-lowcode/element-plus'
import { ResponseCodeEnum, lowCodePageApi } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'
import { inject, ref } from 'vue'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { createDragBoxTemplate, createPageTemplate } from '@/utils'

export interface PageType {
  id?: string
  pageName: string
  pageSlug: string
  pageDescribe: string
  pageContent: string
}

// 页面 ref
const pageRef = ref()

// 页面创建 ref
const pageCreateRef = ref()

const isEdit = ref(false)

// 页面列表
const pageList = ref<Array<PageType>>([])

// 显示页面创建
const visiblePageCreate = ref<boolean>(false)

// 全局上下文
const context = inject<DesignerContext>(DESIGNER_CTX)

// 页面创建数据
const pageCreateData = ref<PageType>({
  pageName: '',
  pageSlug: '',
  pageDescribe: '',
  pageContent: JSON.stringify([
    createDragBoxTemplate(
      createPageTemplate(),
      {
        class: 'p-2 h-full',
      },
    ),
  ]),
})

/**
 * 创建页面
 */
function pageCreateDialog() {
  visiblePageCreate.value = true
  isEdit.value = false
}

/**
 * 选择页面
 * @param page
 */
function selectPage(page: PageType) {
  context?.workspaceRef?.value?.changeSelectPage(page)
  context?.workspaceRef?.value?.updateRenderer()
}

/**
 * 编辑页面
 * @param page
 */
function editPage(page: PageType) {
  pageCreateData.value = page
  visiblePageCreate.value = true
  isEdit.value = true
}

async function copyPage(page: PageType) {
  await AlMessageBox.confirm(
    '复制当前页面?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '复制中..'
          try {
            await lowCodePageApi.add({
              pageContent: page.pageContent,
              pageName: `${page.pageName}-${new Date().getTime()}`,
              pageSlug: `${page.pageSlug}-${new Date().getTime()}`,
            })
          }
          catch (e: any) {
            AlMessage.error(e)
          }
          instance.confirmButtonLoading = false
          done()
        }
        else {
          done()
        }
      },
    },
  )
}

async function deletePage(page: PageType) {
  await AlMessageBox.confirm(
    '删除当前页面?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '删除中..'
          try {
            await lowCodePageApi.delete(page.id!)
          }
          catch (e: any) {
            AlMessage.error(e)
          }
          instance.confirmButtonLoading = false
          done()
        }
        else {
          done()
        }
      },
    },
  )
}

/**
 * 加载页面
 */
async function handlePage() {
  const loading = AlLoading.service({
    text: 'Loading',
    target: pageRef.value,
  })
  const { data } = await lowCodePageApi.list()
  pageList.value = data?.list
  loading.close()
}

/**
 * 创建页面
 */
function createPage() {
  pageCreateRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { code } = pageCreateData.value?.id
        ? await lowCodePageApi.update(pageCreateData.value)
        : await lowCodePageApi.add(pageCreateData.value)
      if (code === ResponseCodeEnum.SUCCESS) {
        visiblePageCreate.value = false
      }
    }
    else {
      console.log('error submit!')
    }
  })
}
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
