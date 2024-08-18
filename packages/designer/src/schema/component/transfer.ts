import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

import { makeTreeOptions, makeTreeOptionsRule } from '@/utils'

const label = '穿梭框'
const name = 'elTransfer'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-transfer',
  label,
  name,
  event: ['change', 'leftCheckChange', 'rightCheckChange'],
  validate: ['string', 'number', 'array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '穿梭框',
      info: '',
      $required: false,
      props: {
        data: makeTreeOptions('选项', { label: 'label', value: 'key' }, 1),
      },
    }
  },
  props: () => {
    return <Schema[]>[
      makeTreeOptionsRule({ to: 'props.data', label: 'label', value: 'key' }),
      { type: 'switch', field: 'filterable', title: '是否可搜索' },
      {
        type: 'input',
        field: 'filterPlaceholder',
        title: '搜索框占位符',
      },
      {
        type: 'select',
        field: 'targetOrder',
        title: '右侧列表元素的排序策略',
        info: '若为 original，则保持与数据相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前',
        options: [{ label: 'original', value: 'original' }, {
          label: 'push',
          value: 'push',
        }, { label: 'unshift', value: 'unshift' }],
      },
      {
        type: 'TableOptions',
        field: 'titles',
        title: '自定义列表标题',
        props: {
          column: [{ label: '值', key: 'value' }],
          valueType: 'string',
          max: 2,
        },
      },
      {
        type: 'TableOptions',
        field: 'buttonTexts',
        title: '自定义按钮文案',
        props: {
          column: [{ label: '值', key: 'value' }],
          valueType: 'string',
          max: 2,
        },
      },
    ]
  },
}
