import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '数字输入框'
const name = 'input-number'
const icon = 'fluent-emoji-high-contrast:input-numbers'

export const InputNumberSchema = <CompSchema>{
  menu: 'form',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-input-number',
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
            id: 'min',
            props: {
              label: '设置计数器允许的最小值',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'min',
                field: 'props.min',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'max',
            props: {
              label: '设置计数器允许的最大值',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'max',
                field: 'props.max',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'step',
            props: {
              label: '计数器步长',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'step',
                field: 'props.step',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'stepStrictly',
            props: {
              label: '是否只能输入 step 的倍数',
            },
            children: [
              {
                type: 'al-switch',
                id: 'stepStrictly',
                field: 'props.stepStrictly',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'precision',
            props: {
              label: '数值精度',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'precision',
                field: 'props.precision',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '计数器尺寸',
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
            id: 'readonly',
            props: {
              label: '原生 `readonly` 属性，是否只读',
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
              label: '是否禁用状态',
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
            id: 'controls',
            props: {
              label: '是否使用控制按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'controls',
                field: 'props.controls',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'controlsPosition',
            props: {
              label: '控制按钮位置',
            },
            children: [
              {
                type: 'al-select',
                id: 'controlsPosition',
                field: 'props.controlsPosition',
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
                    id: 'right',
                    props: {
                      label: 'right',
                      value: 'right',
                    },
                  },
                ],
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
            id: 'placeholder',
            props: {
              label: '等价于原生 input `placeholder` 属性',
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
            id: 'id',
            props: {
              label: '等价于原生 input `id` 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'id',
                field: 'props.id',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'valueOnClear',
            props: {
              label: '当输入框被清空时显示的值',
            },
            children: [
              {
                type: 'al-select',
                id: 'valueOnClear',
                field: 'props.valueOnClear',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: '^[number] / ^[null] / ^[enum]`min',
                    props: {
                      label: '^[number] / ^[null] / ^[enum]`min',
                      value: '^[number] / ^[null] / ^[enum]`min',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'max',
                    props: {
                      label: 'max',
                      value: 'max',
                    },
                  },
                ],
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
        ],
      },
    ]
  },
}
