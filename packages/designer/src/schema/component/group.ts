import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '子表单'
const name = 'group'

export default <CompSchema>{
  menu: 'subform',
  icon: 'icon-subform',
  label,
  name,
  inside: false,
  drag: true,
  dragBtn: true,
  mask: false,
  event: ['change'],
  subForm: 'array',
  loadRule(rule: any) {
    rule.children = rule.props.rule || []
    rule.type = 'FcRow'
    delete rule.props.rule
  },
  parseRule(rule: any) {
    rule.props.rule = rule.children
    rule.type = 'group'
    delete rule.children
    delete rule.props.mode
  },
  schema: () => {
    return <Schema>{
      type: 'fcRow',
      field: uniqueId(),
      title: '子表单',
      info: '',
      $required: false,
      props: {},
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      { type: 'switch', field: 'syncDisabled', title: '是否与子表单强制同步禁用状态', value: true },
      { type: 'switch', field: 'button', title: '是否显示操作按钮', value: true },
      { type: 'switch', field: 'sortBtn', title: '是否显示排序按钮', value: true },
      { type: 'inputNumber', field: 'expand', title: '设置默认展开几项' },
      { type: 'inputNumber', field: 'min', title: '设置最小添加几项' },
      { type: 'inputNumber', field: 'max', title: '设置最多添加几项' },
    ]
  },
}
