import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = 'HTML'
const name = 'html'

export default <DragRule>{
  menu: 'aide',
  icon: 'icon-html',
  label,
  name,
  rule() {
    return {
      type: name,
      title: '',
      native: true,
      attrs: {
        innerHTML: '',
      },
      children: ['<div style="color:blue;">\n'
      + ' html html html html html html html html html\n'
      + '  </div>'],
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
        type: 'HtmlEditor',
        field: 'formCreateChild',
      },
    ])
  },
}
