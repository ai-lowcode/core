import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'
import { makeOptionsRule, makeTreeOptions } from '@/utils'

const label = '单选框'
const name = 'radio'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-radio',
  label,
  name,
  event: ['change'],
  validate: ['string', 'number'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '单选框',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {},
      options: makeTreeOptions('选项', { label: 'label', value: 'value' }, 1),
    }
  },
  props() {
    return [
      makeOptionsRule('options'),
      { type: 'switch', field: 'disabled', title: '是否禁用' },
      {
        type: 'switch',
        field: 'type',
        title: '按钮形式',
        props: { activeValue: 'button', inactiveValue: 'default' },
      },
      { type: 'ColorInput', field: 'textColor', title: '按钮形式激活时的文本颜色' },
      {
        type: 'ColorInput',
        field: 'fill',
        title: '按钮形式激活时的填充色和边框色',
      },
    ]
  },
}
