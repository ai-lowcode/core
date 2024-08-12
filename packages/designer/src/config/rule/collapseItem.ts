import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '面板'
const name = 'elCollapseItem'

export default <DragRule>{
  icon: 'icon-cell',
  label,
  name,
  drag: true,
  dragBtn: false,
  inside: true,
  mask: false,
  rule({ t }: any) {
    return {
      type: name,
      props: {
        title: t('com.elCollapseItem.name'),
      },
      style: {},
      children: [],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'input',
      field: 'title',
    }, {
      type: 'input',
      field: 'name',
    }, {
      type: 'switch',
      field: 'disabled',
    }])
  },
}
