import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '日期区间'
const name = 'dateRange'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-date',
  label,
  name,
  event: ['change', 'blur', 'focus', 'calendarChange', 'panelChange', 'visibleChange'],
  rule() {
    return {
      type: 'datePicker',
      field: uniqueId(),
      title: '日期区间',
      info: '',
      $required: false,
      props: {
        type: 'datetimerange',
      },
    }
  },
  props() {
    return [
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
