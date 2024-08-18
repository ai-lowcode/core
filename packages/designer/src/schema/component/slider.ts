import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '滑块'
const name = 'slider'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-slider',
  label,
  name,
  event: ['change', 'input'],
  validate: ['number', 'array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '滑块',
      info: '',
      $required: false,
      props: {},
    }
  },
  props: () => {
    return <Schema[]>[
      { type: 'switch', field: 'disabled', title: '是否禁用' },
      {
        type: 'switch',
        field: 'range',
        title: '是否为范围选择',
      },
      {
        type: 'inputNumber',
        field: 'min',
        title: '最小值',
        props: { min: 0 },
      },
      {
        type: 'inputNumber',
        field: 'max',
        title: '最大值',
        props: { min: 0 },
      },
      {
        type: 'inputNumber',
        field: 'step',
        title: '步长',
        props: { min: 0 },
      },
      { type: 'switch', field: 'showInput', title: '是否显示输入框，仅在非范围选择时有效' },
      {
        type: 'switch',
        field: 'showInputControls',
        title: '在显示输入框的情况下，是否显示输入框的控制按钮',
        value: true,
      },
      { type: 'switch', field: 'showStops', title: '是否显示间断点' },
      {
        type: 'switch',
        field: 'vertical',
        title: '是否竖向模式',
      },
      {
        type: 'input',
        field: 'height',
        title: 'Slider 高度，竖向模式时必填',
      },
    ]
  },
}
