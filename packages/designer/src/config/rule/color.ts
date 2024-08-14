import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '颜色选择器'
const name = 'colorPicker'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-color',
  label,
  name,
  event: ['change', 'activeChange', 'focus', 'blur'],
  validate: ['string'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '颜色选择器',
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
        field: 'showAlpha',
        title: '是否支持透明度选择',
      },
      {
        type: 'select',
        field: 'colorFormat',
        title: '颜色的格式',
        options: [
          { label: 'hsl', value: 'hsl' },
          { label: 'hsv', value: 'hsv' },
          {
            label: 'hex',
            value: 'hex',
          },
          { label: 'rgb', value: 'rgb' },
        ],
      },
      {
        type: 'tableOptions',
        field: 'predefine',
        title: '预定义颜色',
        props: {
          column: [{ label: '值', key: 'value' }],
          valueType: 'string',
        },
      },
    ]
  },
}
