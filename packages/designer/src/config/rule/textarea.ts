import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '多行输入框'
const name = 'textarea'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-textarea',
  label,
  name,
  event: ['blur', 'focus', 'change', 'input'],
  validate: ['string'],
  rule({ t }: any) {
    return {
      type: 'input',
      field: uniqueId(),
      title: t('com.textarea.name'),
      info: '',
      $required: false,
      props: {
        type: 'textarea',
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
        type: 'switch',
        field: 'showWordLimit',
      },
      {
        type: 'input',
        field: 'placeholder',
      },
      {
        type: 'inputNumber',
        field: 'rows',
        props: {
          min: 0,
        },
      },
      {
        type: 'switch',
        field: 'autosize',
      },
    ])
  },
}
