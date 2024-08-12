import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const name = 'col'

export default <DragRule>{
  name,
  label: '格子',
  drag: true,
  dragBtn: false,
  inside: true,
  mask: false,
  rule() {
    return {
      type: name,
      props: { span: 12 },
      children: [],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      { type: 'slider', field: 'span', value: 12, props: { min: 0, max: 24 } },
      { type: 'slider', field: 'offset', props: { min: 0, max: 24 } },
      { type: 'slider', field: 'push', props: { min: 0, max: 24 } },
      { type: 'slider', field: 'pull', props: { min: 0, max: 24 } },
    ])
  },
}
