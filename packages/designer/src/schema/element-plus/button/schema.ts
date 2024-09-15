import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '按钮'
const name = 'button'
const icon = 'fluent:button-16-regular'

export const ButtonSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-button',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      props: {
        class: 'm-4',
      },
      children: [
        {
          type: 'AlVueDragAble',
          id: `__${uniqueId()}`,
          label: '拖拽区',
          props: {
            class: 'min-h-[30px] w-[200px] bg-basic-color',
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
  events: () => {
    return [
      {
        key: 'onClick',
        label: '用户点击',
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
            id: 'size',
            props: {
              label: '尺寸',
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
                    id: 'primary',
                    props: {
                      label: '基本',
                      value: 'primary',
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
                  {
                    type: 'al-option',
                    id: 'warning',
                    props: {
                      label: '警告',
                      value: 'warning',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'danger',
                    props: {
                      label: '危险',
                      value: 'danger',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'info',
                    props: {
                      label: '信息',
                      value: 'info',
                    },
                  },
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
                    id: 'warning',
                    props: {
                      label: '小',
                      value: 'warning',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'plain',
            props: {
              label: '是否为朴素按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'plain',
                field: 'props.plain',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'text',
            props: {
              label: '是否为文字按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'text',
                field: 'props.text',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'bg',
            props: {
              label: '是否显示文字按钮背景颜色',
            },
            children: [
              {
                type: 'al-switch',
                id: 'bg',
                field: 'props.bg',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'link',
            props: {
              label: '是否为链接按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'link',
                field: 'props.link',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'round',
            props: {
              label: '是否为圆角按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'round',
                field: 'props.round',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'circle',
            props: {
              label: '是否为圆形按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'circle',
                field: 'props.circle',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'loading',
            props: {
              label: '是否为加载中状态',
            },
            children: [
              {
                type: 'al-switch',
                id: 'loading',
                field: 'props.loading',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {
              label: '按钮是否为禁用状态',
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
            id: 'autofocus',
            props: {
              label: '原生 autofocus 属性',
            },
            children: [
              {
                type: 'al-switch',
                id: 'autofocus',
                field: 'props.autofocus',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'nativeType',
            props: {
              label: '尺寸',
            },
            children: [
              {
                type: 'al-select',
                id: 'nativeType',
                field: 'props.nativeType',
                modelField: 'modelValue',
                children: [
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
                    id: 'submit',
                    props: {
                      label: '提交',
                      value: 'submit',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'reset',
                    props: {
                      label: '重置',
                      value: 'reset',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'autoInsertSpace',
            props: {
              label: '自动在两个中文字符之间插入空格',
            },
            children: [
              {
                type: 'al-switch',
                id: 'autoInsertSpace',
                field: 'props.autoInsertSpace',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'color',
            props: {
              label: '自定义按钮颜色',
            },
            children: [
              {
                type: 'al-input',
                id: 'color',
                field: 'props.color',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'dark',
            props: {
              label: 'dark 模式',
            },
            children: [
              {
                type: 'al-input',
                id: 'color',
                field: 'props.color',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
