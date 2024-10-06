import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = 'Tabs 标签页'
const name = 'tabs'
const icon = 'icomoon-free:tree'

export const TabsSchema = <CompSchema>{
  menu: 'display',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-tabs-schema',
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
            id: 'load',
            props: {
              label: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
            },
            children: [
              {
                id: 'load',
                field: 'props.load',
                modelField: 'modelValue',
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
