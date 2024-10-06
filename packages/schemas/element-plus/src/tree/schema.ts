import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '树形面板'
const name = 'tree-panel'
const icon = 'icomoon-free:tree'

export const TreePanelSchema = <CompSchema>{
  menu: 'display',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-tree-panel',
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
  // 事件
  events: () => {
    return [
      {
        key: 'onNodeClick',
        label: '节点点击触发',
      },
    ]
  },
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
              label: '展示数据',
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
                      this.formData.value.visibleDataDialog = true
                    },
                  },
                },
                children: ['设置展示数据'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleDataDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置展示数据',
                },
                children: [
                  {
                    type: 'al-data-source-atom',
                    id: 'treeSelectData',
                    field: 'props.treeSelectData',
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
                          this.formData.value.visibleDataDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleDataDialog = false
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
          {
            type: 'al-form-item',
            id: 'emptyText',
            props: {
              label: '内容为空的时候展示的文本',
            },
            children: [
              {
                type: 'al-input',
                id: 'emptyText',
                field: 'props.emptyText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'nodeKey',
            props: {
              label: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
            },
            children: [
              {
                type: 'al-input',
                id: 'nodeKey',
                field: 'props.nodeKey',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'props',
            props: {
              label: '配置选项，具体看下表',
            },
            children: [
              {
                type: 'al-object-atom',
                id: 'props',
                field: 'props.props',
                modelField: 'modelValue',
                events: {
                  onChange: changePropsData,
                },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'renderAfterExpand',
            props: {
              label: '是否在第一次展开某个树节点后才渲染其子节点',
            },
            children: [
              {
                type: 'al-switch',
                id: 'renderAfterExpand',
                field: 'props.renderAfterExpand',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'loadData',
            props: {
              label: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
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
                      console.log(this)
                      // eslint-disable-next-line ts/ban-ts-comment
                      // @ts-expect-error
                      this.formData.value.visibleDataLoadDialog = true
                    },
                  },
                },
                children: ['设置数据加载'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleDataLoadDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置数据加载',
                },
                children: [
                  {
                    type: 'al-code-editor-atom',
                    id: 'loadData',
                    field: 'props.loadData',
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
                          this.formData.value.visibleDataLoadDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleDataLoadDialog = false
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
            id: 'renderContent',
            props: {
              label: '树节点的内容区的渲染 Function',
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
            id: 'highlightCurrent',
            props: {
              label: '是否高亮当前选中节点，默认值是 false。',
            },
            children: [
              {
                type: 'al-switch',
                id: 'highlightCurrent',
                field: 'props.highlightCurrent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultExpandAll',
            props: {
              label: '是否默认展开所有节点',
            },
            children: [
              {
                type: 'al-switch',
                id: 'defaultExpandAll',
                field: 'props.defaultExpandAll',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'expandOnClickNode',
            props: {
              label: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
            },
            children: [
              {
                type: 'al-switch',
                id: 'expandOnClickNode',
                field: 'props.expandOnClickNode',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'checkOnClickNode',
            props: {
              label: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
            },
            children: [
              {
                type: 'al-switch',
                id: 'checkOnClickNode',
                field: 'props.checkOnClickNode',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'autoExpandParent',
            props: {
              label: '展开子节点的时候是否自动展开父节点',
            },
            children: [
              {
                type: 'al-switch',
                id: 'autoExpandParent',
                field: 'props.autoExpandParent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultExpandedKeys',
            props: {
              label: '默认展开的节点的 key 的数组',
            },
            children: [
              {
                id: 'defaultExpandedKeys',
                field: 'props.defaultExpandedKeys',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showCheckbox',
            props: {
              label: '节点是否可被选择',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showCheckbox',
                field: 'props.showCheckbox',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'checkStrictly',
            props: {
              label: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false',
            },
            children: [
              {
                type: 'al-switch',
                id: 'checkStrictly',
                field: 'props.checkStrictly',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultCheckedKeys',
            props: {
              label: '默认勾选的节点的 key 的数组',
            },
            children: [
              {
                id: 'defaultCheckedKeys',
                field: 'props.defaultCheckedKeys',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'currentNodeKey',
            props: {
              label: '当前选中的节点',
            },
            children: [
              {
                type: 'al-input',
                id: 'currentNodeKey',
                field: 'props.currentNodeKey',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterNodeMethod',
            props: {
              label: '对树节点进行筛选时执行的方法， 返回 `false` 则表示这个节点会被隐藏',
            },
            children: [
              {
                id: 'filterNodeMethod',
                field: 'props.filterNodeMethod',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'accordion',
            props: {
              label: '是否每次只打开一个同级树节点展开',
            },
            children: [
              {
                type: 'al-switch',
                id: 'accordion',
                field: 'props.accordion',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'indent',
            props: {
              label: '相邻级节点间的水平缩进，单位为像素',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'indent',
                field: 'props.indent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'icon',
            props: {
              label: '自定义树节点图标组件',
            },
            children: [
              {
                type: 'al-input',
                id: 'icon',
                field: 'props.icon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'lazy',
            props: {
              label: '是否懒加载子节点，需与 load 方法结合使用',
            },
            children: [
              {
                type: 'al-switch',
                id: 'lazy',
                field: 'props.lazy',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'draggable',
            props: {
              label: '是否开启拖拽节点功能',
            },
            children: [
              {
                type: 'al-switch',
                id: 'draggable',
                field: 'props.draggable',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'allowDrag',
            props: {
              label: '判断节点能否被拖拽 如果返回 `false` ，节点不能被拖动',
            },
            children: [
              {
                id: 'allowDrag',
                field: 'props.allowDrag',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'allowDrop',
            props: {
              label: '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 `false` ，拖动节点不能被拖放到目标节点。 `type` 参数有三种情况：\'prev\'、\'inner\' 和 \'next\'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
            },
            children: [
              {
                id: 'allowDrop',
                field: 'props.allowDrop',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
