import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '开关'
const name = 'switch'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-switch',
  label,
  name,
  event: ['change'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '开关',
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
      {
        type: 'inputNumber',
        field: 'width',
        title: '宽度（px）',
        props: { min: 0 },
      },
      { type: 'input', field: 'activeText', title: '打开时的文字描述' },
      {
        type: 'input',
        field: 'inactiveText',
        title: '关闭时的文字描述',
      },
      { type: 'input', field: 'activeValue', title: '打开时的值' },
      {
        type: 'input',
        field: 'inactiveValue',
        title: '关闭时的值',
      },
      { type: 'ColorInput', field: 'activeColor', title: '打开时的背景色' },
      {
        type: 'ColorInput',
        field: 'inactiveColor',
        title: '关闭时的背景色',
      },
    ]
  },
}
