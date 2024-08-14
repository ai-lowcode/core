import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '表格表单'
const name = 'tableForm'

export default <DragRule>{
  menu: 'subform',
  icon: 'icon-table-form',
  label,
  name,
  mask: false,
  subForm: 'array',
  event: ['change', 'add', 'delete'],
  children: 'tableFormColumn',
  loadRule(rule: any) {
    if (!rule.props)
      rule.props = {}
    const columns = rule.props.columns || []
    rule.children = columns.map((column: any) => {
      return {
        type: 'tableFormColumn',
        _fc_drag_tag: 'tableFormColumn',
        props: {
          label: column.label,
          width: column.style.width || '',
          color: column.style.color || '',
        },
        children: column.rule || [],
      }
    })
    delete rule.props.columns
  },
  parseRule(rule: any) {
    const children = rule.children || []
    rule.props.columns = children.map((column: any) => {
      return {
        label: column.props.label,
        style: {
          width: column.props.width,
          color: column.props.color,
        },
        rule: column.children || [],
      }
    })
    rule.children = []
  },
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '表格表单',
      info: '',
      props: {},
      children: [],
    }
  },
  props() {
    return [
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      {
        type: 'inputNumber',
        field: 'max',
        title: '最多添加几行，为 0 则不限制',
        props: { min: 0 },
      },
    ]
  },
}
