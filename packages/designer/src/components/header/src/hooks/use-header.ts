import { Schema } from '@ai-lowcode/core'
import { lowCodePageApi } from '@ai-lowcode/request'
import { convertFunctionsToStrings, deepCopy } from '@ai-lowcode/utils'
import { computed, inject, ref } from 'vue'

import { DESIGNER_CTX } from '@/global'
import { DesignerContext } from '@/types'
import { removeAlDragBoxAndPromoteChildren } from '@/utils'

export function useHeader() {
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
    await lowCodePageApi.update({
      ...context?.workspaceRef?.value?.currentSelectPage,
      pageContent: JSON.stringify(convertFunctionsToStrings(context?.workspaceRef?.value?.schema)),
    })
  }

  return {
    visiblePreview,
    schema,
    options,
    savePage,
    previewPage,
    clearPage,
  }
}
