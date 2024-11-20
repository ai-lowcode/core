import type { Schema } from '@zero-dim/core'
import { uniqueId } from '@zero-dim/utils'

import { CompSchema } from '@/types'

const label = '提及'
const name = 'mention'
const icon = 'octicon:mention-24'

export const MentionSchema = <CompSchema>{
  menu: 'form',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-mention',
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
              label: '提及选项列表',
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
            id: 'prefix',
            props: {
              label: '触发字段的前缀。 字符串长度必须且只能为 1',
            },
            children: [
              {
                id: 'prefix',
                field: 'props.prefix',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'split',
            props: {
              label: '用于拆分提及的字符。 字符串长度必须且只能为 1',
            },
            children: [
              {
                type: 'al-input',
                id: 'split',
                field: 'props.split',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'filterOption',
            props: {
              label: '定制筛选器选项逻辑',
            },
            children: [
              {
                id: 'filterOption',
                field: 'props.filterOption',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'placement',
            props: {
              label: '设置弹出位置',
            },
            children: [
              {
                id: 'placement',
                field: 'props.placement',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showArrow',
            props: {
              label: '下拉菜单的内容是否有箭头',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showArrow',
                field: 'props.showArrow',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'offset',
            props: {
              label: '下拉面板偏移量',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'offset',
                field: 'props.offset',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'whole',
            props: {
              label: '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
            },
            children: [
              {
                type: 'al-switch',
                id: 'whole',
                field: 'props.whole',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'checkIsWhole',
            props: {
              label: '当退格键被按下做删除操作时，检查是否将提及部分作为整体删除',
            },
            children: [
              {
                id: 'checkIsWhole',
                field: 'props.checkIsWhole',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'loading',
            props: {
              label: '提及的下拉面板是否处于加载状态',
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
            id: 'popperClass',
            props: {
              label: '自定义浮层类名',
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
        ],
      },
    ]
  },
}
