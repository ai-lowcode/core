import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '输入框'
const name = 'input'

export const InputSchema = <CompSchema>{
  menu: 'main',
  icon: 'icon-input',
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'el-input',
      id: uniqueId(),
      label,
      name,
      field: `__${uniqueId()}`,
      modelField: 'modelValue',
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'el-form',
        id: 'el-form',
        field: 'form',
        modelField: 'modelValue',
        props: {
          label: '是否禁用',
          labelWidth: 100,
        },
        children: [
          {
            type: 'el-form-item',
            id: 'disabled',
            props: {
              label: '是否禁用',
            },
            children: [
              {
                type: 'elSwitch',
                id: 'disabled',
                field: 'form.disabled',
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
                type: 'elSwitch',
                id: 'readonly',
                field: 'form.readonly',
                modelField: 'modelValue',
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
                type: 'elInputNumber',
                id: 'maxlength',
                field: 'form.maxlength',
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
                type: 'elInputNumber',
                id: 'minlength',
                field: 'form.minlength',
                modelField: 'modelValue',
                props: { min: 0 },
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
                type: 'elInput',
                id: 'placeholder',
                field: 'form.placeholder',
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
                type: 'elSwitch',
                id: 'clearable',
                field: 'form.clearable',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
