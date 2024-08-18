import { CompSchema, Schema } from '@/types'

const label = '表格布局'
const name = 'fcTable'
export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-table',
  label,
  name,
  inside: false,
  mask: false,
  schema: () => {
    return <Schema>{
      type: name,
      props: {
        rule: {
          row: 3,
          col: 4,
          style: {},
          class: {},
          layout: [],
        },
      },
    }
  },
  props: () => {
    return <Schema[]>[
      { type: 'switch', field: 'border', title: '是否显示边框', value: true },
      { type: 'ColorInput', field: 'borderColor', title: '边框颜色' },
      { type: 'input', field: 'borderWidth', title: '边框宽度' },
    ]
  },
}
