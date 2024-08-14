import { DragRule } from '@/designer'

const label = '分割线'
const name = 'elDivider'

export default <DragRule>{
  menu: 'aide',
  icon: 'icon-divider',
  label,
  name,
  rule() {
    return {
      type: name,
      props: {},
      children: ['分割线'],
    }
  },
  props() {
    return [
      {
        type: 'input',
        field: 'formCreateChild',
        title: '设置分割线文案',
      },
      {
        type: 'select',
        field: 'contentPosition',
        title: '设置分割线文案的位置',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '右对齐', value: 'right' },
          {
            label: '居中',
            value: 'center',
          },
        ],
      },
    ]
  },
}
