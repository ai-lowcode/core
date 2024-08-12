import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '折叠面板'
const name = 'elCollapse'

export default <DragRule>{
  menu: 'layout',
  icon: 'icon-collapse',
  label,
  name,
  mask: false,
  children: 'elCollapseItem',
  event: ['change'],
  rule() {
    return {
      type: name,
      props: {},
      style: {
        width: '100%',
      },
      children: [],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'switch',
      field: 'accordion',
    }])
  },
}
