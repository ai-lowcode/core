import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '计数器'
const name = 'inputNumber'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-number',
  label,
  name,
  event: ['blur', 'focus', 'change'],
  validate: ['number', 'integer', 'float'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '计数器',
      info: '',
      $required: false,
      props: {},
    }
  },
  props() {
    return [
      { type: 'switch', field: 'disabled', title: '是否禁用计数器' },
      {
        type: 'inputNumber',
        field: 'min',
        title: '设置计数器允许的最小值',
      },
      {
        type: 'inputNumber',
        field: 'max',
        title: '设置计数器允许的最大值',
      },
      { type: 'inputNumber', field: 'step', title: '计数器步长', props: { min: 0 } },
      {
        type: 'switch',
        field: 'stepStrictly',
        title: '是否只能输入 step 的倍数',
      },
      {
        type: 'switch',
        field: 'controls',
        title: '是否使用控制按钮',
        value: true,
      },
      {
        type: 'select',
        field: 'controlsPosition',
        title: '控制按钮位置',
        options: [{ label: '默认', value: '' }, { label: '右对齐', value: 'right' }],
      },
      { type: 'input', field: 'placeholder', title: '输入框占位文本' },
    ]
  },
}
