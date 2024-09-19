import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '日期选择器'
const name = 'date-picker'
const icon = 'uiw:date'

export const DatePickerSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-date-picker',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'p-1',
      },
    }
  },
  // 插槽
  slots: () => {},
  // 事件
  events: () => {},
  // 属性
  props: () => {
    return <Schema[]>[
      {
        type: 'al-form',
        id: 'al-form',
        field: 'props',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'al-form-item',
            id: 'readonly',
            props: {
              label: '只读',
            },
            children: [
              {
                type: 'al-switch',
                id: 'readonly',
                field: 'props.readonly',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {
              label: '禁用',
            },
            children: [
              {
                type: 'al-switch',
                id: 'disabled',
                field: 'props.disabled',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '输入框尺寸',
            },
            children: [
              {
                type: 'al-select',
                id: 'size',
                field: 'props.size',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: '',
                    props: {
                      label: '',
                      value: '',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'large',
                    props: {
                      label: 'large',
                      value: 'large',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'default',
                    props: {
                      label: 'default',
                      value: 'default',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'small',
                    props: {
                      label: 'small',
                      value: 'small',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'editable',
            props: {
              label: '文本框可输入',
            },
            children: [
              {
                type: 'al-switch',
                id: 'editable',
                field: 'props.editable',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'clearable',
            props: {
              label: '是否显示清除按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'clearable',
                field: 'props.clearable',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placeholder',
            props: {
              label: '非范围选择时的占位内容',
            },
            children: [
              {
                type: 'al-input',
                id: 'placeholder',
                field: 'props.placeholder',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'startPlaceholder',
            props: {
              label: '范围选择时开始日期的占位内容',
            },
            children: [
              {
                type: 'al-input',
                id: 'startPlaceholder',
                field: 'props.startPlaceholder',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'endPlaceholder',
            props: {
              label: '范围选择时结束日期的占位内容',
            },
            children: [
              {
                type: 'al-input',
                id: 'endPlaceholder',
                field: 'props.endPlaceholder',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'type',
            props: {
              label: '显示类型',
            },
            children: [
              {
                type: 'al-select',
                id: 'type',
                field: 'props.type',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'year',
                    props: {
                      label: 'year',
                      value: 'year',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'years',
                    props: {
                      label: 'years',
                      value: 'years',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'month',
                    props: {
                      label: 'month',
                      value: 'month',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'months',
                    props: {
                      label: 'months',
                      value: 'months',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'date',
                    props: {
                      label: 'date',
                      value: 'date',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'dates',
                    props: {
                      label: 'dates',
                      value: 'dates',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'datetime',
                    props: {
                      label: 'datetime',
                      value: 'datetime',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'week',
                    props: {
                      label: 'week',
                      value: 'week',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'datetimerange',
                    props: {
                      label: 'datetimerange',
                      value: 'datetimerange',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'daterange',
                    props: {
                      label: 'daterange',
                      value: 'daterange',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'monthrange',
                    props: {
                      label: 'monthrange',
                      value: 'monthrange',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'yearrange',
                    props: {
                      label: 'yearrange',
                      value: 'yearrange',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'format',
            props: {
              label: '显示在输入框中的格式',
            },
            children: [
              {
                id: 'format',
                field: 'props.format',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: 'DatePicker 下拉框的类名',
            },
            children: [
              {
                type: 'al-input',
                id: 'popperClass',
                field: 'props.popperClass',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperOptions',
            props: {
              label: '自定义 popper 选项，更多请参考 [popper.js](https://popper.js.org/docs/v2/)',
            },
            children: [
              {
                id: 'popperOptions',
                field: 'props.popperOptions',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rangeSeparator',
            props: {
              label: '选择范围时的分隔符',
            },
            children: [
              {
                type: 'al-input',
                id: 'rangeSeparator',
                field: 'props.rangeSeparator',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultValue',
            props: {
              label: '可选，选择器打开时默认显示的时间',
            },
            children: [
              {
                id: 'defaultValue',
                field: 'props.defaultValue',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultTime',
            props: {
              label: '范围选择时选中日期所使用的当日内具体时刻',
            },
            children: [
              {
                id: 'defaultTime',
                field: 'props.defaultTime',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'valueFormat',
            props: {
              label: '可选，绑定值的格式。 不指定则绑定值为 Date 对象',
            },
            children: [
              {
                id: 'valueFormat',
                field: 'props.valueFormat',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'id',
            props: {
              label: '等价于原生 input `id` 属性',
            },
            children: [
              {
                id: 'id',
                field: 'props.id',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'name',
            props: {
              label: '等价于原生 input `name` 属性',
            },
            children: [
              {
                id: 'name',
                field: 'props.name',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'unlinkPanels',
            props: {
              label: '在范围选择器里取消两个日期面板之间的联动',
            },
            children: [
              {
                type: 'al-switch',
                id: 'unlinkPanels',
                field: 'props.unlinkPanels',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'prefixIcon',
            props: {
              label: '自定义前缀图标 如果 `type`的值是`TimeLikeType`，那么就是 `Clock`，不然就是 `Calendar`',
            },
            children: [
              {
                id: 'prefixIcon',
                field: 'props.prefixIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'clearIcon',
            props: {
              label: '自定义清除图标',
            },
            children: [
              {
                id: 'clearIcon',
                field: 'props.clearIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'validateEvent',
            props: {
              label: '是否触发表单验证',
            },
            children: [
              {
                type: 'al-switch',
                id: 'validateEvent',
                field: 'props.validateEvent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabledDate',
            props: {
              label: '一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。',
            },
            children: [
              {
                id: 'disabledDate',
                field: 'props.disabledDate',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'shortcuts',
            props: {
              label: '设置快捷选项，需要传入数组对象',
            },
            children: [
              {
                id: 'shortcuts',
                field: 'props.shortcuts',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'cellClassName',
            props: {
              label: '设置自定义类名',
            },
            children: [
              {
                id: 'cellClassName',
                field: 'props.cellClassName',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'teleported',
            props: {
              label: '是否将 date-picker 的下拉列表插入至 body 元素',
            },
            children: [
              {
                type: 'al-switch',
                id: 'teleported',
                field: 'props.teleported',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'emptyValues',
            props: {
              label: '组件的空值配置 [参考config-provider](/en-US/component/config-provider#empty-values-configurations)',
            },
            children: [
              {
                id: 'emptyValues',
                field: 'props.emptyValues',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'valueOnClear',
            props: {
              label: '清空选项的值 [参考 config-provider](/en-US/component/config-provider#empty-values-configurations)',
            },
            children: [
              {
                id: 'valueOnClear',
                field: 'props.valueOnClear',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
