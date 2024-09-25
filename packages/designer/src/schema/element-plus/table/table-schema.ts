import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '数据表格'
const name = 'data-table'
const icon = 'material-symbols-light:data-table'

export const TableSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-data-table',
      id: uniqueId(),
      icon,
      label,
      name,
      // 值存储字段
      field: 'dataSource',
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        class: 'w-full p-1',
        inline: true,
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
            id: 'data',
            props: {
              label: '数据源',
            },
            children: [
              {
                type: 'al-button',
                id: 'data',
                props: {
                  type: 'primary',
                },
                events: {
                  onClick: {
                    run() {
                      // eslint-disable-next-line ts/ban-ts-comment
                      // @ts-expect-error
                      this.formData.value.visibleDataSourceDialog = true
                    },
                  },
                },
                children: ['设置数据源'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleDataSourceDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置数据源',
                },
                children: [
                  {
                    type: 'al-data-source-atom',
                    id: 'array',
                    field: 'props.dataSource',
                    modelField: 'modelValue',
                    props: {
                      class: 'flex item-center mt-2',
                    },
                    events: {
                      onChange: changePropsData,
                      confirmChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleDataSourceDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleDataSourceDialog = false
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'columnList',
            props: {
              label: '列字段',
            },
            children: [
              {
                type: 'al-button',
                id: 'data',
                props: {
                  type: 'primary',
                },
                events: {
                  onClick: {
                    run() {
                      // eslint-disable-next-line ts/ban-ts-comment
                      // @ts-expect-error
                      this.formData.value.visibleTableColumnDialog = true
                    },
                  },
                },
                children: ['设置列字段'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleTableColumnDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置字段列',
                },
                children: [
                  {
                    type: 'al-data-source-atom',
                    id: 'array',
                    field: 'props.columnList',
                    modelField: 'modelValue',
                    props: {
                      class: 'flex item-center mt-2',
                    },
                    events: {
                      onChange: changePropsData,
                      confirmChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleTableColumnDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleTableColumnDialog = false
                        },
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'operationBtn',
            props: {
              label: '操作按钮',
            },
            children: [
              {
                type: 'al-array-atom',
                id: 'operationBtn',
                field: 'props.operationBtn',
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
                                  children: ['图标:'],
                                },
                                {
                                  type: 'al-input',
                                  id: 'icon',
                                  field: 'icon',
                                  modelField: 'modelValue',
                                  props: {
                                    class: 'flex-1',
                                  },
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
            id: 'height',
            props: {
              label: 'table 的高度',
            },
            children: [
              {
                type: 'al-input',
                id: 'height',
                field: 'props.height',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'maxHeight',
            props: {
              label: 'table 的最大高度',
            },
            children: [
              {
                type: 'al-input',
                id: 'maxHeight',
                field: 'props.maxHeight',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'stripe',
            props: {
              label: '是否为斑马纹 table',
            },
            children: [
              {
                type: 'al-switch',
                id: 'stripe',
                field: 'props.stripe',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'border',
            props: {
              label: '是否带有纵向边框',
            },
            children: [
              {
                type: 'al-switch',
                id: 'border',
                field: 'props.border',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '表单内组件的尺寸',
            },
            children: [
              {
                type: 'al-select',
                id: 'size',
                field: 'props.size',
                modelField: 'modelValue',
                props: {
                  teleported: false,
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
            type: 'al-form-item',
            id: 'fit',
            props: {
              label: '列的宽度是否自撑开',
            },
            children: [
              {
                type: 'al-switch',
                id: 'fit',
                field: 'props.fit',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showHeader',
            props: {
              label: '是否显示表头',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showHeader',
                field: 'props.showHeader',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'highlightCurrentRow',
            props: {
              label: '是否要高亮当前行',
            },
            children: [
              {
                type: 'al-switch',
                id: 'highlightCurrentRow',
                field: 'props.highlightCurrentRow',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'currentRowKey',
            props: {
              label: '当前行的 key',
            },
            children: [
              {
                type: 'al-input',
                id: 'currentRowKey',
                field: 'props.currentRowKey',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rowClassName',
            props: {
              label: '行的 className 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'rowClassName',
                field: 'props.rowClassName',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rowStyle',
            props: {
              label: '行的 style 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'rowStyle',
                field: 'props.rowStyle',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'cellClassName',
            props: {
              label: '单元格的 className 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'cellClassName',
                field: 'props.cellClassName',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'cellStyle',
            props: {
              label: '单元格的 style 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'cellStyle',
                field: 'props.cellStyle',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headerRowClassName',
            props: {
              label: '表头行的 className 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'headerRowClassName',
                field: 'props.headerRowClassName',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headerRowStyle',
            props: {
              label: '表头行的 style 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'headerRowStyle',
                field: 'props.headerRowStyle',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headerCellClassName',
            props: {
              label: '表头单元格的 className 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'headerCellClassName',
                field: 'props.headerCellClassName',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headerCellStyle',
            props: {
              label: '表头单元格的 style 的回调方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'headerCellStyle',
                field: 'props.headerCellStyle',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'rowKey',
            props: {
              label: '行数据的 Key',
            },
            children: [
              {
                type: 'al-input',
                id: 'rowKey',
                field: 'props.rowKey',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'emptyText',
            props: {
              label: '空数据时显示的文本内容',
            },
            children: [
              {
                type: 'al-input',
                id: 'emptyText',
                field: 'props.emptyText',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultExpandAll',
            props: {
              label: '是否默认展开所有行',
            },
            children: [
              {
                type: 'al-switch',
                id: 'defaultExpandAll',
                field: 'props.defaultExpandAll',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'expandRowKeys',
            props: {
              label: 'Table 目前的展开行',
            },
            children: [
              {
                type: 'al-switch',
                id: 'expandRowKeys',
                field: 'props.expandRowKeys',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultSort',
            props: {
              label: '默认的排序列的 prop 和顺序',
            },
            children: [
              {
                type: 'al-switch',
                id: 'defaultSort',
                field: 'props.defaultSort',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tooltipEffect',
            props: {
              label: '溢出的 tooltip 的 effect',
            },
            children: [
              {
                type: 'al-select',
                id: 'tooltipEffect',
                field: 'props.tooltipEffect',
                modelField: 'modelValue',
                props: {
                  teleported: false,
                },
                children: [
                  {
                    type: 'al-option',
                    id: 'dark',
                    props: {
                      label: '夜间',
                      value: 'dark',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'light',
                    props: {
                      label: '白天',
                      value: 'light',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showSummary',
            props: {
              label: '是否在表尾显示合计行',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showSummary',
                field: 'props.showSummary',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'sumText',
            props: {
              label: '显示摘要行第一列的文本',
            },
            children: [
              {
                type: 'al-input',
                id: 'sumText',
                field: 'props.sumText',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'summaryMethod',
            props: {
              label: '自定义的合计计算方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'summaryMethod',
                field: 'props.summaryMethod',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'spanMethod',
            props: {
              label: '合并行或列的计算方法',
            },
            children: [
              {
                type: 'al-input',
                id: 'spanMethod',
                field: 'props.spanMethod',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'selectOnIndeterminate',
            props: {
              label: '在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为',
            },
            children: [
              {
                type: 'al-switch',
                id: 'selectOnIndeterminate',
                field: 'props.selectOnIndeterminate',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'indent',
            props: {
              label: '展示树形数据时，树节点的缩进',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'indent',
                field: 'props.indent',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'lazy',
            props: {
              label: '是否懒加载子节点数据',
            },
            children: [
              {
                type: 'al-switch',
                id: 'lazy',
                field: 'props.lazy',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'load',
            props: {
              label: 'load 加载子节点数据的函数',
            },
            children: [
              {
                type: 'al-switch',
                id: 'load',
                field: 'props.load',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tableLayout',
            props: {
              label: '设置表格单元、行和列的布局方式',
            },
            children: [
              {
                type: 'al-select',
                id: 'tableLayout',
                field: 'props.tableLayout',
                modelField: 'modelValue',
                props: {
                  teleported: false,
                },
                children: [
                  {
                    type: 'al-option',
                    id: 'fixed',
                    props: {
                      label: 'fixed',
                      value: 'fixed',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'auto',
                    props: {
                      label: '自动',
                      value: 'auto',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showOverflowTooltip',
            props: {
              label: '是否隐藏额外内容并在单元格悬停时使用',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showOverflowTooltip',
                field: 'props.showOverflowTooltip',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'flexible',
            props: {
              label: '确保主轴的最小尺寸',
            },
            children: [
              {
                type: 'al-switch',
                id: 'flexible',
                field: 'props.flexible',
                modelField: 'modelValue',
                props: {},
              },
            ],
          },
        ],
      },
    ]
  },
}
