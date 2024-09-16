import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '滑块'
const name = 'slider'
const icon = 'fluent:button-16-regular'

export const SliderSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-slider',
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
            id: 'min',
            props: {},
            children: [
              {
                type: 'al-input-number',
                id: 'min',
                field: 'props.min',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'max',
            props: {},
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
            id: 'disabled',
            props: {},
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
            id: 'step',
            props: {},
            children: [
              {
                type: 'al-input-number',
                id: 'step',
                field: 'props.step',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showInput',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'showInput',
                field: 'props.showInput',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showInputControls',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'showInputControls',
                field: 'props.showInputControls',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {},
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
            id: 'inputSize',
            props: {},
            children: [
              {
                type: 'al-select',
                id: 'inputSize',
                field: 'props.inputSize',
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
            id: 'showStops',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'showStops',
                field: 'props.showStops',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showTooltip',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'showTooltip',
                field: 'props.showTooltip',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'formatTooltip',
            props: {},
            children: [
              {
                id: 'formatTooltip',
                field: 'props.formatTooltip',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'range',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'range',
                field: 'props.range',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'vertical',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'vertical',
                field: 'props.vertical',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'height',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'height',
                field: 'props.height',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {},
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
            props: {},
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
            id: 'rangeStartLabel',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'rangeStartLabel',
                field: 'props.rangeStartLabel',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rangeEndLabel',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'rangeEndLabel',
                field: 'props.rangeEndLabel',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'formatValueText',
            props: {},
            children: [
              {
                id: 'formatValueText',
                field: 'props.formatValueText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'debounce',
            props: {},
            children: [
              {
                type: 'al-input-number',
                id: 'debounce',
                field: 'props.debounce',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tooltipClass',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'tooltipClass',
                field: 'props.tooltipClass',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placement',
            props: {},
            children: [
              {
                type: 'al-select',
                id: 'placement',
                field: 'props.placement',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'top',
                    props: {
                      label: 'top',
                      value: 'top',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'top-start',
                    props: {
                      label: 'top-start',
                      value: 'top-start',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'top-end',
                    props: {
                      label: 'top-end',
                      value: 'top-end',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'bottom',
                    props: {
                      label: 'bottom',
                      value: 'bottom',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'bottom-start',
                    props: {
                      label: 'bottom-start',
                      value: 'bottom-start',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'bottom-end',
                    props: {
                      label: 'bottom-end',
                      value: 'bottom-end',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'left',
                    props: {
                      label: 'left',
                      value: 'left',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'left-start',
                    props: {
                      label: 'left-start',
                      value: 'left-start',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'left-end',
                    props: {
                      label: 'left-end',
                      value: 'left-end',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'right',
                    props: {
                      label: 'right',
                      value: 'right',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'right-start',
                    props: {
                      label: 'right-start',
                      value: 'right-start',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'right-end',
                    props: {
                      label: 'right-end',
                      value: 'right-end',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'marks',
            props: {},
            children: [
              {
                id: 'marks',
                field: 'props.marks',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'validateEvent',
            props: {},
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
