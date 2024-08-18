import { CompSchema, Schema } from '@/types'

const label = '文字'
const name = 'text'
export default <CompSchema>{
  menu: 'aide',
  icon: 'icon-span',
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'div',
      title: '',
      native: true,
      children: ['文字'],
    }
  },
  watch: {
    formCreateNative({ value, rule }: any) {
      if (value) {
        rule.title = ''
      }
    },
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'switch',
        field: 'formCreateNative',
        title: '是否显示标题',
        props: {
          activeValue: false,
          inactiveValue: true,
        },
        control: [{ value: false, rule: ['formCreateTitle'] }],
      },
      {
        type: 'input',
        field: 'formCreateTitle',
        title: '标题',
      },
      {
        type: 'input',
        field: 'formCreateChild',
        title: '内容',
        props: {
          type: 'textarea',
        },
      },
    ]
  },
}
