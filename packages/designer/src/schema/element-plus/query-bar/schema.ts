import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '查询栏'
const name = 'query-bar'
const icon = 'fluent:button-16-regular'

export const QueryBarSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-query-bar',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      children: [
        {
          type: 'AlVueDragAble',
          id: `__${uniqueId()}`,
          label: '拖拽区',
          props: {
            class: 'min-h-[30px] w-[200px] flex flex-wrap bg-basic-color',
          },
          slotHidden: false,
          children: [],
        },
      ],
    }
  },
  // 插槽
  slots: () => {
    return <Schema[]>[
      {
        type: 'al-form',
        id: 'al-form',
        field: 'slots',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'al-form-item',
            id: 'default',
            props: {
              label: '隐藏默认插槽',
            },
            children: [
              {
                type: 'al-switch',
                id: 'default',
                field: 'slots.default',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
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
            id: 'searchInputList',
            props: {
              label: '搜索框列表',
            },
            children: [
              {
                type: 'al-array-atom',
                id: 'searchInputList',
                field: 'props.searchInputList',
                modelField: 'modelValue',
                props: {
                  popoverProps: {
                    title: '设置搜索框',
                  },
                  items: [
                    {
                      type: 'div',
                      id: 'div',
                      props: {
                        class: 'flex item-center',
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
                        },
                      ],
                    },
                    {
                      type: 'div',
                      id: 'div',
                      props: {
                        class: 'flex item-center mt-2',
                      },
                      children: [
                        {
                          type: 'div',
                          id: 'div',
                          props: {
                            class: 'w-[40px] text-left',
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
