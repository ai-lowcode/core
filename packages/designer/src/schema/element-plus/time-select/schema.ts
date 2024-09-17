import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '时间选择'
const name = 'time-select'
const icon = 'fluent:button-16-regular'

export const TimeSelectSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-time-select',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
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
            id: 'disabled',
            props: {
              label: '禁用状态',
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
            id: 'name',
            props: {
              label: '原生属性',
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
            id: 'effect',
            props: {
              label: 'Tooltip 主题，内置了 `dark` / `light` 两种主题',
            },
            children: [
              {
                type: 'al-select',
                id: 'effect',
                field: 'props.effect',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: '^[string] / ^[enum]`dark',
                    props: {
                      label: '^[string] / ^[enum]`dark',
                      value: '^[string] / ^[enum]`dark',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'light',
                    props: {
                      label: 'light',
                      value: 'light',
                    },
                  },
                ],
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
            id: 'start',
            props: {
              label: '开始时间',
            },
            children: [
              {
                type: 'al-input',
                id: 'start',
                field: 'props.start',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'end',
            props: {
              label: '结束时间',
            },
            children: [
              {
                type: 'al-input',
                id: 'end',
                field: 'props.end',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'step',
            props: {
              label: '间隔时间',
            },
            children: [
              {
                type: 'al-input',
                id: 'step',
                field: 'props.step',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'minTime',
            props: {
              label: '最早时间点，早于该时间的时间段将被禁用',
            },
            children: [
              {
                type: 'al-input',
                id: 'minTime',
                field: 'props.minTime',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'maxTime',
            props: {
              label: '最晚时间点，晚于该时间的时间段将被禁用',
            },
            children: [
              {
                type: 'al-input',
                id: 'maxTime',
                field: 'props.maxTime',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'format',
            props: {
              label: '设置时间格式',
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
