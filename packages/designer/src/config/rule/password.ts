import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '密码输入框'
const name = 'password'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-password',
  label,
  name,
  event: ['blur', 'focus', 'change', 'input', 'clear'],
  validate: ['string'],
  rule({ t }: any) {
    return {
      type: 'input',
      field: uniqueId(),
      title: t('com.password.name'),
      info: '',
      $required: false,
      props: {
        type: 'password',
      },
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      {
        type: 'switch',
        field: 'disabled',
      },
      {
        type: 'switch',
        field: 'readonly',
      },
      {
        type: 'inputNumber',
        field: 'maxlength',
        props: { min: 0 },
      },
      {
        type: 'inputNumber',
        field: 'minlength',
        props: { min: 0 },
      },
      {
        type: 'input',
        field: 'placeholder',
      },
      {
        type: 'switch',
        field: 'clearable',
      },
    ])
  },
}
