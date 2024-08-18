import { CompSchema, Schema } from '@/types'

const label = '间距'
const name = 'space'

export default <CompSchema>{
  menu: 'layout',
  icon: 'icon-space',
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'div',
      wrap: {
        show: false,
      },
      native: true,
      style: {
        width: '100%',
        height: '20px',
      },
    }
  },
  props: () => {
    return <Schema[]>[
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
