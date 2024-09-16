import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '开关'
const name = 'switch'
const icon = 'fluent:button-16-regular'

export const SwitchSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-switch',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
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
            id: 'disabled',
            props: {
              label: '是否禁用',
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
            id: 'loading',
            props: {
              label: '是否显示加载中',
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
            id: 'size',
            props: {
              label: 'switch 的大小',
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
                    id: '',
                    props: {
                      label: '',
                      value: '',
                    },
                  },
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
            id: 'width',
            props: {
              label: 'switch 的宽度',
            },
            children: [
              {
                id: 'width',
                field: 'props.width',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inlinePrompt',
            props: {
              label: '无论图标或文本是否显示在点内，只会呈现文本的第一个字符',
            },
            children: [
              {
                type: 'al-switch',
                id: 'inlinePrompt',
                field: 'props.inlinePrompt',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'activeIcon',
            props: {
              label: 'switch 状态为 `on` 时所显示图标，设置此项会忽略 `active-text`',
            },
            children: [
              {
                id: 'activeIcon',
                field: 'props.activeIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inactiveIcon',
            props: {
              label: 'switch 状态为 `off` 时所显示图标，设置此项会忽略 `inactive-text`',
            },
            children: [
              {
                id: 'inactiveIcon',
                field: 'props.inactiveIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'activeActionIcon',
            props: {
              label: '` on `状态下显示的图标组件',
            },
            children: [
              {
                id: 'activeActionIcon',
                field: 'props.activeActionIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inactiveActionIcon',
            props: {
              label: '` off `状态下显示的图标组件',
            },
            children: [
              {
                id: 'inactiveActionIcon',
                field: 'props.inactiveActionIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'activeText',
            props: {
              label: 'switch 打开时的文字描述',
            },
            children: [
              {
                type: 'al-input',
                id: 'activeText',
                field: 'props.activeText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inactiveText',
            props: {
              label: 'switch 的状态为 `off` 时的文字描述',
            },
            children: [
              {
                type: 'al-input',
                id: 'inactiveText',
                field: 'props.inactiveText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'activeValue',
            props: {
              label: 'switch 状态为 `on` 时的值',
            },
            children: [
              {
                id: 'activeValue',
                field: 'props.activeValue',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inactiveValue',
            props: {
              label: 'switch的状态为 `off` 时的值',
            },
            children: [
              {
                id: 'inactiveValue',
                field: 'props.inactiveValue',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'activeColor',
            props: {
              label: '当在 `on` 状态时的背景颜色(已废弃，请使用 CSS var `--el-switch-on-color` )',
            },
            children: [
              {
                type: 'al-input',
                id: 'activeColor',
                field: 'props.activeColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'inactiveColor',
            props: {
              label: '`off` 状态时的背景颜色(已废弃，使用 CSS var `--el-switch-off-color` )',
            },
            children: [
              {
                type: 'al-input',
                id: 'inactiveColor',
                field: 'props.inactiveColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'borderColor',
            props: {
              label: '开关的边框颜色 ( 已废弃，使用 CSS var `--el-switch-border-color` )',
            },
            children: [
              {
                type: 'al-input',
                id: 'borderColor',
                field: 'props.borderColor',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'name',
            props: {
              label: 'switch 对应的 name 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'name',
                field: 'props.name',
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
          {
            type: 'al-form-item',
            id: 'beforeChange',
            props: {
              label: 'switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换',
            },
            children: [
              {
                id: 'beforeChange',
                field: 'props.beforeChange',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'id',
            props: {
              label: 'input 的 id',
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
            id: 'tabindex',
            props: {
              label: 'input 的 tabindex',
            },
            children: [
              {
                id: 'tabindex',
                field: 'props.tabindex',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {
              label: '等价于原生 input `aria-label` 属性',
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
              label: '等价于原生 input `aria-label` 属性',
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
