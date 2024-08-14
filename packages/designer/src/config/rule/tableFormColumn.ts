import { DragRule } from '@/designer'

const name = 'tableFormColumn'

export default <DragRule>{
  icon: 'icon-cell',
  name,
  drag: true,
  dragBtn: false,
  mask: false,
  rule() {
    return {
      type: name,
      props: {
        label: '自定义名称',
        width: 'auto',
      },
      children: [],
    }
  },
  props() {
    return [
      {
        type: 'input',
        field: 'label',
        title: '标题',
      },
      {
        type: 'input',
        field: 'width',
        title: '宽度',
      },
      {
        type: 'ColorInput',
        field: 'color',
        title: '颜色',
      },
    ]
  },
}
