import { deepCopy, hasProperty, isEmpty, isFunction, isNumber, isObject, isString } from '@ai-lowcode/utils'
import {
  WatchStopHandle,
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  toRef,
  toRefs,
  watch,
} from 'vue'

import field from '@/config/base/field.ts'
import form from '@/config/base/form.ts'
import validate from '@/config/base/validate.ts'

import {
  DesignerComponentInternalInstance,
  DesignerConfig,
  DeviceEnum,
  DragForm,
  OptionBtnConfig,
  Options,
  PreviewStatusEnum,
  Rule,
  SettingTabEnum,
  UseDesignerType,
  designerForm,
} from '@/designer'
import { DesignerProps } from '@/designer/src/index.vue'
import { propFieldDeepFn, upper } from '@/utils'

/**
 * 设计器 hooks
 */
export function useDesigner() {
  let unWatchActiveRule: WatchStopHandle | null = null
  const designerInstance: DesignerComponentInternalInstance | null = getCurrentInstance()
  const selectComponent = ref()

  const props = getCurrentInstance()?.props as DesignerProps | undefined

  const { config: configRef, height } = toRefs(props!)

  // 设置面板 ref
  const settingPanelRef = ref()

  // 组件配置的渲染规则
  const baseRule = toRef<DesignerConfig, 'baseRule'>(configRef.value, 'baseRule')

  // 表单的渲染规则
  const componentRule = toRef<DesignerConfig, 'componentRule'>(configRef.value, 'componentRule', {})

  // 验证配置的渲染规则
  const validateRule = toRef<DesignerConfig, 'validateRule'>(configRef.value, 'validateRule')

  // 基础配置的渲染规则
  const formRule = toRef<DesignerConfig, 'formRule'>(configRef.value, 'formRule')

  // Rule缓存,用于 swap 操作
  const cacheProps = ref<Record<string, Rule>>({})

  // 设备类型
  const device = ref<DeviceEnum>(DeviceEnum.PC)

  // 预览状态
  const previewStatus = ref<PreviewStatusEnum>(PreviewStatusEnum.FORM)

  // 激活的 rule
  const activeRule = ref<Rule>()

  const eventShow = ref<boolean>(false)

  const oldOptionsKeys = ref<Array<string>>([])

  // 表单预览弹窗配置
  const previewDialogConfig = ref<DragForm>({
    isShow: false,
    rule: [],
    options: {},
  } as DragForm)

  // 工作区表单预览配置
  const workspacePreviewConfig = ref<DragForm>({
    isShow: false,
    rule: [],
    options: {},
    data: {},
    key: '',
  } as DragForm)

  // 工作区表单编辑配置
  const workspaceEditConfig = ref<DragForm>({
    rule: [],
    options: {},
  } as DragForm)

  // 设置表单配置
  const settingFormConfig = ref<DragForm>({
    rule: tidyRuleConfig(form, formRule.value),
    options: {
      form: {
        labelPosition: 'top',
        size: 'small',
      },
      submitBtn: false,
    },
    value: {
      form: {},
      submitBtn: false,
    },
  } as DragForm)

  // 设置基础配置
  const settingBaseConfig = ref<DragForm>({
    isShow: false,
    rule: tidyRuleConfig(field, baseRule.value),
    value: {},
    options: {
      global: {
        input: {
          modelEmit: 'blur',
        },
      },
      form: {
        labelPosition: 'top',
        size: 'small',
      },
      submitBtn: false,
      mounted: (fapi: any) => {
        fapi.activeRule = activeRule.value
        fapi.setValue(fapi.options.formData || {})
      },
    },
  } as DragForm)

  // 设置验证配置
  const settingValidateConfig = ref<DragForm>({
    isShow: false,
    rule: tidyRuleConfig(validate, validateRule.value),
    value: [],
    options: {
      global: {
        input: {
          modelEmit: 'blur',
        },
      },
      form: {
        labelPosition: 'top',
        size: 'small',
      },
      submitBtn: false,
      mounted: (fapi: any) => {
        fapi.activeRule = activeRule.value
        fapi.setValue(fapi.options.formData || {})
      },
    },
  } as DragForm)

  // 设置属性配置
  const settingPropsConfig = ref<DragForm>({
    isShow: false,
    rule: [],
    value: {},
    options: {
      global: {
        input: {
          modelEmit: 'blur',
        },
        inputNumber: {
          props: {
            controlsPosition: 'right',
          },
        },
      },
      form: {
        labelPosition: 'top',
        size: 'small',
      },
      submitBtn: false,
      mounted: (fapi: any) => {
        fapi.activeRule = activeRule.value
        fapi.setValue(fapi.options.formData || {})
      },
    },
  } as DragForm)

  // 自定义属性配置
  const settingCustomConfig = ref<DragForm>({
    isShow: false,
    config: {},
    key: '',
    rule: [],
    options: {
      global: {
        input: {
          modelEmit: 'blur',
        },
      },
      form: {
        labelPosition: 'top',
        size: 'small',
      },
      submitBtn: false,
    },
  } as DragForm)

  const dragHeight = computed(() => {
    const h = height?.value
    if (!h)
      return '100%'
    return isNumber(h) ? `${h}px` : h
  })

  /**
   * 修改显示设备
   * @param newDevice
   */
  function deviceChange(newDevice: DeviceEnum) {
    device.value = newDevice
  }

  /**
   * 合并规则处理
   * @param orgRule
   * @param configRule
   * @param args
   */
  function tidyRuleConfig(orgRule: any, configRule: any, ...args: any): Rule {
    if (configRule) {
      if (isFunction(configRule)) {
        return configRule(...args)
      }
      if (configRule.rule) {
        let rule = configRule.rule(...args)
        if (configRule.prepend) {
          rule = [...rule, ...orgRule(...args)]
        }
        else if (configRule.append) {
          rule = [...orgRule(...args), ...rule]
        }
        return rule
      }
    }
    return orgRule(...args)
  }

  /**
   * 停止 activeRule 的监听
   */
  function unWatchActiveRuleFunc() {
    unWatchActiveRule && unWatchActiveRule()
    unWatchActiveRule = null
  }

  /**
   * 启动 activeRule 的监听
   */
  function watchActiveRule() {
    unWatchActiveRuleFunc()
    unWatchActiveRule = watch(() => activeRule.value, (n) => {
      n && updateRuleFormData()
    }, { deep: true, flush: 'post' })
  }

  /**
   * 获取 options
   */
  function getOption() {
    const options: Options = deepCopy(workspaceEditConfig.value.options)
    Object.keys(options._event || {}).forEach((k: string) => {
      if (options._event[k]) {
        (options as Record<string, any>)[k] = options._event[k]
      }
    })
    delete options._event
    options.submitBtn = options._submitBtn
    options.resetBtn = options._resetBtn
    options.resetBtn && ((options.resetBtn as OptionBtnConfig).innerText = '重置')
    options.submitBtn && ((options.submitBtn as OptionBtnConfig).innerText = '提交')
    const formData = deepCopy(workspacePreviewConfig.value.data)
    if (Object.keys(formData).length > 0) {
      options.formData = formData
    }
    delete options._submitBtn
    delete options._resetBtn
    return options
  }

  /**
   * 获取 options json
   */
  function getOptionsJson(): string {
    return designerForm.toJson([getOption()]).slice(1).slice(0, -1)
  }

  /**
   * 清楚激活的 rule
   */
  function clearActiveRule() {
    activeRule.value = undefined
    delete settingCustomConfig.value?.config
    settingPanelRef.value.setActiveTab('form')
    selectComponent.value = ''
  }

  /**
   * 设置组件值
   * @param componentId
   */
  function changeSelectComponent(componentId: string) {
    selectComponent.value = componentId
  }

  /**
   * 初始化工作区 options
   * @param opt
   */
  function setWorkspaceOption(opt?: Options) {
    const options = isString(opt) ? JSON.parse(opt) : deepCopy(opt || {})
    options.form = {
      inline: false,
      hideRequiredAsterisk: false,
      labelPosition: 'right',
      size: 'default',
      labelWidth: '125px',
      ...options.form || {},
    }
    options._event = {
      onSubmit: options.onSubmit || '',
      onCreated: options.onCreated || '',
      onMounted: options.onMounted || '',
      onChange: options.onChange || '',
      beforeFetch: options.beforeFetch || '',
    }
    options._resetBtn = typeof options.resetBtn === 'object' ? options.resetBtn : { show: options.resetBtn === true }
    options._submitBtn = typeof options.submitBtn === 'object' ? options.submitBtn : { show: options.submitBtn !== false }
    options.submitBtn = options.resetBtn = false
    workspacePreviewConfig.value.data = options.formData || {}
    oldOptionsKeys.value = Object.keys(settingFormConfig.value.value as object)
    delete options.formData
    workspaceEditConfig.value.options = options
    updateOptionsValue()
  }

  /**
   * 更新 options 的值
   */
  function updateOptionsValue() {
    const old: any = {}
    oldOptionsKeys.value.forEach((k) => {
      old[k] = undefined
    })
    const value = { ...old, ...workspaceEditConfig.value.options?.form }
    Object.keys(workspaceEditConfig.value.options as Record<string, any>).forEach((key: string) => {
      const item = (workspaceEditConfig.value.options as Record<string, any>)[key]
      value[`>${key}`] = item
      if (typeof item === 'object') {
        Object.keys(item).forEach((k) => {
          value[`${key}>${k}`] = item[k]
        })
      }
    })
    settingFormConfig.value.value = value
  }

  /**
   * setting 面板的值改变
   * @param key
   * @param field
   * @param value
   * @param _
   * @param fapi
   */
  function handleChange(key: string, field: string, value: Rule, _: any, fapi: any) {
    if (activeRule.value && fapi.activeRule === activeRule.value) {
      unWatchActiveRuleFunc()
      const org = field
      if (field.indexOf('__') !== 0) {
        if (field === 'formCreateChild') {
          if (activeRule.value.children?.[0])
            activeRule.value.children[0] = value
        }
        else if (field.indexOf('formCreate') === 0 || field.indexOf('>') > 0) {
          if (!field.includes('formCreate')) {
            field = (key ? `${key}>` : '') + field
          }
          propFieldDeepFn(field, ({ source, field }: any) => {
            if (isEmpty(value)) {
              delete source[field]
            }
            else {
              source[field] = value
            }
          }, activeRule.value)
        }
        else {
          if (key && isEmpty(value)) {
            delete activeRule.value[key][field]
          }
          else {
            (key ? activeRule.value[key] : activeRule.value)[field] = value
          }
        }
      }
      watchActiveRule()
      activeRule.value._menu?.watch?.[org]?.({
        field: org,
        value,
        api: fapi,
        rule: activeRule.value,
        ctx: designerInstance,
      })
    }
  }
  function getPropsRule(rule: Rule) {
    let propsRule = tidyRuleConfig(rule._menu.props, componentRule.value && componentRule.value[rule._menu.name], rule, {
      api: workspaceEditConfig.value.api,
    })
    if (componentRule.value && componentRule.value.default) {
      const def = componentRule.value.default
      propsRule = tidyRuleConfig(() => propsRule, isFunction(def)
        ? {
            rule: def,
            append: true,
          }
        : def, rule, {
        api: workspaceEditConfig.value.api,
      })
    }
    return propsRule
  }

  /**
   * 激活 DragTool 组件
   * @param rule
   */
  function toolActive(rule: Rule) {
    unWatchActiveRuleFunc()
    settingCustomConfig.value.isShow = false
    delete settingCustomConfig.value.config
    // 清除之前激活的 rule
    if (activeRule.value) {
      delete settingPropsConfig.value?.api?.[activeRule.value._fc_id]
      delete settingBaseConfig.value?.api?.[activeRule.value._fc_id]
      delete settingValidateConfig.value?.api?.[activeRule.value._fc_id]
      delete workspaceEditConfig.value?.api?.activeRule
    }
    activeRule.value = rule
    if (workspaceEditConfig.value?.api?.activeRule)
      workspaceEditConfig.value.api.activeRule = rule

    nextTick(() => {
      settingPanelRef.value.setActiveTab(SettingTabEnum.PROPS)
      nextTick(() => {
        if (settingPropsConfig.value?.api?.[activeRule.value?._fc_id])
          settingPropsConfig.value.api[activeRule.value?._fc_id] = activeRule.value
        if (settingBaseConfig.value?.api?.[activeRule.value?._fc_id])
          settingBaseConfig.value.api[activeRule.value?._fc_id] = activeRule.value
        if (settingValidateConfig.value?.api?.[activeRule.value?._fc_id])
          settingValidateConfig.value.api[activeRule.value?._fc_id] = activeRule.value
      })
    })
    if (!cacheProps.value[rule._fc_id]) {
      cacheProps.value[rule._fc_id] = getPropsRule(rule)
    }
    const hiddenBaseField = rule._menu.hiddenBaseField || []
    settingBaseConfig.value?.api?.hidden(false)
    hiddenBaseField.length && settingBaseConfig.value?.api?.hidden(true, hiddenBaseField)
    if (!getConfig('showControl', true)) {
      settingBaseConfig.value?.api?.hidden(true, '_control')
    }
    const input = hasProperty(rule, 'field')
    settingBaseConfig.value.isShow = input && rule.input !== false && getConfig('showBaseForm') !== false
    settingPropsConfig.value.isShow = cacheProps.value[rule._fc_id].length > 0 && getConfig('showPropsForm') !== false
    eventShow.value = rule._menu.event && rule._menu.event.length > 0 && getConfig('showEventForm') !== false
    settingValidateConfig.value.isShow = settingBaseConfig.value.isShow && rule._menu.validate !== false && getConfig('showValidateForm') !== false
    settingPropsConfig.value.rule = cacheProps.value[rule._fc_id]
    updateRuleFormData()
    watchActiveRule()
  }

  /**
   * 获取 config 配置
   * @param key
   * @param defaultValue
   */
  function getConfig(key: keyof DesignerConfig, defaultValue?: any) {
    return configRef.value ? (hasProperty(configRef.value, key) ? configRef.value[key] : defaultValue) : defaultValue
  }

  /**
   * 更新 setting面板的值
   */
  function updateRuleFormData() {
    const rule = activeRule.value
    let formData: any = {
      'formCreateChild': `${rule?.children?.[0]}`,
      'formCreateWrap>labelWidth': '',
    }
    const appendConfigData = configRef.value.appendConfigData
    if (isFunction(appendConfigData)) {
      formData = { ...formData, ...appendConfigData(rule) }
    }
    else if (Array.isArray(appendConfigData)) {
      appendConfigData.forEach((v) => {
        formData[v] = undefined
      })
    }
    Object.keys(rule!).forEach((k) => {
      if (!['effect', 'config', 'payload', 'id', 'type', '_menu'].includes(k))
        formData[`formCreate${upper(k)}`] = deepCopy(rule?.[k])
    })
    Object.keys(rule?.props as Record<string, any>).forEach((k) => {
      const item = (rule?.props as Record<string, any>)[k]
      formData[k] = deepCopy(item)
      if (isObject(item)) {
        Object.keys(item).forEach((sub) => {
          formData[`${k}>${sub}`] = deepCopy(item[sub])
        })
      }
    });
    ['props', 'effect', 'attrs', 'style', 'wrap'].forEach((name) => {
      rule?.[name] && (typeof rule[name] === 'object') && Object.keys(rule[name]).forEach((k) => {
        formData[`formCreate${upper(name)}>${k}`] = deepCopy(rule[name][k])
      })
    })
    const configAttrs = rule?._menu.attrs || {}
    Object.keys(configAttrs).forEach((k) => {
      formData[`__${k}`] = configAttrs[k]({ rule })
    })
    settingPropsConfig.value.value = formData

    if (settingBaseConfig.value.isShow) {
      settingBaseConfig.value.value = {
        field: rule?.field,
        title: rule?.title || '',
        info: rule?.info,
        _control: rule?._control,
        ...formData,
      }
      settingValidateConfig.value.value = {
        validate: rule?.validate ? [...rule?.validate] : [],
        $required: formData.formCreate$required,
      }
      workspaceEditConfig.value?.api?.refreshValidate()
      workspaceEditConfig.value?.api?.nextTick(() => {
        workspaceEditConfig.value?.api?.clearValidateState(rule?.__fc__.id)
      })
    }
  }

  watch(() => previewDialogConfig.value.isShow, (isShow: any) => {
    // 清除预览弹窗内容
    if (!isShow) {
      nextTick(() => {
        previewStatus.value = PreviewStatusEnum.FORM
        delete previewDialogConfig.value.rule
        delete previewDialogConfig.value.options
      })
    }
  })

  return <UseDesignerType>{
    previewDialogConfig,
    device,
    previewStatus,
    settingFormConfig,
    settingPanelRef,
    settingBaseConfig,
    eventShow,
    settingPropsConfig,
    workspacePreviewConfig,
    settingValidateConfig,
    workspaceEditConfig,
    settingCustomConfig,
    activeRule,
    configRef,
    dragHeight,
    selectComponent,
    designerInstance,
    changeSelectComponent,
    toolActive,
    clearActiveRule,
    handleChange,
    watchActiveRule,
    getOption,
    getOptionsJson,
    unWatchActiveRuleFunc,
    setWorkspaceOption,
    deviceChange,
  }
}
