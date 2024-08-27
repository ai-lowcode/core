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
      type: 'el-input',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'p-4',
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
        type: 'el-form',
        id: 'el-form',
        field: 'props',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'el-form-item',
            id: 'type',
            props: {
              label: '类型',
            },
            children: [
              {
                type: 'el-select',
                id: 'type',
                field: 'props.type',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'el-option',
                    id: 'text',
                    props: {
                      label: '文本',
                      value: 'text',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'textarea',
                    props: {
                      label: '文本域',
                      value: 'textarea',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'password',
                    props: {
                      label: '密码',
                      value: 'password',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'button',
                    props: {
                      label: '按钮',
                      value: 'button',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'checkbox',
                    props: {
                      label: '复选框',
                      value: 'checkbox',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'file',
                    props: {
                      label: '文件',
                      value: 'file',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'number',
                    props: {
                      label: '数字',
                      value: 'number',
                    },
                  },
                  {
                    type: 'el-option',
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
            type: 'el-form-item',
            id: 'maxlength',
            props: {
              label: '最大输入长度',
            },
            children: [
              {
                type: 'el-input-number',
                id: 'maxlength',
                field: 'props.maxlength',
                modelField: 'modelValue',
                props: { min: 0 },
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'minlength',
            props: {
              label: '最小输入长度',
            },
            children: [
              {
                type: 'el-input-number',
                id: 'minlength',
                field: 'props.minlength',
                modelField: 'modelValue',
                props: { min: 0 },
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'showWordLimit',
            props: {
              label: '是否显示统计字数',
            },
            children: [
              {
                type: 'el-switch',
                id: 'showWordLimit',
                field: 'props.showWordLimit',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'placeholder',
            props: {
              label: '输入框占位文本',
            },
            children: [
              {
                type: 'el-input',
                id: 'placeholder',
                field: 'props.placeholder',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'clearable',
            props: {
              label: '是否显示清除按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'clearable',
                field: 'props.clearable',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'showPassword',
            props: {
              label: '是否显示切换密码图标',
            },
            children: [
              {
                type: 'el-switch',
                id: 'showPassword',
                field: 'props.showPassword',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'disabled',
            props: {
              label: '是否禁用',
            },
            children: [
              {
                type: 'el-switch',
                id: 'disabled',
                field: 'props.disabled',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'size',
            props: {
              label: '输入框尺寸',
            },
            children: [
              {
                type: 'el-select',
                id: 'size',
                field: 'props.size',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'el-option',
                    id: 'large',
                    props: {
                      label: '大',
                      value: 'large',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'default',
                    props: {
                      label: '默认',
                      value: 'default',
                    },
                  },
                  {
                    type: 'el-option',
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
            type: 'el-form-item',
            id: 'rows',
            props: {
              label: '输入框行数',
            },
            children: [
              {
                type: 'el-input',
                id: 'rows',
                field: 'props.rows',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'readonly',
            props: {
              label: '是否只读',
            },
            children: [
              {
                type: 'el-switch',
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
