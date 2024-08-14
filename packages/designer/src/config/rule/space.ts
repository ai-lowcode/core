import { DragRule } from '@/designer'

const label = '间距'
const name = 'space'

export default <DragRule>{
  menu: 'layout',
  icon: 'icon-space',
  label,
  name,
  rule() {
    return {
      type: 'div',
      wrap: {
        show: false,
      },
      native: true,
      style: {
        width: '100%',
        height: '20px',
      },
      children: [],
    }
  },
  props() {
    return [
      {
        type: 'object',
        field: 'formCreateStyle',
        native: true,
        props: {
          rule: [
            {
              type: 'input',
              field: 'height',
              title: '高度',
            },
          ],
        },
      },
    ]
  },
}
