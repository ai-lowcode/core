import { deepCopy, uniqueId } from '@ai-lowcode/utils'

import { computed, getCurrentInstance, inject } from 'vue'

import { DESIGN_INSTANCE, DesignerComponentInternalInstance, designerForm } from '@/designer'
import { isNull } from '@/utils'

export function useWorkspace() {
  const props: any = getCurrentInstance()?.props as any

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  const t = computed(() => designerInstance?.setupState.t)

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

  function inputClear() {
    inputReset({})
  }

  function inputReset(formData: any) {
    props.workspacePreviewConfig.rule = designerForm.parseJson(props.getJson())
    props.workspacePreviewConfig.options.formData = formData || deepCopy(props.workspacePreviewConfig.data)
    props.workspacePreviewConfig.key = uniqueId()
  }

  function inputSave() {
    const formData = props.workspacePreviewConfig.api.formData()
    Object.keys(formData).forEach((k) => {
      if (isNull(formData[k])) {
        delete formData[k]
      }
    })
    const flag = JSON.stringify(props.workspacePreviewConfig.data) !== JSON.stringify(formData)
    props.workspacePreviewConfig.data = formData
    props.workspacePreviewConfig.state = false
    designerInstance?.emit('inputData', formData)
    flag && props.addOperationRecord()
  }

  return {
    t,
    inputFormApi,
    dragFormApi,
    inputClear,
    inputReset,
    inputSave,
  }
}
