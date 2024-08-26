import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '文本'
const name = 'text'
const icon = 'fluent:button-16-regular'

export const TextSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'el-text',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      props: {
        class: 'm-4',
      },
      children: ['文本'],
    }
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
            id: 'elText',
            props: {
              label: '文本内容',
            },
            children: [
              {
                type: 'el-input',
                id: 'elText',
                field: 'props.elText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'type',
            props: {
              label: '尺寸',
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
                ],
              },
            ],
          },
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
            id: 'truncated',
            props: {
              label: '显示省略号',
            },
            children: [
              {
                type: 'el-switch',
                id: 'truncated',
                field: 'props.truncated',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'lineClamp',
            props: {
              label: '最大行数',
            },
            children: [
              {
                type: 'el-input',
                id: 'lineClamp',
                field: 'props.lineClamp',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'el-form-item',
            id: 'tag',
            props: {
              label: '自定义元素标签',
            },
            children: [
              {
                type: 'el-input',
                id: 'tag',
                field: 'props.tag',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
