import { localeProps } from '../../utils'

const label = '文字'
const name = 'text'

export default {
  menu: 'aide',
  icon: 'icon-span',
  label,
  name,
  rule({ t }: any) {
    return {
      type: 'div',
      title: '',
      native: true,
      children: [t('com.text.name')],
    }
  },
  watch: {
    formCreateNative({ value, rule }: any) {
      if (value) {
        rule.title = ''
      }
    },
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      {
        type: 'switch',
        field: 'formCreateNative',
        props: {
          activeValue: false,
          inactiveValue: true,
        },
        control: [{ value: false, rule: ['formCreateTitle'] }],
      },
      {
        type: 'input',
        field: 'formCreateTitle',
      },
      {
        type: 'input',
        field: 'formCreateChild',
        props: {
          type: 'textarea',
        },
      },
    ])
  },
}
