import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '选择'
const name = 'select'
const icon = 'fluent:select-all-on-16-regular'

export const SelectSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-select-schema',
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
                      this.formData.value.visibleSelectDataDialog = true
                    },
                  },
                },
                children: ['设置展示数据'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleSelectDataDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置展示数据',
                },
                children: [
                  {
                    type: 'al-data-source-atom',
                    id: 'selectData',
                    field: 'props.selectData',
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
                          this.formData.value.visibleSelectDataDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleSelectDataDialog = false
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
            id: 'value',
            props: {
              label: '选项value',
            },
            children: [
              {
                type: 'al-input',
                id: 'value',
                field: 'props.value',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'label',
            props: {
              label: '选项label',
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
            id: 'multiple',
            props: {
              label: '是否多选',
            },
            children: [
              {
                type: 'al-switch',
                id: 'multiple',
                field: 'props.multiple',
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
            id: 'valueKey',
            props: {
              label: '作为 value 唯一标识的键名，绑定值为对象类型时必填',
            },
            children: [
              {
                type: 'al-input',
                id: 'valueKey',
                field: 'props.valueKey',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'size',
            props: {
              label: '输入框尺寸',
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
            id: 'clearable',
            props: {
              label: '是否可以清空选项',
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
            id: 'collapseTags',
            props: {
              label: '多选时是否将选中值按文字的形式展示',
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
            id: 'multipleLimit',
            props: {
              label: '`multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'multipleLimit',
                field: 'props.multipleLimit',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'name',
            props: {
              label: 'Select 输入框的原生 name 属性',
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
            id: 'effect',
            props: {
              label: 'tooltip 主题，内置了 `dark` / `light` 两种',
            },
            children: [
              {
                type: 'al-select',
                id: 'effect',
                field: 'props.effect',
                modelField: 'modelValue',
                children: [
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
                    id: 'light` / ^[string]',
                    props: {
                      label: 'light` / ^[string]',
                      value: 'light` / ^[string]',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'autocomplete',
            props: {
              label: 'Select 输入框的原生 autocomplete 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'autocomplete',
                field: 'props.autocomplete',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placeholder',
            props: {
              label: '占位符，默认为“Select”',
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
            id: 'filterable',
            props: {
              label: 'Select 组件是否可筛选',
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
            id: 'allowCreate',
            props: {
              label: '是否允许用户创建新条目， 只有当 `filterable` 设置为 true 时才会生效。',
            },
            children: [
              {
                type: 'al-switch',
                id: 'allowCreate',
                field: 'props.allowCreate',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterMethod',
            props: {
              label: '自定义筛选方法',
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
            id: 'remote',
            props: {
              label: '其中的选项是否从服务器远程加载',
            },
            children: [
              {
                type: 'al-switch',
                id: 'remote',
                field: 'props.remote',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'remoteMethod',
            props: {
              label: '自定义远程搜索方法',
            },
            children: [
              {
                id: 'remoteMethod',
                field: 'props.remoteMethod',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'remoteShowSuffix',
            props: {
              label: '远程搜索方法显示后缀图标',
            },
            children: [
              {
                type: 'al-switch',
                id: 'remoteShowSuffix',
                field: 'props.remoteShowSuffix',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'loading',
            props: {
              label: '是否正在从远程获取数据',
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
            id: 'loadingText',
            props: {
              label: '从服务器加载数据时显示的文本，默认为“Loading”',
            },
            children: [
              {
                type: 'al-input',
                id: 'loadingText',
                field: 'props.loadingText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'noMatchText',
            props: {
              label: '搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置，默认是 “No matching data\'”',
            },
            children: [
              {
                type: 'al-input',
                id: 'noMatchText',
                field: 'props.noMatchText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'noDataText',
            props: {
              label: '无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容，默认是 “No data”',
            },
            children: [
              {
                type: 'al-input',
                id: 'noDataText',
                field: 'props.noDataText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: '选择器下拉菜单的自定义类名',
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
            id: 'reserveKeyword',
            props: {
              label: '当 `multiple` 和 `filterable`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词',
            },
            children: [
              {
                type: 'al-switch',
                id: 'reserveKeyword',
                field: 'props.reserveKeyword',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultFirstOption',
            props: {
              label: '是否在输入框按下回车时，选择第一个匹配项。 需配合 `filterable` 或 `remote` 使用',
            },
            children: [
              {
                type: 'al-switch',
                id: 'defaultFirstOption',
                field: 'props.defaultFirstOption',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'teleported',
            props: {
              label: '是否将下拉列表插入至 body 元素',
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
            id: 'persistent',
            props: {
              label: '当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除。',
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
            id: 'automaticDropdown',
            props: {
              label: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单',
            },
            children: [
              {
                type: 'al-switch',
                id: 'automaticDropdown',
                field: 'props.automaticDropdown',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'clearIcon',
            props: {
              label: '自定义清除图标',
            },
            children: [
              {
                id: 'clearIcon',
                field: 'props.clearIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'fitInputWidth',
            props: {
              label: '下拉框的宽度是否与输入框相同',
            },
            children: [
              {
                type: 'al-switch',
                id: 'fitInputWidth',
                field: 'props.fitInputWidth',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'suffixIcon',
            props: {
              label: '自定义后缀图标组件',
            },
            children: [
              {
                id: 'suffixIcon',
                field: 'props.suffixIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'suffixTransition^(deprecated)',
            props: {
              label: '下拉菜单显示/消失时后缀图标的动画',
            },
            children: [
              {
                type: 'al-switch',
                id: 'suffixTransition^(deprecated)',
                field: 'props.suffixTransition^(deprecated)',
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
                    id: '',
                    props: {
                      label: '',
                      value: '',
                    },
                  },
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
              label: '标签效果',
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
                    id: '',
                    props: {
                      label: '',
                      value: '',
                    },
                  },
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
          {
            type: 'al-form-item',
            id: 'fallbackPlacements',
            props: {
              label: 'dropdown 可用的 positions 请查看[popper.js 文档](https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements)',
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
            id: 'popperOptions',
            props: {
              label: '[popper.js](https://popper.js.org/docs/v2/) 参数',
            },
            children: [
              {
                id: 'popperOptions',
                field: 'props.popperOptions',
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
              label: '清空选项的值 [参考 config-provider](/en-US/component/config-provider#empty-values-configurations)',
            },
            children: [
              {
                id: 'valueOnClear',
                field: 'props.valueOnClear',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
