import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '自动补全'
const name = 'autocomplete'
const icon = 'ic:baseline-input'

export const AutocompleteSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-autocomplete',
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
            id: 'placeholder',
            props: {
              label: '占位文本',
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
            id: 'clearable',
            props: {
              label: '是否可清空',
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
            id: 'disabled',
            props: {
              label: '自动补全组件是否被禁用',
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
              label: '输入建议对象中用于显示的键名',
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
            id: 'debounce',
            props: {
              label: '获取输入建议的防抖延时，单位为毫秒',
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
            id: 'placement',
            props: {
              label: '菜单弹出位置',
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
                    id: 'top- start',
                    props: {
                      label: 'top- start',
                      value: 'top- start',
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
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'fetchSuggestions',
            props: {
              label: '获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 `callback(data:[]) ` 来返回它',
            },
            children: [
              {
                id: 'fetchSuggestions',
                field: 'props.fetchSuggestions',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'triggerOnFocus',
            props: {
              label: 'whether show suggestions when input focus',
            },
            children: [
              {
                type: 'al-switch',
                id: 'triggerOnFocus',
                field: 'props.triggerOnFocus',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'selectWhenUnmatched',
            props: {
              label: '在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件',
            },
            children: [
              {
                type: 'al-switch',
                id: 'selectWhenUnmatched',
                field: 'props.selectWhenUnmatched',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'name',
            props: {
              label: '等价于原生 input `name` 属性',
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
            id: 'ariaLabel',
            props: {
              label: '原生 `aria-label`属性',
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
            id: 'hideLoading',
            props: {
              label: '是否隐藏远程加载时的加载图标',
            },
            children: [
              {
                type: 'al-switch',
                id: 'hideLoading',
                field: 'props.hideLoading',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: '下拉列表的类名',
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
            id: 'popperAppendToBody',
            props: {
              label: '是否将下拉列表插入至 body 元素。 在下拉列表的定位出现问题时，可将该属性设置为 false',
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
            id: 'teleported',
            props: {
              label: '是否将下拉列表元素插入 append-to 指向的元素下',
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
            id: 'highlightFirstItem',
            props: {
              label: '是否默认高亮远程搜索结果的第一项',
            },
            children: [
              {
                type: 'al-switch',
                id: 'highlightFirstItem',
                field: 'props.highlightFirstItem',
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
        ],
      },
    ]
  },
}
