import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '输入框'
const name = 'input'
const icon = 'material-symbols:input'

export const InputSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-input',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'w-[100px]',
      },
    }
  },
  // 事件
  events: () => {
    return [
      {
        key: 'onBlur',
        label: '失去焦点时触发',
      },
      {
        key: 'onFocus',
        label: '获得焦点时触发',
      },
      {
        key: 'onChange',
        label: '改变时触发',
      },
      {
        key: 'onInput',
        label: '值改变时触发',
      },
      {
        key: 'onClear',
        label: 'clearable 属性生成的清空按钮时触发',
      },
    ]
  },
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
            id: 'type',
            props: {
              label: '类型',
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
                    id: 'text',
                    props: {
                      label: '文本',
                      value: 'text',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'textarea',
                    props: {
                      label: '文本域',
                      value: 'textarea',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'password',
                    props: {
                      label: '密码',
                      value: 'password',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'button',
                    props: {
                      label: '按钮',
                      value: 'button',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'checkbox',
                    props: {
                      label: '复选框',
                      value: 'checkbox',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'file',
                    props: {
                      label: '文件',
                      value: 'file',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'number',
                    props: {
                      label: '数字',
                      value: 'number',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'radio',
                    props: {
                      label: '单选',
                      value: 'radio',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'maxlength',
            props: {
              label: '最大输入长度',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'maxlength',
                field: 'props.maxlength',
                modelField: 'modelValue',
                props: { min: 0 },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'minlength',
            props: {
              label: '最小输入长度',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'minlength',
                field: 'props.minlength',
                modelField: 'modelValue',
                props: { min: 0 },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showWordLimit',
            props: {
              label: '是否显示统计字数',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showWordLimit',
                field: 'props.showWordLimit',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placeholder',
            props: {
              label: '输入框占位文本',
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
            id: 'showPassword',
            props: {
              label: '是否显示切换密码图标',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showPassword',
                field: 'props.showPassword',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {
              label: '是否禁用',
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
                    id: 'large',
                    props: {
                      label: '大',
                      value: 'large',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'default',
                    props: {
                      label: '默认',
                      value: 'default',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'small',
                    props: {
                      label: '小',
                      value: 'small',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rows',
            props: {
              label: '输入框行数',
            },
            children: [
              {
                type: 'al-input',
                id: 'rows',
                field: 'props.rows',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'readonly',
            props: {
              label: '是否只读',
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
        ],
      },
    ]
  },
}
