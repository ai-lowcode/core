import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '表单'
const name = 'form'

export const FormSchema = <CompSchema>{
  menu: 'main',
  icon: 'icon-form',
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'el-form',
      id: uniqueId(),
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'm-4 w-full',
      },
      children: [
        {
          type: 'AlVueDragAble',
          id: `__${uniqueId()}`,
          label: '拖拽区',
          props: {
            class: 'min-h-[100px] bg-gray-50',
          },
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
        },
        children: [
          {
            type: 'el-form-item',
            id: 'default',
            props: {
              label: '是否开启默认插槽',
            },
            children: [
              {
                type: 'el-switch',
                id: 'default',
                field: 'slots.default',
                modelField: 'modelValue',
                defaultValue: true,
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
        },
        children: [
          {
            type: 'el-form-item',
            id: 'rules',
            props: {
              label: '表单验证规则',
            },
            children: [
              {
                type: 'el-input',
                id: 'rules',
                field: 'props.rules',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'inline',
            props: {
              label: '行内表单模式',
            },
            children: [
              {
                type: 'el-switch',
                id: 'inline',
                field: 'props.inline',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'labelPosition',
            props: {
              label: '表单域标签的位置',
            },
            children: [
              {
                type: 'el-select',
                id: 'labelPosition',
                field: 'props.labelPosition',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'el-option',
                    id: 'left',
                    props: {
                      label: '左侧',
                      value: 'left',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'right',
                    props: {
                      label: '右侧',
                      value: 'right',
                    },
                  },
                  {
                    type: 'el-option',
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
            type: 'el-form-item',
            id: 'labelWidth',
            props: {
              label: '标签的长度',
            },
            children: [
              {
                type: 'el-input',
                id: 'labelWidth',
                field: 'props.labelWidth',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'labelSuffix',
            props: {
              label: '表单域标签的后缀',
            },
            children: [
              {
                type: 'el-input',
                id: 'labelSuffix',
                field: 'props.labelSuffix',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'hideRequiredAsterisk',
            props: {
              label: '表单域标签的后缀',
            },
            children: [
              {
                type: 'el-switch',
                id: 'hideRequiredAsterisk',
                field: 'props.hideRequiredAsterisk',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'requireAsteriskPosition',
            props: {
              label: '星号的位置',
            },
            children: [
              {
                type: 'el-select',
                id: 'requireAsteriskPosition',
                field: 'props.requireAsteriskPosition',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'el-option',
                    id: 'left',
                    props: {
                      label: '左侧',
                      value: 'left',
                    },
                  },
                  {
                    type: 'el-option',
                    id: 'right',
                    props: {
                      label: '右侧',
                      value: 'right',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'showMessage',
            props: {
              label: '是否显示校验错误信息',
            },
            children: [
              {
                type: 'el-switch',
                id: 'showMessage',
                field: 'props.showMessage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'inlineMessage',
            props: {
              label: '是否以行内形式展示校验信息',
            },
            children: [
              {
                type: 'el-switch',
                id: 'inlineMessage',
                field: 'props.inlineMessage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'statusIcon',
            props: {
              label: '是否在输入框中显示校验结果反馈图标',
            },
            children: [
              {
                type: 'el-switch',
                id: 'statusIcon',
                field: 'props.statusIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'validateOnRuleChange',
            props: {
              label: '是否在 rules 属性改变后立即触发一次验证',
            },
            children: [
              {
                type: 'el-switch',
                id: 'validateOnRuleChange',
                field: 'props.validateOnRuleChange',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'size',
            props: {
              label: '表单内组件的尺寸',
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
            id: 'disabled',
            props: {
              label: '是否禁用该表单内的所有组件',
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
            id: 'scrollToError',
            props: {
              label: '当校验失败时，滚动到第一个错误表单项',
            },
            children: [
              {
                type: 'el-switch',
                id: 'scrollToError',
                field: 'props.scrollToError',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
