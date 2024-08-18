import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '多行输入框'
const name = 'textarea'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-textarea',
  label,
  name,
  event: ['blur', 'focus', 'change', 'input'],
  validate: ['string'],
  schema: () => {
    return <Schema>{
      type: 'input',
      field: uniqueId(),
      title: '多行输入框',
      info: '',
      $required: false,
      props: {
        type: 'textarea',
      },
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      {
        type: 'switch',
        field: 'readonly',
        title: '是否只读',
      },
      {
        type: 'inputNumber',
        field: 'maxlength',
        title: '最大输入长度',
        props: { min: 0 },
      },
      {
        type: 'inputNumber',
        field: 'minlength',
        title: '最小输入长度',
        props: { min: 0 },
      },
      {
        type: 'switch',
        field: 'showWordLimit',
        title: '是否显示统计字数',
      },
      {
        type: 'input',
        field: 'placeholder',
        title: '输入框占位文本',
      },
      {
        type: 'inputNumber',
        field: 'rows',
        title: '输入框行数',
        props: {
          min: 0,
        },
      },
      {
        type: 'switch',
        field: 'autosize',
        title: '高度是否自适应',
      },
    ]
  },
}
