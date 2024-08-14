import { uniqueId } from '@ai-lowcode/utils'

import { computed, getCurrentInstance, inject, ref } from 'vue'

import { SettingPanelProps } from '../layout/setting-panel.vue'

import { DESIGN_INSTANCE, DesignerComponentInternalInstance, SettingTabEnum } from '@/designer'
import { propFieldDeepFn } from '@/utils'

/**
 * 设置面板 hooks
 */
export function useSettingPanel() {
  const props: any = getCurrentInstance()?.props as unknown as SettingPanelProps

  const activeTab = ref<SettingTabEnum>(SettingTabEnum.FORM)

  const designerInstance = inject<DesignerComponentInternalInstance | null>(DESIGN_INSTANCE, null)

  function customFormChange(field: string, value: string) {
    if (props.settingCustomConfig.config) {
      props.settingCustomConfig.config.change(field, value)
    }
  }

  function setActiveTab(type: SettingTabEnum) {
    activeTab.value = type
  }

  function changeEvent(on: any) {
    props.activeRule._on = on
  }

  const formConfigApi = computed({
    get() {
      return props.settingFormConfig.api
    },
    set(newValue) {
      props.settingFormConfig.api = newValue
    },
  })

  const baseFormApi = computed({
    get() {
      return props.settingBaseConfig.api
    },
    set(newValue) {
      props.settingBaseConfig.api = newValue
    },
  })

  const propsFormApi = computed({
    get() {
      return props.settingPropsConfig.api
    },
    set(newValue) {
      props.settingPropsConfig.api = newValue
    },
  })

  const validateFormApi = computed({
    get() {
      return props.settingValidateConfig.api
    },
    set(newValue) {
      props.settingValidateConfig.api = newValue
    },
  })

  const customFormApi = computed({
    get() {
      return props.settingCustomConfig.api
    },
    set(newValue) {
      props.settingCustomConfig.api = newValue
    },
  })

  function validateChange(field: any, value: any, _: any, fapi: any) {
    if (!props.activeRule || props.settingValidateConfig.api[props.activeRule._fc_id] !== props.activeRule)
      return
    props.handleChange('', field, value, _, fapi)
    props.workspaceEditConfig.api.refreshValidate()
    props.workspaceEditConfig.api.nextTick(() => {
      props.workspaceEditConfig.api.clearValidateState(props.activeRule.__fc__.id)
    })
  }

  function propRemoveField(field: any, _: any, fapi: any) {
    if (props.activeRule && fapi[props.activeRule._fc_id] === props.activeRule) {
      props.unWatchActiveRuleFunc()
      const org = field
      props.workspaceEditConfig.api.sync(props.activeRule)
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
        ctx: designerInstance,
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
    props.settingFormConfig.value[field] = value
    if (!field.includes('>')) {
      field = `form>${field}`
    }
    let source = props.workspaceEditConfig.options
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
    formConfigApi,
    baseFormApi,
    propsFormApi,
    customFormApi,
    validateFormApi,
    customFormChange,
    changeEvent,
    activeTab,
    setActiveTab,
    validateChange,
    propRemoveField,
    propChange,
    baseChange,
    updateName,
    formOptChange,
  }
}
