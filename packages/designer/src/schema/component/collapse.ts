import { CompSchema, Schema } from '@/types'

const label = '折叠面板'
const name = 'elCollapse'

export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-collapse',
  label,
  name,
  mask: false,
  children: 'elCollapseItem',
  event: ['change'],
  schema: () => {
    return <Schema>{
      type: name,
      props: {},
      style: {
        width: '100%',
      },
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'switch',
        field: 'accordion',
        title: '是否手风琴模式',
      },
    ]
  },
}
