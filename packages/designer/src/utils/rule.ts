import { isEmpty, isObject, isString } from '@ai-lowcode/utils'

import { Rule } from '@/designer'
import { upper } from '@/utils/index.ts'

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

export function makeOptionsRule(to: any) {
  const options = [
    { label: '静态数据', value: 2 },
    { label: '远程数据', value: 1 },
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
    title: '选项数据',
    field: '_optionType',
    value: 2,
    options,
    props: {
      type: 'button',
    },
    control,
  }
}

export function makeTreeOptionsRule({ to, label, value }: any) {
  const options = [
    { label: '静态数据', value: 2 },
    { label: '远程数据', value: 1 },
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
    title: '选项数据',
    field: '_optionType',
    value: 2,
    options,
    props: {
      type: 'button',
    },
    control,
  }
}

export function getRuleTree(children: Array<Rule>) {
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

export function getInjectArg() {
  return {
    name: '$inject',
    columns: [
      { label: '$inject.api', info: '当前表单的api', type: 'Api' },
      { label: '$inject.rule', info: '当前表单的生成规则', type: 'Rule[]' },
      { label: '$inject.self', info: '组件的生成规则', type: 'Rule' },
      { label: '$inject.option', info: '表单的配置', type: 'Object' },
      { label: '$inject.args', info: '事件的原始参数', type: 'Array' },
    ],
  }
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
      if (isEmpty(v)) {
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
