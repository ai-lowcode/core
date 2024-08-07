import { deepCopy } from '@ai-lowcode/utils'

import { getCurrentInstance } from 'vue'

import { formTemplate } from '@/utils'
import { designerForm } from '@/utils/form.ts'

import hljs from '@/utils/highlight/highlight.min'
import javascript from '@/utils/highlight/javascript.min'
import xml from '@/utils/highlight/xml.min'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

export function useHeaderTools() {
  const props: any = getCurrentInstance()?.props as any

  function useOperationRecord(item: any) {
    props.inputForm.data = item.formData
    props.setRule(item.rule)
  }

  function openInputData(state: any) {
    props.inputForm.state = state === undefined ? !props.inputForm.state : !!state
    if (props.inputForm.state) {
      props.inputForm.rule = designerForm.parseJson(props.getJson())
      props.inputForm.option = designerForm.parseJson(props.getOptionsJson())
      props.inputForm.option.formData = deepCopy(props.inputForm.data)
      props.inputForm.option.submitBtn.show = false
      props.inputForm.option.resetBtn.show = false
      props.clearActiveRule()
    }
  }

  function clearDragRule() {
    props.setRule([])
    props.addOperationRecord()
    props.unloadStatus = false
  }

  function openPreview() {
    props.preview.state = true
    const rule = props.getJson()
    const options = props.getOptionsJson()
    props.preview.rule = designerForm.parseJson(rule)
    props.preview.option = designerForm.parseJson(options)
    props.preview.html = hljs.highlight(
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
    prevOperationRecord,
    nextOperationRecord,
    openPreview,
    clearDragRule,
    openInputData,
  }
}
