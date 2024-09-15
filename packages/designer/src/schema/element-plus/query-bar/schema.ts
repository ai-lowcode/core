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
            id: 'handleQuery',
            props: {
              label: '查询事件',
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
                      this.formData.value.value.visibleQueryDialog = true
                    },
                  },
                },
                children: ['设置查询事件'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleQueryDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置查询事件',
                },
                children: [
                  {
                    type: 'al-code-editor-atom',
                    id: 'handleQuery',
                    field: 'props.handleQuery',
                    modelField: 'modelValue',
                    props: {
                      class: 'flex item-center mt-2',
                      style: 'height: 200px',
                    },
                    events: {
                      confirmChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.value.visibleQueryDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.value.visibleQueryDialog = false
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
            id: 'handleReset',
            props: {
              label: '重置事件',
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
                      this.formData.value.value.visibleResetDialog = true
                    },
                  },
                },
                children: ['设置重置事件'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleResetDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置重置事件',
                },
                children: [
                  {
                    type: 'al-code-editor-atom',
                    id: 'handleReset',
                    field: 'props.handleReset',
                    modelField: 'modelValue',
                    props: {
                      class: 'flex item-center mt-2',
                      style: 'height: 200px',
                    },
                    events: {
                      confirmChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.value.visibleResetDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.value.visibleResetDialog = false
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
    ]
  },
}
