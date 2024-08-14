import { DragRule } from '@/designer'

const label = '表格布局'
const name = 'fcTable'

export default <DragRule>{
  menu: 'layout',
  icon: 'icon-table',
  label,
  name,
  inside: false,
  mask: false,
  rule() {
    return {
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
      children: [],
    }
  },
  props() {
    return [
      { type: 'switch', field: 'border', title: '是否显示边框', value: true },
      { type: 'ColorInput', field: 'borderColor', title: '边框颜色' },
      { type: 'input', field: 'borderWidth', title: '边框宽度' },
    ]
  },
}
