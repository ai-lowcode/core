import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '操作栏'
const name = 'action-bar'
const icon = 'material-symbols:action-key'

export const ActionBarSchema = <CompSchema>{
  menu: 'business',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-action-bar',
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
            id: 'leftOperationList',
            props: {
              label: '左侧操作按钮',
            },
            children: [
              {
                type: 'al-array-atom',
                id: 'leftOperationList',
                field: 'props.leftOperationList',
                modelField: 'modelValue',
                props: {
                  popoverProps: {
                    title: '设置操作按钮',
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
                                  children: ['标题:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'title',
                                  field: 'title',
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
                                  children: ['图标:'],
                                },
                                {
                                  type: 'al-icon-select',
                                  id: 'icon',
                                  field: 'icon',
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
                                  children: ['尺寸:'],
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
                                  children: ['类型:'],
                                },
                                {
                                  type: 'al-select',
                                  id: 'type',
                                  field: 'type',
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
                                    {
                                      type: 'al-option',
                                      id: 'text',
                                      props: {
                                        label: '文本',
                                        value: 'text',
                                      },
                                    },
                                    {
                                      type: 'al-option',
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
                                  children: ['是否为朴素按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'plain',
                                  field: 'plain',
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
                                  children: ['是否为文字按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'text',
                                  field: 'text',
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
                                  children: ['是否显示文字按钮背景颜色:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'bg',
                                  field: 'bg',
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
                                  children: ['是否为链接按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'link',
                                  field: 'link',
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
                                  children: ['是否为圆角按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'round',
                                  field: 'round',
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
                                  children: ['是否为圆形按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'circle',
                                  field: 'circle',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
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
                                  children: ['点击事件:'],
                                },
                                {
                                  type: 'al-button',
                                  id: 'data',
                                  props: {
                                    type: 'primary',
                                  },
                                  events: {
                                    onClick: {
                                      run() {
                                        console.log(this)
                                        // eslint-disable-next-line ts/ban-ts-comment
                                        // @ts-expect-error
                                        this.formData.value.visibleOnClickDialog = true
                                      },
                                    },
                                  },
                                  children: ['设置点击事件'],
                                },
                                {
                                  type: 'al-dialog',
                                  id: 'dialog',
                                  field: 'visibleOnClickDialog',
                                  modelField: 'modelValue',
                                  props: {
                                    title: '设置点击事件',
                                  },
                                  children: [
                                    {
                                      type: 'al-code-editor-atom',
                                      id: 'onClick',
                                      field: 'props.onClick',
                                      modelField: 'modelValue',
                                      props: {
                                        class: 'flex item-center mt-2',
                                        style: 'height: 200px',
                                      },
                                      events: {
                                        onChange: changePropsData,
                                        confirmChange: {
                                          run() {
                                            // eslint-disable-next-line ts/ban-ts-comment
                                            // @ts-expect-error
                                            this.formData.value.visibleOnClickDialog = false
                                          },
                                        },
                                        cancelChange: {
                                          run() {
                                            // eslint-disable-next-line ts/ban-ts-comment
                                            // @ts-expect-error
                                            this.formData.value.visibleOnClickDialog = false
                                          },
                                        },
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
                  ],
                },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rightOperationList',
            props: {
              label: '右侧操作按钮',
            },
            children: [
              {
                type: 'al-array-atom',
                id: 'rightOperationList',
                field: 'props.rightOperationList',
                modelField: 'modelValue',
                props: {
                  popoverProps: {
                    title: '设置操作按钮',
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
                                  children: ['标题:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'title',
                                  field: 'title',
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
                                  children: ['图标:'],
                                },
                                {
                                  type: 'al-icon-select',
                                  id: 'icon',
                                  field: 'icon',
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
                                  children: ['尺寸:'],
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
                                  children: ['类型:'],
                                },
                                {
                                  type: 'al-select',
                                  id: 'type',
                                  field: 'type',
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
                                    {
                                      type: 'al-option',
                                      id: 'text',
                                      props: {
                                        label: '文本',
                                        value: 'text',
                                      },
                                    },
                                    {
                                      type: 'al-option',
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
                                  children: ['是否为朴素按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'plain',
                                  field: 'plain',
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
                                  children: ['是否为文字按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'text',
                                  field: 'text',
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
                                  children: ['是否显示文字按钮背景颜色:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'bg',
                                  field: 'bg',
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
                                  children: ['是否为链接按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'link',
                                  field: 'link',
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
                                  children: ['是否为圆角按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'round',
                                  field: 'round',
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
                                  children: ['是否为圆形按钮:'],
                                },
                                {
                                  type: 'al-switch',
                                  id: 'circle',
                                  field: 'circle',
                                  modelField: 'modelValue',
                                  events: {
                                    onChange: changePropsData,
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
                                  children: ['点击事件:'],
                                },
                                {
                                  type: 'al-button',
                                  id: 'data',
                                  props: {
                                    type: 'primary',
                                  },
                                  events: {
                                    onClick: {
                                      run() {
                                        console.log(this)
                                        // eslint-disable-next-line ts/ban-ts-comment
                                        // @ts-expect-error
                                        this.formData.value.visibleOnClickDialog = true
                                      },
                                    },
                                  },
                                  children: ['设置点击事件'],
                                },
                                {
                                  type: 'al-dialog',
                                  id: 'dialog',
                                  field: 'visibleOnClickDialog',
                                  modelField: 'modelValue',
                                  props: {
                                    title: '设置点击事件',
                                  },
                                  children: [
                                    {
                                      type: 'al-code-editor-atom',
                                      id: 'onClick',
                                      field: 'props.onClick',
                                      modelField: 'modelValue',
                                      props: {
                                        class: 'flex item-center mt-2',
                                        style: 'height: 200px',
                                      },
                                      events: {
                                        onChange: changePropsData,
                                        confirmChange: {
                                          run() {
                                            // eslint-disable-next-line ts/ban-ts-comment
                                            // @ts-expect-error
                                            this.formData.value.visibleOnClickDialog = false
                                          },
                                        },
                                        cancelChange: {
                                          run() {
                                            // eslint-disable-next-line ts/ban-ts-comment
                                            // @ts-expect-error
                                            this.formData.value.visibleOnClickDialog = false
                                          },
                                        },
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
                  ],
                },
              },
            ],
          },
        ],
      },
    ]
  },
}
