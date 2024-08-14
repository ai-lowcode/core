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
  props() {
    return [
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
        type: 'HtmlEditor',
        field: 'formCreateChild',
        title: '内容',
      },
    ]
  },
}
