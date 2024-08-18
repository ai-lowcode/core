import { CompSchema, Schema } from '@/types'

const name = 'tableFormColumn'
export default <CompSchema>{
  icon: 'icon-cell',
  name,
  drag: true,
  dragBtn: false,
  mask: false,
  schema: () => {
    return <Schema>{
      type: name,
      props: {
        label: '自定义名称',
        width: 'auto',
      },
    }
  },
  props: () => {
    return <Schema[]>[
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
