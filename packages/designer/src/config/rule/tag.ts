import { DragRule } from '@/designer'

const label = '标签'
const name = 'elTag'

export default <DragRule>{
  menu: 'aide',
  icon: 'icon-tag',
  label,
  name,
  mask: true,
  event: ['click', 'close'],
  rule() {
    return {
      type: name,
      title: '',
      native: true,
      children: ['标签'],
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
        type: 'input',
        field: 'formCreateChild',
        title: '标签内容',
      },
      {
        type: 'select',
        field: 'type',
        title: '标签的类型',
        options: [{ label: 'primary', value: 'primary' }, {
          label: 'success',
          value: 'success',
        }, { label: 'warning', value: 'warning' }, { label: 'danger', value: 'danger' }, {
          label: 'info',
          value: 'info',
        }],
      },
      {
        type: 'select',
        field: 'size',
        title: '标签的尺寸',
        options: [
          { label: '大', value: 'large' },
          {
            label: '默认',
            value: 'default',
          },
          { label: '小', value: 'small' },
        ],
      },
      {
        type: 'select',
        field: 'effect',
        title: '标签的主题',
        options: [{ label: 'dark', value: 'dark' }, {
          label: 'light',
          value: 'light',
        }, { label: 'plain', value: 'plain' }],
      },
      {
        type: 'switch',
        field: 'closable',
        title: '是否可关闭',
      },
      {
        type: 'switch',
        field: 'disableTransitions',
        title: '是否禁用渐变动画',
      },
      {
        type: 'switch',
        field: 'hit',
        title: '是否有边框描边',
      },
      {
        type: 'switch',
        field: 'round',
        title: '是否为圆形',
      },
      {
        type: 'ColorInput',
        field: 'color',
        title: '背景色',
      },
    ]
  },
}
