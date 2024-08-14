import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '输入框'
const name = 'input'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-input',
  label,
  name,
  event: ['blur', 'focus', 'change', 'input', 'clear'],
  validate: ['string', 'url', 'email'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '输入框',
      info: '',
      $required: false,
      props: {},
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
        type: 'input',
        field: 'placeholder',
        title: '输入框占位文本',
      },
      {
        type: 'switch',
        field: 'clearable',
        title: '是否显示清除按钮',
      },
    ]
  },
}
