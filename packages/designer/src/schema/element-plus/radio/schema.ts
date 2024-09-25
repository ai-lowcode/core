import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '单选框'
const name = 'radio'
const icon = 'fluent:radio-button-20-filled'

export const RadioSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-radio-schema',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'p-1',
      },
    }
  },
  // 插槽
  slots: () => {},
  // 事件
  events: () => {},
  // 属性
  props: (changePropsData: Function) => {
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
            id: 'radioList',
            props: {
              label: 'radio选项',
            },
            children: [
              {
                type: 'al-array-atom',
                id: 'radioList',
                field: 'props.radioList',
                modelField: 'modelValue',
                props: {
                  popoverProps: {
                    title: '设置radio选项',
                    width: 480,
                  },
                  items: [
                    {
                      type: 'div',
                      id: 'div',
                      props: {
                        class: 'flex flex-row',
                      },
                      children: [
                        {
                          type: 'div',
                          id: 'div',
                          props: {
                            class: 'flex flex-col flex-1 pr-2',
                          },
                          children: [
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex item-center',
                                showInBlock: true,
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-[40px] text-left',
                                  },
                                  children: ['值:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'value',
                                  field: 'value',
                                  modelField: 'modelValue',
                                  props: {
                                    class: 'flex-1',
                                  },
                                  events: {
                                    onBlur: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['值是否为数字:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'isNumber',
                                  field: 'isNumber',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['单选框的 label:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'label',
                                  field: 'label',
                                  modelField: 'modelValue',
                                  props: {
                                    class: 'flex-1',
                                  },
                                  events: {
                                    onBlur: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['按钮类型:'],
                                },
                                {
                                  type: 'al-select',
                                  id: 'btnType',
                                  field: 'btnType',
                                  modelField: 'modelValue',
                                  props: {
                                    teleported: false,
                                  },
                                  events: {
                                    onChange: changePropsData,
                                  },
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
                                      id: 'radio',
                                      props: {
                                        label: 'radio',
                                        value: 'radio',
                                      },
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['是否禁用单选框:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'disabled',
                                  field: 'disabled',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['是否显示边框:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'border',
                                  field: 'border',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['单选框的尺寸:'],
                                },
                                {
                                  type: 'al-select',
                                  id: 'size',
                                  field: 'size',
                                  modelField: 'modelValue',
                                  props: {
                                    teleported: false,
                                  },
                                  events: {
                                    onChange: changePropsData,
                                  },
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
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['原始 `name` 属性:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'name',
                                  field: 'name',
                                  modelField: 'modelValue',
                                  events: {
                                    onBlur: changePropsData,
                                  },
                                },
                              ],
                            },
                          ],
                        },
                        {
                          type: 'div',
                          id: 'div',
                          props: {
                            class: 'flex flex-col flex-1 pl-2',
                          },
                          children: [
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['是否为加载中状态:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'loading',
                                  field: 'loading',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['按钮是否为禁用状态:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'disabled',
                                  field: 'disabled',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['原生 autofocus 属性:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'autofocus',
                                  field: 'autofocus',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['尺寸:'],
                                },
                                {
                                  type: 'al-select',
                                  id: 'nativeType',
                                  field: 'nativeType',
                                  modelField: 'modelValue',
                                  props: {
                                    teleported: false,
                                  },
                                  events: {
                                    onChange: changePropsData,
                                  },
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
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['自动在两个中文字符之间插入空格:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'autoInsertSpace',
                                  field: 'autoInsertSpace',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['自定义按钮颜色:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'color',
                                  field: 'color',
                                  modelField: 'modelValue',
                                  events: {
                                    onBlur: changePropsData,
                                  },
                                },
                              ],
                            },
                            {
                              type: 'div',
                              id: 'div',
                              props: {
                                class: 'flex flex-col mt-2',
                              },
                              children: [
                                {
                                  type: 'div',
                                  id: 'div',
                                  props: {
                                    class: 'w-full text-left',
                                  },
                                  children: ['dark 模式:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'color',
                                  field: 'color',
                                  modelField: 'modelValue',
                                  events: {
                                    onBlur: changePropsData,
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'modelValue',
            props: {
              label: '绑定值',
            },
            children: [
              {
                type: 'al-input',
                id: 'modelValue',
                field: 'props.modelValue',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '单选框按钮或边框按钮的大小',
            },
            children: [
              {
                type: 'al-input',
                id: 'size',
                field: 'props.size',
                modelField: 'modelValue',
              },
            ],
          },
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
            id: 'textColor',
            props: {
              label: '按钮形式的 Radio 激活时的文本颜色',
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
            id: 'fill',
            props: {
              label: '按钮形式的 Radio 激活时的填充色和边框色',
            },
            children: [
              {
                type: 'al-input',
                id: 'fill',
                field: 'props.fill',
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
            id: 'label',
            props: {
              label: '与 RadioGroup 中的 `aria-label` 属性相同',
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
              label: '与 RadioGroup 中的 `aria-label` 属性相同',
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
            id: 'name',
            props: {
              label: '原生 `name` 属性',
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
        ],
      },
    ]
  },
}
