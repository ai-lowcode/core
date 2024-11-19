import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '分段控制器'
const name = 'segmented'
const icon = 'bi:segmented-nav'

export const SegmentedSchema = <CompSchema>{
  menu: 'form',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-segmented-schema',
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
  props: (changePropsData?: Function) => {
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
              label: '选项列表',
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
                children: ['设置选项列表'],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleDataSourceDialog',
                modelField: 'modelValue',
                props: {
                  title: '设置选项列表',
                },
                children: [
                  {
                    type: 'al-data-source-atom',
                    id: 'array',
                    field: 'props.options',
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
            id: 'size',
            props: {
              label: 'segmented 的大小',
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
            id: 'block',
            props: {
              label: '撑满父元素宽度',
            },
            children: [
              {
                type: 'al-switch',
                id: 'block',
                field: 'props.block',
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
            id: 'name',
            props: {
              label: '原生 name 属性',
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
            id: 'id',
            props: {
              label: '原生 id 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'id',
                field: 'props.id',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'ariaLabel',
            props: {
              label: '原生 aria-label 属性',
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
        ],
      },
    ]
  },
}
