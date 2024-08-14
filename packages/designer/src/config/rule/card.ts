import { DragRule } from '@/designer'

const label = '卡片'
const name = 'elCard'

export default <DragRule>{
  menu: 'layout',
  icon: 'icon-card',
  label,
  name,
  drag: true,
  inside: false,
  mask: false,
  rule() {
    return {
      type: name,
      props: {
        header: '标题',
      },
      style: {
        width: '100%',
      },
      children: [],
    }
  },
  props() {
    return [
      {
        type: 'input',
        field: 'header',
        title: '标题',
      },
      {
        type: 'select',
        field: 'shadow',
        title: '阴影显示时机',
        value: 'always',
        options: [
          { label: '常显', value: 'always' },
          { label: '不显示', value: 'never' },
          {
            label: '悬浮',
            value: 'hover',
          },
        ],
      },
    ]
  },
}
