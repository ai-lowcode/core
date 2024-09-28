import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '穿梭框'
const name = 'transfer'
const icon = 'tabler:transfer'

export const TransferSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-transfer',
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
            id: 'data',
            props: {
              label: 'Transfer 的数据源',
            },
            children: [
              {
                id: 'data',
                field: 'props.data',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterable',
            props: {
              label: '是否可搜索',
            },
            children: [
              {
                type: 'al-switch',
                id: 'filterable',
                field: 'props.filterable',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterPlaceholder',
            props: {
              label: '搜索框占位符',
            },
            children: [
              {
                type: 'al-input',
                id: 'filterPlaceholder',
                field: 'props.filterPlaceholder',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterMethod',
            props: {
              label: '自定义搜索方法',
            },
            children: [
              {
                id: 'filterMethod',
                field: 'props.filterMethod',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'targetOrder',
            props: {
              label: '右侧列表元素的排序策略： 若为 `original`，则保持与数据源相同的顺序； 若为 `push`，则新加入的元素排在最后； 若为 `unshift`，则新加入的元素排在最前',
            },
            children: [
              {
                type: 'al-select',
                id: 'targetOrder',
                field: 'props.targetOrder',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'original',
                    props: {
                      label: 'original',
                      value: 'original',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'push',
                    props: {
                      label: 'push',
                      value: 'push',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'unshift',
                    props: {
                      label: 'unshift',
                      value: 'unshift',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'titles',
            props: {
              label: '自定义列表标题',
            },
            children: [
              {
                id: 'titles',
                field: 'props.titles',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'buttonTexts',
            props: {
              label: '自定义按钮文案',
            },
            children: [
              {
                id: 'buttonTexts',
                field: 'props.buttonTexts',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'renderContent',
            props: {
              label: '自定义数据项渲染函数',
            },
            children: [
              {
                id: 'renderContent',
                field: 'props.renderContent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'format',
            props: {
              label: '列表顶部勾选状态文案',
            },
            children: [
              {
                id: 'format',
                field: 'props.format',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'props',
            props: {
              label: '数据源的字段别名',
            },
            children: [
              {
                id: 'props',
                field: 'props.props',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'leftDefaultChecked',
            props: {
              label: '初始状态下左侧列表的已勾选项的 key 数组',
            },
            children: [
              {
                id: 'leftDefaultChecked',
                field: 'props.leftDefaultChecked',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rightDefaultChecked',
            props: {
              label: '初始状态下右侧列表的已勾选项的 key 数组',
            },
            children: [
              {
                id: 'rightDefaultChecked',
                field: 'props.rightDefaultChecked',
                modelField: 'modelValue',
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
