import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

const label = '分组'
const name = 'subForm'

export default {
  menu: 'subform',
  icon: 'icon-group',
  label,
  name,
  inside: false,
  drag: true,
  dragBtn: true,
  mask: false,
  subForm: 'object',
  event: ['change'],
  loadRule(rule: any) {
    rule.children = rule.props.rule || []
    rule.type = 'FcRow'
    delete rule.props.rule
  },
  parseRule(rule: any) {
    rule.props.rule = rule.children
    rule.type = 'subForm'
    delete rule.children
  },
  rule({ t }: any) {
    return {
      type: 'fcRow',
      field: uniqueId(),
      title: t('com.subForm.name'),
      info: '',
      $required: false,
      props: {},
      children: [],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'switch',
      field: 'disabled',
    }, { type: 'switch', field: 'syncDisabled', value: true }])
  },
}
