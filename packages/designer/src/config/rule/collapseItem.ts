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
  rule() {
    return {
      type: name,
      props: {
        title: '面板',
      },
      style: {},
      children: [],
    }
  },
  props() {
    return [
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
