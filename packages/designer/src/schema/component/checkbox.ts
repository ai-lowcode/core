import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

import { makeOptionsRule, makeTreeOptions } from '@/utils'

const label = '多选框'
const name = 'checkbox'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-checkbox',
  label,
  name,
  event: ['change'],
  validate: ['array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '多选框',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {},
      options: makeTreeOptions('选项', { label: 'label', value: 'value' }, 1),
    }
  },
  props: () => {
    return <Schema[]>[
      makeOptionsRule('options'),
      ...[
        {
          type: 'switch',
          field: 'disabled',
          title: '是否禁用',
        },
        {
          type: 'switch',
          field: 'type',
          title: '按钮类型',
          props: { activeValue: 'button', inactiveValue: 'default' },
        },
        {
          field: 'min',
          type: 'inputNumber',
          title: '可被勾选的最小数量',
          props: {
            min: 0,
          },
        },
        {
          field: 'max',
          type: 'inputNumber',
          title: '可被勾选的最大数量',
          props: {
            min: 0,
          },
        },
        {
          type: 'ColorInput',
          field: 'textColor',
          title: '当按钮为活跃状态时的字体颜色',
        },
        {
          type: 'ColorInput',
          field: 'fill',
          title: '当按钮为活跃状态时的边框和背景颜色',
        },
      ],
    ]
  },
}
