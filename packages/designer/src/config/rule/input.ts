import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

const label = '输入框'
const name = 'input'

export default {
  menu: 'main',
  icon: 'icon-input',
  label,
  name,
  event: ['blur', 'focus', 'change', 'input', 'clear'],
  validate: ['string', 'url', 'email'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.input.name'),
      info: '',
      $required: false,
      props: {},
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
