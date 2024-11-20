import type { Schema } from '@zero-dim/core'
import { uniqueId } from '@zero-dim/utils'

import { CompSchema } from '@/types'

const label = '颜色选择器'
const name = 'color-picker'
const icon = 'mingcute:color-picker-fill'

export const ColorPickerSchema = <CompSchema>{
  menu: 'form',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-color-picker',
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
            id: 'showAlpha',
            props: {
              label: '是否支持透明度选择',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showAlpha',
                field: 'props.showAlpha',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'colorFormat',
            props: {
              label: '写入 v-model 的颜色的格式',
            },
            children: [
              {
                type: 'al-select',
                id: 'colorFormat',
                field: 'props.colorFormat',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'hsl',
                    props: {
                      label: 'hsl',
                      value: 'hsl',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'hsv',
                    props: {
                      label: 'hsv',
                      value: 'hsv',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'hex',
                    props: {
                      label: 'hex',
                      value: 'hex',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'rgb',
                    props: {
                      label: 'rgb',
                      value: 'rgb',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: 'ColorPicker 下拉框的类名',
            },
            children: [
              {
                type: 'al-input',
                id: 'popperClass',
                field: 'props.popperClass',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'predefine',
            props: {
              label: '预定义颜色',
            },
            children: [
              {
                id: 'predefine',
                field: 'props.predefine',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'validateEvent',
            props: {
              label: '输入时是否触发表单的校验',
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
            id: 'tabindex',
            props: {
              label: 'ColorPicker 的 tabindex',
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
            id: 'label^(a11y)^(deprecated)',
            props: {
              label: 'ColorPicker 的 aria-label',
            },
            children: [
              {
                type: 'al-input',
                id: 'label^(a11y)^(deprecated)',
                field: 'props.label^(a11y)^(deprecated)',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'ariaLabel',
            props: {
              label: 'ColorPicker 的 aria-label',
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
          {
            type: 'al-form-item',
            id: 'id',
            props: {
              label: 'ColorPicker 的 id',
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
            id: 'teleported',
            props: {
              label: '是否将 popover 的下拉列表渲染至 body 下',
            },
            children: [
              {
                type: 'al-switch',
                id: 'teleported',
                field: 'props.teleported',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
