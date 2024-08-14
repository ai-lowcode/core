import { deepCopy } from '@ai-lowcode/utils'

import { Ref, nextTick, ref } from 'vue'

import { DragForm, OperationCache, OutLineTree, Rule, designerForm } from '@/designer'
import { getRuleTree, parseRule } from '@/utils'

/**
 * 操作记录 hooks
 * @param workspaceEditConfig
 * @param workspacePreviewConfig
 */
export function useOperationRecordActions({ workspaceEditConfig, workspacePreviewConfig }: {
  workspaceEditConfig: Ref<DragForm>
  workspacePreviewConfig: Ref<DragForm>
}) {
  const unloadStatus = ref<boolean>(false)

  // 大纲树
  const outlineTree = ref<Array<OutLineTree>>()

  // 操作缓存
  const operation = ref<OperationCache>({
    index: -1,
    list: [],
  })

  function getRule() {
    return (workspaceEditConfig.value.rule as Array<Rule>)[0].children && parseRule(deepCopy((workspaceEditConfig.value.rule as Array<Rule>)[0].children))
  }

  function updateOutlineTree() {
    setTimeout(() => {
      nextTick(() => {
        outlineTree.value = getRuleTree(((workspaceEditConfig.value.rule as Array<Rule>)[0].children as Array<Rule>))
      })
    }, 300)
  }

  function addOperationRecord() {
    const rule = designerForm.toJson(getRule())
    const formData = deepCopy(workspacePreviewConfig.value.data)
    const list = operation.value.list.slice(0, operation.value.index + 1)
    list.push({ rule, formData })
    operation.value.list = list
    operation.value.index = list.length - 1
    unloadStatus.value = list.length !== 1
  }

  /**
   * 记录执行之后的动作
   */
  function handleAddAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  /**
   * 记录排序的动作
   */
  function handleSortAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  /**
   * 记录复制的动作
   */
  function handleCopyAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  /**
   * 记录删除的动作
   */
  function handleRemoveAfter() {
    addOperationRecord()
    updateOutlineTree()
  }

  return {
    outlineTree,
    operation,
    unloadStatus,
    handleRemoveAfter,
    handleCopyAfter,
    handleSortAfter,
    handleAddAfter,
    addOperationRecord,
    updateOutlineTree,
  }
}
