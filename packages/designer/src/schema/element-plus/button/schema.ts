import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

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
      type: 'el-button',
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
            class: 'min-h-[30px] w-[200px] bg-[#f5f5f5]',
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
        type: 'el-form',
        id: 'el-form',
        field: 'slots',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'el-form-item',
            id: 'default',
            props: {
              label: '隐藏默认插槽',
            },
            children: [
              {
                type: 'el-switch',
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
            id: 'size',
            props: {
              label: '尺寸',
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
                    id: 'primary',
                    props: {
                      label: '基本',
                      value: 'primary',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'success',
                    props: {
                      label: '成功',
                      value: 'success',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'warning',
                    props: {
                      label: '警告',
                      value: 'warning',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'danger',
                    props: {
                      label: '危险',
                      value: 'danger',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'info',
                    props: {
                      label: '信息',
                      value: 'info',
                    },
                  },
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
            type: 'el-form-item',
            id: 'plain',
            props: {
              label: '是否为朴素按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'plain',
                field: 'props.plain',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'text',
            props: {
              label: '是否为文字按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'text',
                field: 'props.text',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'bg',
            props: {
              label: '是否显示文字按钮背景颜色',
            },
            children: [
              {
                type: 'el-switch',
                id: 'bg',
                field: 'props.bg',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'link',
            props: {
              label: '是否为链接按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'link',
                field: 'props.link',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'round',
            props: {
              label: '是否为圆角按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'round',
                field: 'props.round',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'circle',
            props: {
              label: '是否为圆形按钮',
            },
            children: [
              {
                type: 'el-switch',
                id: 'circle',
                field: 'props.circle',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'loading',
            props: {
              label: '是否为加载中状态',
            },
            children: [
              {
                type: 'el-switch',
                id: 'loading',
                field: 'props.loading',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'disabled',
            props: {
              label: '按钮是否为禁用状态',
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
            id: 'autofocus',
            props: {
              label: '原生 autofocus 属性',
            },
            children: [
              {
                type: 'el-switch',
                id: 'autofocus',
                field: 'props.autofocus',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'nativeType',
            props: {
              label: '尺寸',
            },
            children: [
              {
                type: 'el-select',
                id: 'nativeType',
                field: 'props.nativeType',
                modelField: 'modelValue',
                children: [
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
                    id: 'submit',
                    props: {
                      label: '提交',
                      value: 'submit',
                    },
                  },
                  {
                    type: 'el-option',
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
            type: 'el-form-item',
            id: 'autoInsertSpace',
            props: {
              label: '自动在两个中文字符之间插入空格',
            },
            children: [
              {
                type: 'el-switch',
                id: 'autoInsertSpace',
                field: 'props.autoInsertSpace',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'color',
            props: {
              label: '自定义按钮颜色',
            },
            children: [
              {
                type: 'el-input',
                id: 'color',
                field: 'props.color',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'dark',
            props: {
              label: 'dark 模式',
            },
            children: [
              {
                type: 'el-switch',
                id: 'dark',
                field: 'props.dark',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
