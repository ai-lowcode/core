import { CompSchema, Schema } from '@/types'

const label = '卡片'
const name = 'elCard'

export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-card',
  label,
  name,
  drag: true,
  inside: false,
  mask: false,
  schema: () => {
    return <Schema>{
      type: name,
      props: {
        header: '标题',
      },
      style: {
        width: '100%',
      },
    }
  },
  props: () => {
    return <Schema[]>[
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
