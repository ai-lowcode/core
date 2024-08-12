import { localeProps } from '../../utils'

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
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      { type: 'switch', field: 'border', value: true },
      { type: 'ColorInput', field: 'borderColor' },
      { type: 'input', field: 'borderWidth' },
    ])
  },
}
