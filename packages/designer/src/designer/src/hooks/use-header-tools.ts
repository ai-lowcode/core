import { deepCopy, hasProperty } from '@ai-lowcode/utils'

import { computed, getCurrentInstance, inject } from 'vue'

import { designerForm } from '../utils'

import { DESIGN_INSTANCE, DesignerComponentInternalInstance } from '@/designer'
import { formTemplate, parseRule } from '@/utils'

import hljs from '@/utils/highlight/highlight.min'
import javascript from '@/utils/highlight/javascript.min'
import xml from '@/utils/highlight/xml.min'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

export function useHeaderTools() {
  const props: any = getCurrentInstance()?.props as any

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  const t = computed(() => designerInstance?.setupState.t)

  function getConfig(key: string, def?: any) {
    return props.config ? (hasProperty(props.config, key) ? props.config[key] : def) : def
  }

  function getJson() {
    return designerForm.toJson(parseRule(deepCopy(props.workspaceEditConfig.rule[0].children)))
  }

  function handleSave() {
    designerInstance?.emit('save', {
      rule: getJson(),
      options: designerForm.toJson([props.getOption()]).slice(1).slice(0, -1),
    })
  }

  function triggerHandle(item: any) {
    item.handle()
  }

  function useOperationRecord(item: any) {
    props.workspacePreviewConfig.data = item.formData
    props.setRule(item.rule)
  }

  function openInputData(state: any) {
    props.workspacePreviewConfig.state = state === undefined ? !props.workspacePreviewConfig.state : !!state
    if (props.workspacePreviewConfig.state) {
      props.workspacePreviewConfig.rule = designerForm.parseJson(props.getJson())
      props.workspacePreviewConfig.options = designerForm.parseJson(props.getOptionsJson())
      props.workspacePreviewConfig.options.formData = deepCopy(props.workspacePreviewConfig.data)
      props.workspacePreviewConfig.options.submitBtn.show = false
      props.workspacePreviewConfig.options.resetBtn.show = false
      props.clearActiveRule()
    }
  }

  function clearDragRule() {
    props.setRule([])
    props.addOperationRecord()
    props.unloadStatus = false
  }

  function openPreview() {
    props.previewDialogConfig.state = true
    const rule = props.getJson()
    const options = props.getOptionsJson()
    props.previewDialogConfig.rule = designerForm.parseJson(rule)
    props.previewDialogConfig.options = designerForm.parseJson(options)
    props.previewDialogConfig.html = hljs.highlight(
      formTemplate(rule, options),
      { language: 'xml' },
    ).value
  }

  function nextOperationRecord() {
    if (!props.operation.list[props.operation.idx + 1]) {
      return
    }
    const item = props.operation.list[++props.operation.idx]
    useOperationRecord(item)
    props.clearActiveRule()
  }

  function prevOperationRecord() {
    if (!props.operation.list[props.operation.idx - 1]) {
      return
    }
    const item = props.operation.list[--props.operation.idx]
    useOperationRecord(item)
    props.clearActiveRule()
  }

  return {
    triggerHandle,
    handleSave,
    getConfig,
    t,
    prevOperationRecord,
    nextOperationRecord,
    openPreview,
    clearDragRule,
    openInputData,
  }
}
