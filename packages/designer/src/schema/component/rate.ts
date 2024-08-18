import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '评分'
const name = 'rate'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-rate',
  label,
  name,
  event: ['change'],
  validate: ['number'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '评分',
      info: '',
      $required: false,
      props: {},
    }
  },
  props: () => {
    return <Schema[]>[
      { type: 'inputNumber', field: 'max', title: '最大分值', props: { min: 0 } },
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      { type: 'switch', field: 'allowHalf', title: '是否允许半选' },
      {
        type: 'ColorInput',
        field: 'voidColor',
        title: '未选中时图标的颜色',
      },
      { type: 'ColorInput', field: 'disabledVoidColor', title: '只读时未选中时图标的颜色' },
      {
        type: 'input',
        field: 'voidIconClass',
        title: '未选中时图标的类名',
      },
      { type: 'input', field: 'disabledVoidIconClass', title: '只读时未选中时图标的类名' },
      {
        type: 'switch',
        field: 'showScore',
        title: '是否显示当前分数',
      },
      { type: 'ColorInput', field: 'textColor', title: '辅助文字的颜色' },
      {
        type: 'input',
        field: 'scoreTemplate',
        title: '分数显示模板',
      },
    ]
  },
}
