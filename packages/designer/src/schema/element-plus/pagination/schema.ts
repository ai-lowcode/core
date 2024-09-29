import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '分页'
const name = 'pagination'
const icon = 'fluent:dual-screen-pagination-20-filled'

export const PaginationSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-pagination',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `pagination`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {
        layout: 'prev, pager, next',
        total: 50,
      },
    }
  },
  // 事件
  events: () => {
    return [
      {
        key: 'onSizeChange',
        label: 'page-size 改变时触发',
      },
      {
        key: 'onCurrentChange',
        label: 'current-page 改变时触发',
      },
      {
        key: 'onChange',
        label: 'current-page 或 page-size 更改时触发',
      },
      {
        key: 'onPrevClick',
        label: '用户点击上一页时触发',
      },
      {
        key: 'onNextClick',
        label: '用户点击下一页时触发',
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
            id: 'small',
            props: {
              label: '是否使用小型分页样式',
            },
            children: [
              {
                type: 'al-switch',
                id: 'small',
                field: 'props.small',
                modelField: 'modelValue',
                props: { min: 0 },
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
            id: 'background',
            props: {
              label: '是否为分页按钮添加背景色',
            },
            children: [
              {
                type: 'al-switch',
                id: 'background',
                field: 'props.background',
                modelField: 'modelValue',
                props: { min: 0 },
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'pageSize',
            props: {
              label: '每页显示条目个数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'pageSize',
                field: 'props.pageSize',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultPageSize',
            props: {
              label: '每页默认的条目个数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'defaultPageSize',
                field: 'props.defaultPageSize',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'total',
            props: {
              label: '总条目数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'total',
                field: 'props.total',
                modelField: 'modelValue',
              },
              {
                type: 'div',
                id: 'div',
                props: {
                  class: 'flex justify-end flex-1',
                },
                children: [
                  {
                    type: 'al-button',
                    id: 'total',
                    props: {
                      class: 'ml-2',
                      circle: true,
                    },
                    children: [
                      {
                        type: 'icon',
                        id: 'total',
                        props: {
                          icon: 'mingcute:code-fill',
                        },
                      },
                    ],
                    events: {
                      onClick() {
                        // eslint-disable-next-line ts/ban-ts-comment
                        // @ts-expect-error
                        this.formData.value.visibleVariableBindDialog = true
                      },
                    },
                  },
                ],
              },
              {
                type: 'al-dialog',
                id: 'dialog',
                field: 'visibleVariableBindDialog',
                modelField: 'modelValue',
                props: {
                  title: '变量绑定',
                },
                children: [
                  {
                    type: 'al-variable-bind-atom',
                    id: 'array',
                    field: 'props.total',
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
                          this.formData.value.visibleVariableBindDialog = false
                        },
                      },
                      cancelChange: {
                        run() {
                          // eslint-disable-next-line ts/ban-ts-comment
                          // @ts-expect-error
                          this.formData.value.visibleVariableBindDialog = false
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
            id: 'pageCount',
            props: {
              label: '总页数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'pageCount',
                field: 'props.pageCount',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'pagerCount',
            props: {
              label: '设置最大页码按钮数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'pagerCount',
                field: 'props.pagerCount',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'currentPage',
            props: {
              label: '当前页数',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'currentPage',
                field: 'props.currentPage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'defaultCurrentPage',
            props: {
              label: '当前页数的默认初始值',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'defaultCurrentPage',
                field: 'props.defaultCurrentPage',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'layout',
            props: {
              label: '组件布局，子组件名用逗号分隔',
            },
            children: [
              {
                type: 'al-input',
                id: 'layout',
                field: 'props.layout',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'pageSizes',
            props: {
              label: '每页显示个数选择器的选项设置',
            },
            children: [
              {
                type: 'al-input',
                id: 'pageSizes',
                field: 'props.pageSizes',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'popperClass',
            props: {
              label: '每页显示个数选择器的下拉框类名',
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
            id: 'prevText',
            props: {
              label: '替代图标显示的上一页文字',
            },
            children: [
              {
                type: 'al-input',
                id: 'prevText',
                field: 'props.prevText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'prevIcon',
            props: {
              label: '上一页的图标',
            },
            children: [
              {
                type: 'al-input',
                id: 'prevIcon',
                field: 'props.prevIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'nextText',
            props: {
              label: '替代图标显示的下一页文字',
            },
            children: [
              {
                type: 'al-input',
                id: 'nextText',
                field: 'props.nextText',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'nextIcon',
            props: {
              label: '下一页的图标',
            },
            children: [
              {
                type: 'al-input',
                id: 'nextIcon',
                field: 'props.nextIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {
              label: '是否禁用分页',
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
            id: 'teleported',
            props: {
              label: '是否将下拉菜单teleport至 body',
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
            id: 'hideOnSinglePage',
            props: {
              label: '只有一页时是否隐藏',
            },
            children: [
              {
                type: 'al-switch',
                id: 'hideOnSinglePage',
                field: 'props.hideOnSinglePage',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
