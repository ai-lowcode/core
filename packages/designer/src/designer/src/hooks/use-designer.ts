import { deepCopy, hasProperty, isFunction, isNumber, isObject, isString } from '@ai-lowcode/utils'
import {
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
  Options,
  PreviewStatusEnum,
  Rule,
  designerForm,
} from '@/designer'
import { DesignerProps } from '@/designer/src/index.vue'
import { isNull, parseRule, propFieldDeepFn, upper, useLocale } from '@/utils'

import { t as globalT } from '@/utils/locale.ts'

export function useDesigner() {
  let unWatchActiveRule: any = null
  const designerInstance: DesignerComponentInternalInstance | null = getCurrentInstance()
  const selectComponent = ref()

  const props = getCurrentInstance()?.props as DesignerProps | undefined

  const { config: configRef, height, locale } = toRefs(props!)

  let _t = globalT
  if (locale.value) {
    _t = useLocale(locale).t
  }
  const t = (...args: any) => _t(...args)

  // 设置面板 ref
  const settingPanelRef = ref()

  const moveRule = ref()

  const addRule = ref()

  const added = ref()

  // 组件配置的渲染规则
  const baseRule = toRef<DesignerConfig, 'baseRule'>(configRef.value, 'baseRule')

  // 表单的渲染规则
  const componentRule = toRef<DesignerConfig, 'componentRule'>(configRef.value, 'componentRule', {})

  // 验证配置的渲染规则
  const validateRule = toRef<DesignerConfig, 'validateRule'>(configRef.value, 'validateRule')

  // 基础配置的渲染规则
  const formRule = toRef<DesignerConfig, 'formRule'>(configRef.value, 'formRule')

  const cacheProps = ref({})

  const operation = ref({
    idx: -1,
    list: [],
  })

  // 设备类型
  const device = ref<DeviceEnum>(DeviceEnum.PC)

  // 预览状态
  const previewStatus = ref<PreviewStatusEnum>(PreviewStatusEnum.FORM)

  // 激活的 rule
  const activeRule = ref<Rule>()

  const eventShow = ref<boolean>(false)

  const unloadStatus = ref<boolean>(false)

  const formOptions = ref<Options>({})

  const oldOptionsKeys = ref<Array<string>>([])

  // 表单预览弹窗配置
  const previewDialogConfig = ref<DragForm>({
    state: false,
    rule: [],
    options: {},
    api: {},
  })

  // 工作区表单预览配置
  const workspacePreviewConfig = ref<DragForm>({
    state: false,
    rule: [],
    options: {},
    api: {},
    data: {},
    key: '',
  })

  // 工作区表单编辑配置
  const workspaceEditConfig = ref<DragForm>({
    rule: [],
    api: {},
  })

  // 设置表单配置
  const settingFormConfig = ref<DragForm>({
    rule: tidyRuleConfig(form, formRule.value, { t }),
    api: {},
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
  })

  // 设置基础配置
  const settingBaseConfig = ref<DragForm>({
    isShow: false,
    rule: tidyRuleConfig(field, baseRule.value, { t }),
    api: {},
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
  })

  // 设置验证配置
  const settingValidateConfig = ref<DragForm>({
    isShow: false,
    rule: tidyRuleConfig(validate, validateRule.value, { t }),
    api: {},
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
  })

  // 设置属性配置
  const settingPropsConfig = ref<DragForm>({
    isShow: false,
    rule: [],
    api: {},
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
  })

  // 自定义属性配置
  const settingCustomConfig = ref<DragForm>({
    isShow: false,
    config: {},
    key: '',
    rule: [],
    api: {},
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
  })

  const dragHeight = computed(() => {
    const h = height.value
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

  function unWatchActiveRuleFunc() {
    unWatchActiveRule && unWatchActiveRule()
    unWatchActiveRule = null
  }
  function watchActiveRule() {
    unWatchActiveRuleFunc()
    unWatchActiveRule = watch(() => activeRule.value, (n) => {
      n && updateRuleFormData()
    }, { deep: true, flush: 'post' })
  }
  // function setFormData(formData: object) {
  //   workspacePreviewConfig.value.data = formData || {}inputForm
  // }
  /**
   * 获取 rule
   */
  function getRule(): Rule[] {
    return parseRule(deepCopy(workspaceEditConfig.value?.rule[0].children))
  }

  /**
   * 获取 rule json
   */
  function getJson(): string {
    return designerForm.toJson(getRule())
  }

  /**
   * 获取 options
   */
  function getOption() {
    const options: Options = deepCopy(formOptions.value)
    Object.keys(options._event || {}).forEach((k) => {
      if (options._event[k]) {
        options[k] = options._event[k]
      }
    })
    delete options._event
    options.submitBtn = options._submitBtn
    options.resetBtn = options._resetBtn
    options.resetBtn.innerText = t('props.reset')
    options.submitBtn.innerText = t('props.submit')
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
   * 设置 options
   * @param opt
   */
  function setOption(opt: Options) {
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
    oldOptionsKeys.value = Object.keys(settingFormConfig.value.value)
    delete options.formData
    formOptions.value = options
    updateOptionsValue()
  }

  /**
   * 更新 options 的值
   */
  function updateOptionsValue() {
    const old = {}
    oldOptionsKeys.value.forEach((k) => {
      old[k] = undefined
    })
    const value = { ...old, ...formOptions.value.form }
    Object.keys(formOptions.value).forEach((key) => {
      const item = formOptions.value[key]
      value[`>${key}`] = item
      if (typeof item === 'object') {
        Object.keys(item).forEach((k) => {
          value[`${key}>${k}`] = item[k]
        })
      }
    })
    settingFormConfig.value.value = value
  }
  function handleChange(key, field, value: Rule, _, fapi) {
    if (activeRule.value && fapi[activeRule.value._fc_id] === activeRule.value) {
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
          propFieldDeepFn(field, ({ source, field }) => {
            if (isNull(value)) {
              delete source[field]
            }
            else {
              source[field] = value
            }
          }, activeRule.value)
        }
        else {
          if (key && isNull(value)) {
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
      t,
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
        t,
        api: workspaceEditConfig.value.api,
      })
    }
    return propsRule
  }
  function toolActive(rule: Rule) {
    unWatchActiveRuleFunc()
    settingCustomConfig.value.isShow = false
    delete settingCustomConfig.value.config
    if (activeRule.value) {
      delete settingPropsConfig.value.api[activeRule.value._fc_id]
      delete settingBaseConfig.value.api[activeRule.value._fc_id]
      delete settingValidateConfig.value.api[activeRule.value._fc_id]
      delete workspaceEditConfig.value.api.activeRule
    }
    activeRule.value = rule
    workspaceEditConfig.value.api.activeRule = rule

    nextTick(() => {
      settingPanelRef.value.setActiveTab('props')
      nextTick(() => {
        settingPropsConfig.value.api[activeRule.value?._fc_id] = activeRule.value
        settingBaseConfig.value.api[activeRule.value?._fc_id] = activeRule.value
        settingValidateConfig.value.api[activeRule.value?._fc_id] = activeRule.value
      })
    })
    if (!cacheProps.value[rule._fc_id]) {
      cacheProps.value[rule._fc_id] = getPropsRule(rule)
    }
    const hiddenBaseField = rule._menu.hiddenBaseField || []
    settingBaseConfig.value.api.hidden(false)
    hiddenBaseField.length && settingBaseConfig.value.api.hidden(true, hiddenBaseField)
    if (!getConfig('showControl', true)) {
      settingBaseConfig.value.api.hidden(true, '_control')
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
    Object.keys(rule?.props).forEach((k) => {
      const item = rule?.props[k]
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
      workspaceEditConfig.value.api.refreshValidate()
      workspaceEditConfig.value.api.nextTick(() => {
        workspaceEditConfig.value.api.clearValidateState(rule?.__fc__.id)
      })
    }
  }

  /**
   * 监听语言变化
   */
  watch(() => locale.value, (n) => {
    _t = n ? useLocale(locale).t : globalT
    const formVal = settingFormConfig.value.api.formData && settingFormConfig.value.api.formData()
    const baseFormVal = settingBaseConfig.value.api.formData && settingBaseConfig.value.api.formData()
    const validateFormVal = settingValidateConfig.value.api.formData && settingValidateConfig.value.api.formData()
    settingValidateConfig.value.rule = tidyRuleConfig(validate, validateRule.value, { t })
    settingBaseConfig.value.rule = tidyRuleConfig(field, baseRule.value, { t })
    settingFormConfig.value.rule = tidyRuleConfig(form, formRule.value, { t })
    cacheProps.value = {}
    const rule = activeRule.value
    let propsVal = null
    if (rule) {
      propsVal = settingPropsConfig.value.api.formData && settingPropsConfig.value.api.formData()
      settingPropsConfig.value.rule = cacheProps.value[rule._fc_id] = getPropsRule(rule)
    }
    nextTick(() => {
      formVal && settingFormConfig.value.api.setValue(formVal)
      baseFormVal && settingBaseConfig.value.api.setValue(baseFormVal)
      validateFormVal && settingValidateConfig.value.api.setValue(validateFormVal)
      propsVal && settingPropsConfig.value.api.setValue(propsVal)
    })
  })

  watch(() => previewDialogConfig.value.state, (n) => {
    if (!n) {
      nextTick(() => {
        previewStatus.value = PreviewStatusEnum.FORM
        previewDialogConfig.value.rule = previewDialogConfig.value.options = undefined
      })
    }
  })

  return {
    previewDialogConfig,
    unloadStatus,
    device,
    formOptions,
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
    moveRule,
    addRule,
    added,
    operation,
    activeRule,
    configRef,
    dragHeight,
    selectComponent,
    changeSelectComponent,
    t,
    designerInstance,
    toolActive,
    getJson,
    clearActiveRule,
    handleChange,
    watchActiveRule,
    getOption,
    getOptionsJson,
    unWatchActiveRuleFunc,
    setOption,
    deviceChange,
  }
}
