import { DragRule } from '@/designer'

const label = '选项卡'
const name = 'elTabPane'

export default <DragRule>{
  label,
  name,
  inside: true,
  drag: true,
  dragBtn: false,
  mask: false,
  rule() {
    return {
      type: name,
      props: { label: '选项卡' },
      children: [],
    }
  },
  props() {
    return [
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
