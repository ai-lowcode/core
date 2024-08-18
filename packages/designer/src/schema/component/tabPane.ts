import { CompSchema, Schema } from '@/types'

const label = '选项卡'
const name = 'elTabPane'
export default <CompSchema>{
  label,
  name,
  inside: true,
  drag: true,
  dragBtn: false,
  mask: false,
  schema: () => {
    return <Schema>{
      type: name,
      props: { label: '选项卡' },
    }
  },
  props: () => {
    return <Schema[]>[
      { type: 'input', field: 'label', title: '选项卡标题' },
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      { type: 'input', field: 'name', title: '选项卡的标识符' },
      {
        type: 'switch',
        field: 'lazy',
        title: '标签是否延迟渲染',
      },
    ]
  },
}
