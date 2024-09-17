import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '评分'
const name = 'rate'
const icon = 'fluent:button-16-regular'

export const RateSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-rate',
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
            id: 'max',
            props: {
              label: '最大分值',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'max',
                field: 'props.max',
                modelField: 'modelValue',
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
                      label: 'large',
                      value: 'large',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'default',
                    props: {
                      label: 'default',
                      value: 'default',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'small',
                    props: {
                      label: 'small',
                      value: 'small',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {
              label: '是否为只读',
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
            id: 'allowHalf',
            props: {
              label: '是否允许半选',
            },
            children: [
              {
                type: 'al-switch',
                id: 'allowHalf',
                field: 'props.allowHalf',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'lowThreshold',
            props: {
              label: '低分和中等分数的界限值， 值本身被划分在低分中',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'lowThreshold',
                field: 'props.lowThreshold',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'highThreshold',
            props: {
              label: '高分和中等分数的界限值， 值本身被划分在高分中',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'highThreshold',
                field: 'props.highThreshold',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'colors',
            props: {
              label: 'icon 的颜色。 若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色',
            },
            children: [
              {
                id: 'colors',
                field: 'props.colors',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'voidColor',
            props: {
              label: '未选中 icon 的颜色',
            },
            children: [
              {
                type: 'al-input',
                id: 'voidColor',
                field: 'props.voidColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabledVoidColor',
            props: {
              label: '只读时未选中 icon 的颜色',
            },
            children: [
              {
                type: 'al-input',
                id: 'disabledVoidColor',
                field: 'props.disabledVoidColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'icons',
            props: {
              label: '图标组件 若传入数组，则需要传入 3 个元素，分别为 3 个部分所对应的类名；若传入对象，则可自定义分段，键名为分段的界限值，键值为对应的类名',
            },
            children: [
              {
                id: 'icons',
                field: 'props.icons',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'voidIcon',
            props: {
              label: '未被选中的图标组件',
            },
            children: [
              {
                id: 'voidIcon',
                field: 'props.voidIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabledVoidIcon',
            props: {
              label: '禁用状态的未选择图标',
            },
            children: [
              {
                id: 'disabledVoidIcon',
                field: 'props.disabledVoidIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showText',
            props: {
              label: '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showText',
                field: 'props.showText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showScore',
            props: {
              label: '是否显示当前分数， show-score 和 show-text 不能同时为真',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showScore',
                field: 'props.showScore',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'textColor',
            props: {
              label: '辅助文字的颜色',
            },
            children: [
              {
                type: 'al-input',
                id: 'textColor',
                field: 'props.textColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'texts',
            props: {
              label: '辅助文字数组',
            },
            children: [
              {
                id: 'texts',
                field: 'props.texts',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'scoreTemplate',
            props: {
              label: '分数显示模板',
            },
            children: [
              {
                type: 'al-input',
                id: 'scoreTemplate',
                field: 'props.scoreTemplate',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'clearable',
            props: {
              label: '是否可以重置值为 `0`',
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
            id: 'id',
            props: {
              label: '原生 `id` 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'id',
                field: 'props.id',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {
              label: '和 Rate 的 `aria-label` 属性保持一致',
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
            id: 'ariaLabel',
            props: {
              label: '和 Rate 的 `aria-label` 属性保持一致',
            },
            children: [
              {
                type: 'al-input',
                id: 'ariaLabel',
                field: 'props.ariaLabel',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
