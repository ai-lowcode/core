import { deepCopy, hasProperty } from '@ai-lowcode/utils'

import { getCurrentInstance, inject } from 'vue'

import { HeaderToolsProps } from '../layout/header-tools.vue'
import { designerForm } from '../utils'

import { DESIGN_INSTANCE, DesignerComponentInternalInstance, DeviceEnum } from '@/designer'
import { formTemplate, parseRule } from '@/utils'

/**
 * 顶部工具 hooks
 */
export function useHeaderTools() {
  const props: any = getCurrentInstance()?.props as unknown as HeaderToolsProps

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

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  function getConfig(key: string, def?: any) {
    return props.config ? (hasProperty(props.config, key) ? props.config[key] : def) : def
  }

  function getJson() {
    return designerForm.toJson(parseRule(deepCopy(props.workspaceEditConfig.rule[0].children)))
  }

  /**
   * 使用操作记录
   * @param item
   */
  function useOperationRecord(item: any) {
    props.workspacePreviewConfig.data = item.formData
    props.setRule(item.rule)
  }

  /**
   * 切换录入数据
   * @param isShow
   */
  function openInputData(isShow: any) {
    props.workspacePreviewConfig.isShow = isShow === undefined ? !props.workspacePreviewConfig.isShow : !!isShow
    if (props.workspacePreviewConfig.isShow) {
      props.workspacePreviewConfig.rule = designerForm.parseJson(getJson())
      props.workspacePreviewConfig.options = designerForm.parseJson(designerInstance?.setupState.getOptionsJson())
      props.workspacePreviewConfig.options.formData = deepCopy(props.workspacePreviewConfig.data)
      props.workspacePreviewConfig.options.submitBtn.show = false
      props.workspacePreviewConfig.options.resetBtn.show = false
      props.clearActiveRule()
    }
  }

  /**
   * 清除规则
   */
  function clearDragRule() {
    props.setRule([])
    props.addOperationRecord()
    props.unloadStatus = false
  }

  /**
   * 保存
   */
  function handleSave() {
    designerInstance?.emit('save', {
      rule: getJson(),
      options: designerForm.toJson([props.getOption()]).slice(1).slice(0, -1),
    })
  }

  /**
   * 开启预览弹窗
   */
  function openPreview() {
    props.previewDialogConfig.isShow = true
    const rule = getJson()
    const options = designerInstance?.setupState.getOptionsJson()
    props.previewDialogConfig.rule = designerForm.parseJson(rule)
    props.previewDialogConfig.options = designerForm.parseJson(options)
    props.previewDialogConfig.html = formTemplate(rule, options)
  }

  /**
   * 下一步操作
   */
  function nextOperationRecord() {
    if (!props.operation.list[props.operation.index + 1]) {
      return
    }
    const item = props.operation.list[++props.operation.index]
    useOperationRecord(item)
    props.clearActiveRule()
  }

  /**
   * 上一步操作
   */
  function prevOperationRecord() {
    if (!props.operation.list[props.operation.index - 1]) {
      return
    }
    const item = props.operation.list[--props.operation.index]
    useOperationRecord(item)
    props.clearActiveRule()
  }

  return {
    devices,
    handleSave,
    getConfig,
    prevOperationRecord,
    nextOperationRecord,
    openPreview,
    clearDragRule,
    openInputData,
  }
}
