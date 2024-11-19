import { AlLoading, AlMessage, AlMessageBox } from '@ai-lowcode/component-adapter'
import { ResponseCodeEnum, lowCodePageApi } from '@ai-lowcode/request'
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

export function usePage() {
  // 页面 ref
  const pageRef = ref()

  // 页面创建 ref
  const pageCreateRef = ref()

  // 编辑页面
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

  /**
   * 复制页面
   * @param page
   */
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

  /**
   * 删除页面
   * @param page
   */
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

  return {
    pageCreateRef,
    pageRef,
    isEdit,
    pageList,
    visiblePageCreate,
    context,
    pageCreateData,
    selectPage,
    handlePage,
    createPage,
    copyPage,
    editPage,
    deletePage,
    pageCreateDialog,
  }
}
