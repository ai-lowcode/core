import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '级联选择器'
const name = 'cascader'
const icon = 'fluent:button-16-regular'

export const CascaderSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-cascader',
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
            id: 'options',
            props: {
              label: '选项的数据源， `value` 和 `label` 可以通过 `CascaderProps` 自定义.',
            },
            children: [
              {
                id: 'options',
                field: 'props.options',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'props',
            props: {
              label: '配置选项, 请参阅下面 `CascaderProps` 表。',
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
            id: 'placeholder',
            props: {
              label: '输入框占位文本',
            },
            children: [
              {
                type: 'al-input',
                id: 'placeholder',
                field: 'props.placeholder',
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
            id: 'clearable',
            props: {
              label: '是否支持清空选项',
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
            id: 'showAllLevels',
            props: {
              label: '输入框中是否显示选中值的完整路径',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showAllLevels',
                field: 'props.showAllLevels',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'collapseTags',
            props: {
              label: '多选模式下是否折叠Tag',
            },
            children: [
              {
                type: 'al-switch',
                id: 'collapseTags',
                field: 'props.collapseTags',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'collapseTagsTooltip',
            props: {
              label: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapse-tags`属性必须设定为 true',
            },
            children: [
              {
                type: 'al-switch',
                id: 'collapseTagsTooltip',
                field: 'props.collapseTagsTooltip',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'separator',
            props: {
              label: '用于分隔选项的字符',
            },
            children: [
              {
                type: 'al-input',
                id: 'separator',
                field: 'props.separator',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterable',
            props: {
              label: '该选项是否可以被搜索',
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
            id: 'filterMethod',
            props: {
              label: '自定义搜索逻辑，第一个参数是`node`，第二个参数是`keyword`，返回的布尔值表示是否保留该选项',
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
            id: 'debounce',
            props: {
              label: '搜索关键词正在输入时的去抖延迟，单位为毫秒',
            },
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
            id: 'beforeFilter',
            props: {
              label: '过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 `false` 或者是一个被拒绝的 `Promise`，那么接下来的过滤逻辑便不会执行。',
            },
            children: [
              {
                id: 'beforeFilter',
                field: 'props.beforeFilter',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: '弹出内容的自定义类名',
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
            id: 'teleported',
            props: {
              label: '弹层是否使用 teleport',
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
          {
            type: 'al-form-item',
            id: 'popperAppendToBody',
            props: {
              label: '是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false',
            },
            children: [
              {
                type: 'al-switch',
                id: 'popperAppendToBody',
                field: 'props.popperAppendToBody',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tagType',
            props: {
              label: '标签类型',
            },
            children: [
              {
                type: 'al-select',
                id: 'tagType',
                field: 'props.tagType',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'success',
                    props: {
                      label: 'success',
                      value: 'success',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'info',
                    props: {
                      label: 'info',
                      value: 'info',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'warning',
                    props: {
                      label: 'warning',
                      value: 'warning',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'danger',
                    props: {
                      label: 'danger',
                      value: 'danger',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'tagEffect',
            props: {
              label: 'tag effect',
            },
            children: [
              {
                type: 'al-select',
                id: 'tagEffect',
                field: 'props.tagEffect',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'light',
                    props: {
                      label: 'light',
                      value: 'light',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'dark',
                    props: {
                      label: 'dark',
                      value: 'dark',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'plain',
                    props: {
                      label: 'plain',
                      value: 'plain',
                    },
                  },
                ],
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
            id: 'maxCollapseTags',
            props: {
              label: '需要显示的 Tag 的最大数量 只有当 `collapse-tags` 设置为 true 时才会生效。',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'maxCollapseTags',
                field: 'props.maxCollapseTags',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'emptyValues',
            props: {
              label: '组件的空值配置 [参考config-provider](/en-US/component/config-provider#empty-values-configurations)',
            },
            children: [
              {
                id: 'emptyValues',
                field: 'props.emptyValues',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'valueOnClear',
            props: {
              label: '清空选项的值  [参考 config-provider](/en-US/component/config-provider#empty-values-configurations)',
            },
            children: [
              {
                id: 'valueOnClear',
                field: 'props.valueOnClear',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'persistent',
            props: {
              label: '当下拉框未被激活并且`persistent`设置为`false`，下拉框容器会被删除。',
            },
            children: [
              {
                type: 'al-switch',
                id: 'persistent',
                field: 'props.persistent',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'fallbackPlacements',
            props: {
              label: 'Tooltip 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)',
            },
            children: [
              {
                id: 'fallbackPlacements',
                field: 'props.fallbackPlacements',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placement',
            props: {
              label: '下拉框出现的位置',
            },
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
        ],
      },
    ]
  },
}
