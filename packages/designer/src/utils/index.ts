import { hasProperty, isObject, isString, lower, parseFn, toCase } from '@ai-lowcode/utils'
import { computed, isRef, ref, unref } from 'vue'

import ZhCn from '../locale/zh-cn'

export function makeRequiredRule() {
  return {
    type: 'Required',
    field: 'formCreate$required',
    title: '是否必填',
  }
}

export function addAutoKeyMap(cm: any) {
  cm.addKeyMap({
    'name': 'autoParentheses',
    '\'(\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('()', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
  cm.addKeyMap({
    'name': 'autoBraces',
    '\'{\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('{}', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
  cm.addKeyMap({
    'name': 'autoBrackets',
    '\'[\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('[]', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
}

export function makeTreeOptions(pre: any, config: any, level: any, data: any = []) {
  if (!config.id) {
    config.id = 1
  }
  level && level--
  for (let i = 0; i < 3; i++) {
    const item: any = {
      [config.label]: pre + level * 10 + i,
      [config.value]: `${config.id++}`,
    }
    if (level) {
      makeTreeOptions(pre, config, level, item.children = [])
    }
    data.push(item)
  }
  return data
}

export function makeOptionsRule(t: any, to: any) {
  const options = [
    { label: t('fetch.optionsType.struct'), value: 2 },
    { label: t('fetch.optionsType.fetch'), value: 1 },
  ]

  const control = [
    {
      value: 1,
      rule: [
        {
          type: 'FetchConfig',
          field: 'formCreateEffect>fetch',
          props: {
            to,
          },
        },
      ],
    },
    {
      value: 2,
      rule: [
        {
          type: 'TableOptions',
          field: `formCreate${upper(to).replace('.', '>')}`,
          props: {
            keyValue: 'label',
          },
        },
      ],
    },
  ]

  return {
    type: 'radio',
    title: t('props.options'),
    field: '_optionType',
    value: 2,
    options,
    props: {
      type: 'button',
    },
    control,
  }
}

export function makeTreeOptionsRule({ t, to, label, value }: any) {
  const options = [
    { label: t('fetch.optionsType.struct'), value: 2 },
    { label: t('fetch.optionsType.fetch'), value: 1 },
  ]

  const control = [
    {
      value: 1,
      rule: [
        {
          type: 'FetchConfig',
          field: 'formCreateEffect>fetch',
          props: {
            to,
          },
        },
      ],
    },
    {
      value: 2,
      rule: [
        {
          type: 'TreeOptions',
          field: `formCreate${upper(to).replace('.', '>')}`,
          props: {
            columns: {
              label,
              value,
            },
            keyValue: label,
          },
        },
      ],
    },
  ]

  return {
    type: 'radio',
    title: t('props.options'),
    field: '_optionType',
    value: 2,
    options,
    props: {
      type: 'button',
    },
    control,
  }
}

export function upper(str: any) {
  return str.replace(str[0], str[0].toLocaleUpperCase())
}

export const toJSON = function (val: any) {
  const type = /object ([a-zA-Z]*)/.exec(Object.prototype.toString.call(val))
  // eslint-disable-next-line ts/no-use-before-define
  if (type && _toJSON[type[1].toLowerCase()]) {
    // eslint-disable-next-line ts/no-use-before-define
    return _toJSON[type[1].toLowerCase()](val)
  }
  else {
    return val
  }
}

const _toJSON: any = {
  object(val: any) {
    const json = []
    for (const i in val) {
      if (!hasProperty(val, i))
        continue
      json.push(
        `${toJSON(i)}: ${
                 (val[i] != null) ? toJSON(val[i]) : 'null'}`,
      )
    }
    return `{\n ${json.join(',\n ')}\n}`
  },
  function(val: any) {
    val = `${val}`
    const exec = (/^ *(\w+) *\(/).exec(val)
    if (exec && exec[1] !== 'function') {
      return `function ${val}`
    }
    return val
  },
  array(val: any) {
    const json = []
    let i = 0
    for (; i < val.length; i++)
      json[i] = (val[i] != null) ? toJSON(val[i]) : 'null'
    return `[${json.join(', ')}]`
  },
  string(val: any) {
    const tmp = val.split('')
    for (let i = 0; i < tmp.length; i++) {
      let c = tmp[i];
      (c >= ' ')
        ? (c === '\\')
            ? (tmp[i] = '\\\\')
            : (c === '"') ? (tmp[i] = '\\"') : 0
        : (tmp[i]
                        = (c === '\n')
              ? '\\n'
              : (c === '\r')
                  ? '\\r'
                  : (c === '\t')
                      ? '\\t'
                      : (c === '\b')
                          ? '\\b'
                          : (c === '\f')
                              ? '\\f'
                              : (c = c.charCodeAt(), (`\\u00${(c > 15) ? 1 : 0}${c % 16}`))
          )
    }
    return `"${tmp.join('')}"`
  },
}

export const deepParseFn = function (target: any) {
  if (target && typeof target === 'object') {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        const data = target[key]
        if (Array.isArray(data) || isObject(data)) {
          deepParseFn(data)
        }
        if (isString(data)) {
          target[key] = parseFn(data)
        }
      }
    }
  }
  return target
}

export function deepGet(object: any, path: any, defaultValue: any) {
  path = (path || '').split('.')

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[path[index++]]
  }
  return (index && index === length) ? (object !== undefined ? object : defaultValue) : defaultValue
}

export const buildTranslator = (locale: any) => (path: any, option: any) => translate(path, option, unref(locale))

export function translate(path: any, option: any, locale: any) {
  return deepGet(locale, path, '').replace(
    /\{(\w+)\}/g,
    (_: any, key: any) => `${option?.[key] ?? `{${key}}`}`,
  )
}

export function buildLocaleContext(locale: any) {
  const lang = computed(() => unref(locale).name)
  const name = computed(() => upper(toCase(lang.value || '')))
  const localeRef = isRef(locale) ? locale : ref(locale)
  return {
    lang,
    name,
    locale: localeRef,
    t: buildTranslator(locale),
  }
}

export function useLocale(locale: any) {
  return buildLocaleContext(computed(() => locale.value || ZhCn))
}

export function localeOptions(t: any, options: any, prefix?: any) {
  return options.map((opt: any) => {
    opt.label = t(`${prefix || 'props'}.${opt.value}`) || opt.label
    return opt
  })
}

export function localeProps(t: any, prefix: any, rules: any) {
  return rules.map((rule: any) => {
    if (rule.field === 'formCreate$required') {
      rule.title = t('validate.required') || rule.title
    }
    else if (rule.field && rule.field !== '_optionType') {
      rule.title = t(`com.${prefix}.${rule.field}`) || rule.title
    }
    if (rule.type === 'template' && Array.isArray(rule.children)) {
      rule.children = localeProps(t, prefix, rule.children)
    }
    return rule
  })
}

export function getRuleTree(children: any) {
  const tree: any = []
  children && children.forEach((rule: any) => {
    if (rule._fc_drag_tag) {
      const item = {
        id: rule.__fc__.id,
        rule,
        children: getRuleTree(rule.children),
      }
      if (!item.children.length) {
        delete item.children
      }
      tree.push(item)
    }
    else {
      tree.push(...getRuleTree(rule.children))
    }
  })
  return tree
}

export function getFormRuleDescription(tree: any) {
  const getTree = (children: any) => {
    const tree: any = []
    children && children.forEach((rule: any) => {
      if (rule.field) {
        rule.children = getTree(rule.children || [])
        if (!rule.children.length) {
          delete rule.children
        }
        tree.push(rule)
      }
      else {
        tree.push(...getTree(rule.children || []))
      }
    })
    return tree
  }
  return getTree(tree)
}

export function getRuleDescription(children: any) {
  const getTree = (children: any) => {
    const tree: any = []
    children && children.forEach((rule: any) => {
      if (typeof rule !== 'object') {
        return
      }
      if (rule._fc_drag_tag) {
        const item: any = {
          _fc_id: rule._fc_id,
          type: rule.type,
          field: rule.field,
          title: rule.title,
          name: rule.name,
          slot: rule.slot,
          props: { ...rule.props || {} },
          children: getTree(rule.children || []),
        }
        if (rule.children && typeof rule.children[0] === 'string') {
          item.content = rule.children[0]
        }
        if (!item.children.length) {
          delete item.children
        }
        tree.push(item)
      }
      else {
        tree.push(...getTree(rule.children))
      }
    })
    return tree
  }
  return getTree(children)
}

export function getInjectArg(t: any) {
  return {
    name: '$inject',
    columns: [
      { label: '$inject.api', info: t('event.inject.api'), type: 'Api' },
      { label: '$inject.rule', info: t('event.inject.rule'), type: 'Rule[]' },
      { label: '$inject.self', info: t('event.inject.self'), type: 'Rule' },
      { label: '$inject.option', info: t('event.inject.option'), type: 'Object' },
      { label: '$inject.args', info: t('event.inject.args'), type: 'Array' },
    ],
  }
}

export function isElementInside(x: any, y: any, element: any) {
  const rect = element.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

export function isNull(v: any) {
  return ['', null, undefined].includes(v)
}

export function formTemplate(json: any, options: any) {
  return `<template>
  <form-create
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script>
import formCreate from "@form-create/element-ui";

export default {
  components: {
    formCreate: formCreate.$form()
  },
  data () {
    const option = formCreate.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\')}');
    return {
      formData: {},
      fapi: null,
      rule: formCreate.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\')}'),
      option: option
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`
}

export function escapeRegExp(str: any) {
  return str.replace(/[ .*+?^${}()|[\]\\]/g, '\\$&')
}

export function compareVersion(v1: any, v2: any) {
  const a1 = v1.split('.')
  const a2 = v2.split('.')
  const minLength = Math.min(a1.length, a2.length)

  for (let i = 0; i < minLength; i++) {
    const diff = Number.parseInt(a1[i], 10) - Number.parseInt(a2[i], 10)
    if (diff > 0) {
      return 1
    }
    else if (diff < 0) {
      return -1
    }
  }

  return a1.length === a2.length ? 0 : (a1.length < a2.length ? -1 : 1)
}

export function parseRule(children: any, pSlot?: any) {
  return [...children].reduce((initial, rule) => {
    let slot = pSlot
    if (isString(rule)) {
      initial.push(rule)
      return initial
    }
    else if (rule.type === 'DragBox') {
      initial.push(...parseRule(rule.children, slot || rule.slot))
      return initial
    }
    else if (rule.type === 'DragTool') {
      slot = rule.slot || pSlot
      rule = rule.children[0]
      if (isString(rule)) {
        initial.push(rule)
        return initial
      }
      if (rule.type === 'DragBox') {
        initial.push(...parseRule(rule.children, slot || rule.slot))
        return initial
      }
    }
    if (!rule)
      return initial
    rule = { ...rule }
    if (slot && slot !== 'default') {
      rule.slot = slot
    }
    if (rule.children && rule.children.length) {
      rule.children = parseRule(rule.children)
    }

    delete rule.key
    delete rule.component
    if (rule._menu) {
      rule._menu.parseRule && rule._menu.parseRule(rule)
      delete rule._menu
    }
    if (rule._fc_drag_tag === '_') {
      delete rule._fc_drag_tag
    }
    if (rule._control) {
      rule.control = rule._control
      delete rule._control
    }
    if (rule._computed) {
      rule.computed = rule._computed
      delete rule._computed
    }
    if (!rule.slot) {
      delete rule.slot
    }
    if (rule._on) {
      rule.on = rule._on
      delete rule._on
    }
    rule.props && Object.keys(rule.props).forEach((k) => {
      const v = rule.props[k]
      if (isNull(v)) {
        delete rule.props[k]
      }
    })
    Object.keys(rule).filter(k => k.indexOf('__') === 0 || (Array.isArray(rule[k]) && rule[k].length === 0) || (isObject(rule[k]) && Object.keys(rule[k]).length === 0)).forEach((k) => {
      delete rule[k]
    })
    initial.push(rule)
    return initial
  }, [])
}

export function propFieldDeepFn(field: any, call: any, activeRule: any) {
  if (field[10] !== '>') {
    field = field.replace('formCreate', '')
    if (!field)
      return
    field = lower(field)
  }
  else {
    field = field.replace('formCreate>', '')
  }
  const split = field.split('>')
  const lastField = split.pop()
  let source = activeRule
  split.forEach((id: any, idx: any) => {
    if (!idx) {
      id = lower(id)
    }
    if (!source[id]) {
      source[id] = {}
    }
    source = source[id]
  })
  call({ source, field: lastField })
}
