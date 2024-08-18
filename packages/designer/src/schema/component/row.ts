import { CompSchema, Schema } from '@/types'

const label = '栅格布局'
const name = 'fcRow'

export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-row',
  label,
  name,
  mask: false,
  children: 'col',
  childrenLen: 2,
  schema: () => {
    return <Schema>{
      type: name,
      props: {},
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'inputNumber',
        field: 'gutter',
        title: '栅格间隔',
        props: { min: 0 },
      },
      {
        type: 'switch',
        field: 'type',
        title: 'flex布局模式',
        props: { activeValue: 'flex', inactiveValue: 'default' },
      },
      {
        type: 'select',
        field: 'justify',
        title: 'flex布局下的水平排列方式',
        options: [{ label: 'start', value: 'start' }, { label: 'end', value: 'end' }, {
          label: 'center',
          value: 'center',
        }, { label: 'space-around', value: 'space-around' }, { label: 'space-between', value: 'space-between' }],
      },
      {
        type: 'select',
        field: 'align',
        title: 'flex布局下的垂直排列方式',
        options: [{ label: 'top', value: 'top' }, { label: 'middle', value: 'middle' }, {
          label: 'bottom',
          value: 'bottom',
        }],
      },
    ]
  },
}
