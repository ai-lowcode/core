import { deepCopy, isEmpty, uniqueId } from '@ai-lowcode/utils'

import { computed, getCurrentInstance, inject } from 'vue'

import { WorkspaceProps } from '../layout/workspace.vue'

import { DESIGN_INSTANCE, DesignerComponentInternalInstance, designerForm } from '@/designer'
import { parseRule } from '@/utils'

/**
 * 工作空间 hooks
 */
export function useWorkspace() {
  const props: any = getCurrentInstance()?.props as unknown as WorkspaceProps

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  const inputFormApi = computed({
    get() {
      return props.workspacePreviewConfig.api
    },
    set(newValue) {
      props.workspacePreviewConfig.api = newValue
    },
  })

  const dragFormApi = computed({
    get() {
      return props.workspaceEditConfig.api
    },
    set(newValue) {
      props.workspaceEditConfig.api = newValue
    },
  })

  /**
   * 清楚数据
   */
  function inputClear() {
    inputReset({})
  }

  function getJson() {
    return designerForm.toJson(parseRule(deepCopy(props.workspaceEditConfig.rule[0].children)))
  }

  /**
   * 重置数据
   * @param formData
   */
  function inputReset(formData?: Record<string, any>) {
    props.workspacePreviewConfig.rule = designerForm.parseJson(getJson())
    props.workspacePreviewConfig.options.formData = formData || deepCopy(props.workspacePreviewConfig.data)
    props.workspacePreviewConfig.key = uniqueId()
  }

  /**
   * 保存数据
   */
  function inputSave() {
    const formData = props.workspacePreviewConfig.api.formData()
    Object.keys(formData).forEach((k) => {
      if (isEmpty(formData[k])) {
        delete formData[k]
      }
    })
    const flag = JSON.stringify(props.workspacePreviewConfig.data) !== JSON.stringify(formData)
    props.workspacePreviewConfig.data = formData
    props.workspacePreviewConfig.isShow = false
    designerInstance?.emit('inputData', formData)
    flag && props.addOperationRecord()
  }

  return {
    inputFormApi,
    dragFormApi,
    inputClear,
    inputReset,
    inputSave,
  }
}
