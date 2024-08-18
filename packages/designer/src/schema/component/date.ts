import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '日期'
const name = 'datePicker'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-date',
  label,
  name,
  event: ['change', 'blur', 'focus', 'calendarChange', 'panelChange', 'visibleChange'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '日期',
      info: '',
      $required: false,
      props: {},
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
        type: 'select',
        field: 'type',
        title: '显示类型',
        options: [
          { label: '年份', value: 'year' },
          { label: '月份', value: 'month' },
          {
            label: '日期',
            value: 'date',
          },
          { label: '日期多选', value: 'dates' },
          { label: '一周', value: 'week' },
          {
            label: '日期时间',
            value: 'datetime',
          },
          { label: '日期时间区间', value: 'datetimerange' },
          {
            label: '日期区间',
            value: 'daterange',
          },
          { label: '月份区间', value: 'monthrange' },
        ],
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
        field: 'placeholder',
        title: '非范围选择时的占位内容',
      },
      {
        type: 'input',
        field: 'startPlaceholder',
        title: '范围选择时开始日期的占位内容',
      },
      { type: 'input', field: 'endPlaceholder', title: '范围选择时结束日期的占位内容' },
      {
        type: 'input',
        field: 'format',
        title: '显示在输入框中的格式',
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
      { type: 'input', field: 'rangeSeparator', title: '选择范围时的分隔符' },
      {
        type: 'switch',
        field: 'unlinkPanels',
        title: '在范围选择器里取消两个日期面板之间的联动',
      },
    ]
  },
}
