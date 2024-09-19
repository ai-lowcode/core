import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '时间选择器'
const name = 'time-picker'
const icon = 'fluent:time-picker-20-regular'

export const TimePickerSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-time-picker',
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
              label: '完全只读',
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
            id: 'isRange',
            props: {
              label: '是否为时间范围选择',
            },
            children: [
              {
                type: 'al-switch',
                id: 'isRange',
                field: 'props.isRange',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'arrowControl',
            props: {
              label: '是否使用箭头进行时间选择',
            },
            children: [
              {
                type: 'al-switch',
                id: 'arrowControl',
                field: 'props.arrowControl',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: 'TimePicker 下拉框的类名',
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
                type: 'al-input',
                id: 'name',
                field: 'props.name',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {
              label: '等价于原生 input `aria-label` 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'label',
                field: 'props.label',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'ariaLabel',
            props: {
              label: '等价于原生 input `aria-label` 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'ariaLabel',
                field: 'props.ariaLabel',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'prefixIcon',
            props: {
              label: '自定义前缀图标',
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
            id: 'disabledHours',
            props: {
              label: '禁止选择部分小时选项',
            },
            children: [
              {
                id: 'disabledHours',
                field: 'props.disabledHours',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabledMinutes',
            props: {
              label: '禁止选择部分分钟选项',
            },
            children: [
              {
                id: 'disabledMinutes',
                field: 'props.disabledMinutes',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabledSeconds',
            props: {
              label: '禁止选择部分秒选项',
            },
            children: [
              {
                id: 'disabledSeconds',
                field: 'props.disabledSeconds',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'teleported',
            props: {
              label: '是否将 popover 的下拉列表镜像至 body 元素',
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
            id: 'tabindex',
            props: {
              label: '输入框的 tabindex',
            },
            children: [
              {
                id: 'tabindex',
                field: 'props.tabindex',
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
