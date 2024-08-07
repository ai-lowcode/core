import { uniqueId } from '@ai-lowcode/utils'

import { getCurrentInstance, inject } from 'vue'

import { propFieldDeepFn } from '@/utils'

export function useSettingPanel() {
  const props: any = getCurrentInstance()?.props as any

  const designer = inject<any>('designer', null)

  function validateChange(field: any, value: any, _: any, fapi: any) {
    if (!props.activeRule || props.validateForm.api[props.activeRule._fc_id] !== props.activeRule)
      return
    props.handleChange('', field, value, _, fapi)
    props.dragForm.api.refreshValidate()
    props.dragForm.api.nextTick(() => {
      props.dragForm.api.clearValidateState(props.activeRule.__fc__.id)
    })
  }

  function propRemoveField(field: any, _: any, fapi: any) {
    if (props.activeRule && fapi[props.activeRule._fc_id] === props.activeRule) {
      props.unWatchActiveRuleFunc()
      const org = field
      props.dragForm.api.sync(props.activeRule)
      if (field.indexOf('__') !== 0) {
        if (field === 'formCreateChild') {
          delete props.activeRule.children[0]
        }
        else if (field.indexOf('formCreate') === 0 || field.indexOf('>') > 0) {
          if (!field.includes('formCreate')) {
            field = `props>${field}`
          }
          propFieldDeepFn(field, ({ source, field }: any) => {
            delete source[field]
          }, props.activeRule)
        }
        else {
          delete props.activeRule.props[field]
        }
      }
      props.watchActiveRule()
      props.activeRule._menu?.watch?.[org]?.({
        field: org,
        value: undefined,
        api: fapi,
        rule: props.activeRule,
        ctx: designer,
      })
    }
  }

  function propChange(field: any, value: any, _: any, fapi: any) {
    props.handleChange('props', field, value, _, fapi)
  }

  function baseChange(field: any, value: any, _: any, fapi: any) {
    props.handleChange('', field, value, _, fapi)
  }

  function updateName() {
    props.activeRule.name = `ref_${uniqueId()}`
  }

  function formOptChange(field: any, value: any) {
    props.formConfig.value[field] = value
    if (!field.includes('>')) {
      field = `form>${field}`
    }
    let source = props.formOptions
    const split = field.split('>')
    const lastField = split.pop()
    split.forEach((k: any) => {
      if (k) {
        if (!source[k]) {
          source[k] = {}
        }
        source = source[k]
      }
    })
    source[lastField] = value
  }

  return {
    validateChange,
    propRemoveField,
    propChange,
    baseChange,
    updateName,
    formOptChange,
  }
}
