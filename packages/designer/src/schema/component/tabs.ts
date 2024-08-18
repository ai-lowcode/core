import { CompSchema, Schema } from '@/types'

const label = '标签页'
const name = 'elTabs'
export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-tab',
  label,
  name,
  mask: false,
  event: ['tabClick', 'tabChange', 'tabRemove', 'tabAdd', 'edit'],
  children: 'elTabPane',
  schema: () => {
    return <Schema>{
      type: name,
      style: { width: '100%' },
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'select',
        field: 'type',
        title: '风格类型',
        options: [{
          label: 'card',
          value: 'card',
        }, { label: 'border-card', value: 'border-card' }],
      },
      { type: 'switch', field: 'closable', title: '标签是否可关闭' },
      {
        type: 'select',
        field: 'tabPosition',
        title: '选项卡所在位置',
        options: [
          { label: '顶部', value: 'top' },
          { label: '右对齐', value: 'right' },
          {
            label: '左对齐',
            value: 'left',
          },
        ],
      },
      { type: 'switch', field: 'stretch', title: '标签的宽度是否自撑开' },
    ]
  },
}
