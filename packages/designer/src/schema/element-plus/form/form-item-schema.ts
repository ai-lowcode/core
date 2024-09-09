import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '表单项'
const name = 'form-item'
const icon = 'mdi:form-outline'

export const FormItemSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-form-item',
      id: uniqueId(),
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'w-full',
      },
      children: [
        {
          type: 'AlVueDragAble',
          id: `__${uniqueId()}`,
          label: '拖拽区',
          props: {
            class: 'min-h-[30px] bg-basic-color',
          },
          slotHidden: false,
          children: [],
        },
      ],
    }
  },
  // 插槽
  slots: () => {
    return <Schema[]>[
      {
        type: 'al-form',
        id: 'al-form',
        field: 'slots',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'al-form-item',
            id: 'default',
            props: {
              label: '隐藏默认插槽',
            },
            children: [
              {
                type: 'al-switch',
                id: 'default',
                field: 'slots.default',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
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
            id: 'prop',
            props: {
              label: 'model 的键名',
            },
            children: [
              {
                type: 'al-input',
                id: 'prop',
                field: 'props.prop',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {
              label: '标签文本',
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
            id: 'labelPosition',
            props: {
              label: '表单域标签的位置',
            },
            children: [
              {
                type: 'al-select',
                id: 'labelPosition',
                field: 'props.labelPosition',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'left',
                    props: {
                      label: '左侧',
                      value: 'left',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'right',
                    props: {
                      label: '右侧',
                      value: 'right',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'top',
                    props: {
                      label: '顶部',
                      value: 'top',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'labelWidth',
            props: {
              label: '标签的长度',
            },
            children: [
              {
                type: 'al-input',
                id: 'labelWidth',
                field: 'props.labelWidth',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'required',
            props: {
              label: '是否为必填项',
            },
            children: [
              {
                type: 'al-input',
                id: 'required',
                field: 'props.required',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rules',
            props: {
              label: '表单验证规则',
            },
            children: [
              {
                type: 'al-input',
                id: 'rules',
                field: 'props.rules',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'error',
            props: {
              label: '表单域验证错误时的提示信息',
            },
            children: [
              {
                type: 'al-switch',
                id: 'error',
                field: 'props.error',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showMessage',
            props: {
              label: '是否显示校验错误信息',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showMessage',
                field: 'props.showMessage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inlineMessage',
            props: {
              label: '是否以行内形式展示校验信息',
            },
            children: [
              {
                type: 'al-switch',
                id: 'inlineMessage',
                field: 'props.inlineMessage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '表单内组件的尺寸',
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
            id: 'for',
            props: {
              label: '和原生标签相同能力',
            },
            children: [
              {
                type: 'al-input',
                id: 'for',
                field: 'props.for',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'validateStatus',
            props: {
              label: 'formitem 校验的状态',
            },
            children: [
              {
                type: 'al-select',
                id: 'validateStatus',
                field: 'props.validateStatus',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'error',
                    props: {
                      label: '错误',
                      value: 'error',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'validating',
                    props: {
                      label: '验证',
                      value: 'validating',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'success',
                    props: {
                      label: '成功',
                      value: 'success',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  },
}
