import { deepCopy, hasProperty, isFunction, isObject, isString } from '@ai-lowcode/utils'
import { getCurrentInstance, nextTick, onMounted, reactive, ref, toRef, toRefs, watch } from 'vue'

import field from '@/config/base/field.ts'
import form from '@/config/base/form.ts'
import validate from '@/config/base/validate.ts'

import { isNull, parseRule, propFieldDeepFn, upper, useLocale } from '@/utils'

import { designerForm } from '@/utils/form.ts'

import { t as globalT } from '@/utils/locale.ts'

export function useDesigner() {
  let unWatchActiveRule: any = null
  const vm = getCurrentInstance()
  const fcx = reactive({ active: null })

  const props = getCurrentInstance()?.props as any

  const { locale } = toRefs(props)

  let _t = globalT
  if (locale.value) {
    _t = useLocale(locale).t
  }
  const t = (...args: any) => _t(...args)

  const settingPanelRef = ref()

  const moveRule = ref()

  const addRule = ref()

  const added = ref()

  const configRef = toRef<any>(props, 'config', {})

  const baseRule = toRef(configRef.value, 'baseRule', null)

  const componentRule = toRef(configRef.value, 'componentRule', {})

  const validateRule = toRef(configRef.value, 'validateRule', null)

  const formRule = toRef(configRef.value, 'formRule', null)

  const cacheProps = ref({})

  const operation = ref({
    idx: -1,
    list: [],
  })

  const device = ref('pc')

  const activeRule = ref(null)

  const children = ref([])

  const eventShow = ref(false)

  const unloadStatus = ref(false)

  const formOptions = ref({})

  const oldOptionsKeys = ref([])

  const preview = ref({
    state: false,
    rule: [],
    option: {},
    api: {},
  })

  const previewStatus = ref('form')

  const inputForm = ref({
    state: false,
    rule: [],
    option: {},
    api: {},
    data: {},
    key: '',
  })

  const dragForm = ref({
    rule: [],
    api: {},
  })

  const formConfig = ref({
    rule: tidyRuleConfig(form, formRule.value, { t }),
    api: {},
    option: {
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

  // 基础表单信息
  const baseForm = ref({
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

  // 验证信息
  const validateForm = ref({
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

  // props表单
  const propsForm = ref({
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

  // 自定义表单
  const customForm = ref({
    isShow: false,
    config: null,
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

  function deviceChange(newDevice) {
    device.value = newDevice
  }

  function tidyRuleConfig(orgRule: any, configRule: any, ...args: any) {
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
    // unWatchActiveRule = null
  }
  function watchActiveRule() {
    unWatchActiveRuleFunc()
    unWatchActiveRule = watch(() => activeRule.value, (n) => {
      n && updateRuleFormData()
    }, { deep: true, flush: 'post' })
  }
  function setFormData(formData) {
    inputForm.value.data = formData || {}
  }
  function getRule() {
    return parseRule(deepCopy(dragForm.value.rule[0].children))
  }
  function getJson() {
    return designerForm.toJson(getRule())
  }
  function getOption() {
    const options: any = deepCopy(formOptions.value)
    Object.keys(options._event || {}).forEach((k) => {
      if (options._event[k]) {
        options[k] = options._event[k]
      }
    })
    delete options._event
    options.submitBtn = options._submitBtn
    options.resetBtn = options._resetBtn
    options.resetBtn.textContent = t('props.reset')
    options.submitBtn.textContent = t('props.submit')
    const formData = deepCopy(inputForm.value.data)
    if (Object.keys(formData).length > 0) {
      options.formData = formData
    }
    delete options._submitBtn
    delete options._resetBtn
    return options
  }
  function getOptionsJson() {
    return designerForm.toJson([getOption()]).slice(1).slice(0, -1)
  }
  function clearActiveRule() {
    activeRule.value = null
    customForm.value.config = null
    settingPanelRef.value.setActiveTab('form')
    fcx.active = ''
  }
  function setOption(opt) {
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
    inputForm.value.data = options.formData || {}
    oldOptionsKeys.value = Object.keys(formConfig.value.value)
    delete options.formData
    formOptions.value = options
    updateOptionsValue()
  }
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
    formConfig.value.value = value
  }
  function handleChange(key, field, value, _, fapi) {
    if (activeRule.value && fapi[activeRule.value._fc_id] === activeRule.value) {
      unWatchActiveRuleFunc()
      const org = field
      if (field.indexOf('__') !== 0) {
        if (field === 'formCreateChild') {
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
          }, props.activeRule)
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
        ctx: vm,
      })
    }
  }
  function getPropsRule(rule) {
    let propsRule = tidyRuleConfig(rule._menu.props, componentRule.value && componentRule.value[rule._menu.name], rule, {
      t,
      api: dragForm.value.api,
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
        api: dragForm.value.api,
      })
    }
    return propsRule
  }
  function toolActive(rule) {
    unWatchActiveRuleFunc()
    customForm.value.isShow = false
    customForm.value.config = null
    if (activeRule.value) {
      delete propsForm.value.api[activeRule.value._fc_id]
      delete baseForm.value.api[activeRule.value._fc_id]
      delete validateForm.value.api[activeRule.value._fc_id]
      delete dragForm.value.api.activeRule
    }
    activeRule.value = rule
    dragForm.value.api.activeRule = rule

    nextTick(() => {
      settingPanelRef.value.setActiveTab('props')
      nextTick(() => {
        propsForm.value.api[activeRule.value._fc_id] = activeRule.value
        baseForm.value.api[activeRule.value._fc_id] = activeRule.value
        validateForm.value.api[activeRule.value._fc_id] = activeRule.value
      })
    })
    if (!cacheProps.value[rule._fc_id]) {
      cacheProps.value[rule._fc_id] = getPropsRule(rule)
    }
    const hiddenBaseField = rule._menu.hiddenBaseField || []
    baseForm.value.api.hidden(false)
    hiddenBaseField.length && baseForm.value.api.hidden(true, hiddenBaseField)
    if (!getConfig('showControl', true)) {
      baseForm.value.api.hidden(true, '_control')
    }
    const input = hasProperty(rule, 'field')
    baseForm.value.isShow = input && rule.input !== false && getConfig('showBaseForm') !== false
    propsForm.value.isShow = cacheProps.value[rule._fc_id].length > 0 && getConfig('showPropsForm') !== false
    eventShow.value = rule._menu.event && rule._menu.event.length > 0 && getConfig('showEventForm') !== false
    validateForm.value.isShow = baseForm.value.isShow && rule._menu.validate !== false && getConfig('showValidateForm') !== false
    propsForm.value.rule = cacheProps.value[rule._fc_id]
    updateRuleFormData()
    watchActiveRule()
  }
  function getConfig(key, def) {
    return configRef.value ? (hasProperty(configRef.value, key) ? configRef.value[key] : def) : def
  }
  function updateRuleFormData() {
    const rule = activeRule.value
    let formData = {
      'formCreateChild': `${rule.children[0]}`,
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
    Object.keys(rule).forEach((k) => {
      if (!['effect', 'config', 'payload', 'id', 'type', '_menu'].includes(k))
        formData[`formCreate${upper(k)}`] = deepCopy(rule[k])
    })
    Object.keys(rule.props).forEach((k) => {
      const item = rule.props[k]
      formData[k] = deepCopy(item)
      if (isObject(item)) {
        Object.keys(item).forEach((sub) => {
          formData[`${k}>${sub}`] = deepCopy(item[sub])
        })
      }
    });
    ['props', 'effect', 'attrs', 'style', 'wrap'].forEach((name) => {
      rule[name] && (typeof rule[name] === 'object') && Object.keys(rule[name]).forEach((k) => {
        formData[`formCreate${upper(name)}>${k}`] = deepCopy(rule[name][k])
      })
    })
    const configAttrs = rule._menu.attrs || {}
    Object.keys(configAttrs).forEach((k) => {
      formData[`__${k}`] = configAttrs[k]({ rule })
    })
    propsForm.value.value = formData

    if (baseForm.value.isShow) {
      baseForm.value.value = {
        field: rule.field,
        title: rule.title || '',
        info: rule.info,
        _control: rule._control,
        ...formData,
      }
      validateForm.value.value = {
        validate: rule.validate ? [...rule.validate] : [],
        $required: formData.formCreate$required,
      }
      dragForm.value.api.refreshValidate()
      dragForm.value.api.nextTick(() => {
        dragForm.value.api.clearValidateState(rule.__fc__.id)
      })
    }
  }

  watch(() => locale.value, (n) => {
    _t = n ? useLocale(locale).t : globalT
    const formVal = formConfig.value.api.formData && formConfig.value.api.formData()
    const baseFormVal = baseForm.value.api.formData && baseForm.value.api.formData()
    const validateFormVal = validateForm.value.api.formData && validateForm.value.api.formData()
    validateForm.value.rule = tidyRuleConfig(validate, validateRule.value, { t })
    baseForm.value.rule = tidyRuleConfig(field, baseRule.value, { t })
    formConfig.value.rule = tidyRuleConfig(form, formRule.value, { t })
    cacheProps.value = {}
    const rule = activeRule.value
    let propsVal = null
    if (rule) {
      propsVal = propsForm.value.api.formData && propsForm.value.api.formData()
      propsForm.value.rule = cacheProps.value[rule._fc_id] = methods.getPropsRule(rule)
    }
    nextTick(() => {
      formVal && formConfig.value.api.setValue(formVal)
      baseFormVal && baseForm.value.api.setValue(baseFormVal)
      validateFormVal && validateForm.value.api.setValue(validateFormVal)
      propsVal && propsForm.value.api.setValue(propsVal)
    })
  })

  watch(() => preview.value.state, (n) => {
    if (!n) {
      nextTick(() => {
        previewStatus.value = 'form'
        preview.value.rule = preview.value.option = null
      })
    }
  })

  onMounted(() => {
    document.body.ondrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }
    window.onbeforeunload = (e) => {
      if (unloadStatus.value) {
        e.returnValue = t('designer.unload')
      }
    }
  })
  return {
    preview,
    unloadStatus,
    device,
    formOptions,
    previewStatus,
    formConfig,
    settingPanelRef,
    baseForm,
    eventShow,
    propsForm,
    inputForm,
    validateForm,
    dragForm,
    customForm,
    moveRule,
    addRule,
    added,
    operation,
    activeRule,
    children,
    fcx,
    vm,
    toolActive,
    getJson,
    clearActiveRule,
    handleChange,
    watchActiveRule,
    getOptionsJson,
    unWatchActiveRuleFunc,
    setOption,
    deviceChange,
  }
}
