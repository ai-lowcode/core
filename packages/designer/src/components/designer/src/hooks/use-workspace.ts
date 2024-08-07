import { deepCopy, uniqueId } from '@ai-lowcode/utils'

import { getCurrentInstance, inject } from 'vue'

import { isNull } from '@/utils'
import { designerForm } from '@/utils/form.ts'

export function useWorkspace() {
  const props: any = getCurrentInstance()?.props as any

  const designer = inject<any>('designer', null)

  function inputClear() {
    inputReset({})
  }

  function inputReset(formData: any) {
    props.inputForm.rule = designerForm.parseJson(props.getJson())
    props.inputForm.option.formData = formData || deepCopy(props.inputForm.data)
    props.inputForm.key = uniqueId()
  }

  function inputSave() {
    const formData = props.inputForm.api.formData()
    Object.keys(formData).forEach((k) => {
      if (isNull(formData[k])) {
        delete formData[k]
      }
    })
    const flag = JSON.stringify(props.inputForm.data) !== JSON.stringify(formData)
    props.inputForm.data = formData
    props.inputForm.state = false
    designer.emit('inputData', formData)
    flag && props.addOperationRecord()
  }

  return {
    inputClear,
    inputReset,
    inputSave,
  }
}
