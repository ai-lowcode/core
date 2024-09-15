import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

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
      type: 'al-text',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      props: {},
      children: ['文本'],
    }
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
            id: 'elText',
            props: {
              label: '文本内容',
            },
            children: [
              {
                type: 'al-input',
                id: 'elText',
                field: 'props.elText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'type',
            props: {
              label: '尺寸',
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
                ],
              },
            ],
          },
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
            id: 'truncated',
            props: {
              label: '显示省略号',
            },
            children: [
              {
                type: 'al-switch',
                id: 'truncated',
                field: 'props.truncated',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'lineClamp',
            props: {
              label: '最大行数',
            },
            children: [
              {
                type: 'al-input',
                id: 'lineClamp',
                field: 'props.lineClamp',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tag',
            props: {
              label: '自定义元素标签',
            },
            children: [
              {
                type: 'al-input',
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
