import { CompSchema, Schema } from '@/types'

const label = '面板'
const name = 'elCollapseItem'

export default <CompSchema>{
  icon: 'icon-cell',
  label,
  name,
  drag: true,
  dragBtn: false,
  inside: true,
  mask: false,
  schema: () => {
    return <Schema>{
      type: name,
      props: {
        title: '面板',
      },
      style: {},
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'input',
        field: 'title',
        title: '面板标题',
      },
      {
        type: 'input',
        field: 'name',
        title: '唯一标志符',
      },
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
    ]
  },
}
