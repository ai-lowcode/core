import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '时间区间'
const name = 'timeRange'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-time',
  label,
  name,
  event: ['change', 'blur', 'focus', 'visibleChange'],
  schema: () => {
    return <Schema>{
      type: 'timePicker',
      field: uniqueId(),
      title: '时间区间',
      info: '',
      $required: false,
      props: {
        isRange: true,
      },
    }
  },
  props: () => {
    return <Schema[]>[
      { type: 'switch', field: 'readonly', title: '完全只读' },
      {
        type: 'switch',
        field: 'disabled',
        title: '禁用',
      },
      {
        type: 'switch',
        field: 'clearable',
        title: '是否显示清除按钮',
        value: true,
      },
      {
        type: 'Struct',
        field: 'pickerOptions',
        title: '当前时间日期选择器特有的选项',
        props: { defaultValue: {} },
      },
      { type: 'switch', field: 'editable', title: '文本框可输入', value: true },
      {
        type: 'input',
        field: 'startPlaceholder',
        title: '范围选择时开始日期的占位内容',
      },
      { type: 'input', field: 'endPlaceholder', title: '范围选择时开始日期的占位内容' },
      {
        type: 'switch',
        field: 'arrowControl',
        title: '是否使用箭头进行时间选择',
      },
      {
        type: 'select',
        field: 'align',
        title: '对齐方式',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '居中', value: 'center' },
          {
            label: '右对齐',
            value: 'right',
          },
        ],
      },
    ]
  },
}
