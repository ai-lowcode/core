import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

import { getInjectArg, makeOptionsRule, makeTreeOptions } from '@/utils'

const label = '选择器'
const name = 'select'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-select',
  label,
  name,
  event: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],
  validate: ['string', 'number', 'array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '选择器',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {},
      options: makeTreeOptions('选项', { label: 'label', value: 'value' }, 1),
    }
  },
  watch: {
    multiple({ rule }: any) {
      rule.key = uniqueId()
    },
  },
  props: () => {
    return <Schema[]>[
      makeOptionsRule('options'),
      { type: 'switch', field: 'multiple', title: 'multiple' },
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      { type: 'switch', field: 'clearable', title: '是否可以清空选项' },
      {
        type: 'switch',
        field: 'collapseTags',
        title: '多选时是否将选中值按文字的形式展示',
      },
      {
        type: 'inputNumber',
        field: 'multipleLimit',
        title: '多选时用户最多可以选择的项目数，为 0 则不限制',
        props: { min: 0 },
      },
      { type: 'input', field: 'placeholder', title: '是否可搜索' },
      {
        type: 'switch',
        field: 'filterable',
        title: '是否可搜索',
      },
      {
        type: 'switch',
        field: 'remote',
        title: '其中的选项是否从服务器远程加载',
      },
      {
        type: 'FnEditor',
        field: 'remoteMethod',
        title: '自定义远程搜索方法',
        props: {
          body: true,
          button: true,
          fnx: true,
          name: 'remoteMethod',
          args: [getInjectArg()],
        },
      },
      { type: 'switch', field: 'allowCreate', title: '是否允许用户创建新条目' },
      {
        type: 'input',
        field: 'noMatchText',
        title: '搜索条件无匹配时显示的文字',
      },
      { type: 'input', field: 'noDataText', title: '选项为空时显示的文字' },
      {
        type: 'switch',
        field: 'reserveKeyword',
        title: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
      },
      { type: 'switch', field: 'defaultFirstOption', title: '在输入框按下回车，选择第一个匹配项' },
    ]
  },
}
