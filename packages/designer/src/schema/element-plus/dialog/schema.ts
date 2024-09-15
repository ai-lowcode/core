import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '弹窗'
const name = 'dialog'
const icon = 'material-symbols-light:dialogs-outline-sharp'

export const DialogSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-dialog',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      // 值存储字段
      field: `__${uniqueId()}`,
      // modelValue 绑定参数
      modelField: 'modelValue',
      props: {},
      children: [
        {
          type: 'AlVueDragAble',
          id: `__${uniqueId()}`,
          label: '拖拽区',
          props: {
            class: 'min-h-[30px] w-[200px] bg-basic-color',
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
            id: 'title',
            props: {
              label: 'Dialog 对话框 Dialog 的标题',
            },
            children: [
              {
                type: 'al-input',
                id: 'title',
                field: 'props.title',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'width',
            props: {
              label: '对话框的宽度，默认值为 50%',
            },
            children: [
              {
                type: 'al-input',
                id: 'width',
                field: 'props.width',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'fullscreen',
            props: {
              label: '是否为全屏 Dialog',
            },
            children: [
              {
                type: 'al-switch',
                id: 'fullscreen',
                field: 'props.fullscreen',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'top',
            props: {
              label: 'dialog CSS 中的 margin-top 值',
            },
            children: [
              {
                type: 'al-input',
                id: 'top',
                field: 'props.top',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'modal',
            props: {
              label: '是否需要遮罩层',
            },
            children: [
              {
                type: 'al-switch',
                id: 'modal',
                field: 'props.modal',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'modalClass',
            props: {
              label: '遮罩的自定义类名',
            },
            children: [
              {
                type: 'al-input',
                id: 'modalClass',
                field: 'props.modalClass',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'appendToBody',
            props: {
              label: 'Dialog 自身是否插入至 body 元素上',
            },
            children: [
              {
                type: 'al-switch',
                id: 'appendToBody',
                field: 'props.appendToBody',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'appendTo',
            props: {
              label: 'Dialog 挂载到哪个 DOM 元素',
            },
            children: [
              {
                type: 'al-switch',
                id: 'appendTo',
                field: 'props.appendTo',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'lockScroll',
            props: {
              label: '是否在 Dialog 出现时将 body 滚动锁定',
            },
            children: [
              {
                type: 'al-switch',
                id: 'lockScroll',
                field: 'props.lockScroll',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'customClass',
            props: {
              label: 'Dialog 的自定义类名',
            },
            children: [
              {
                type: 'al-input',
                id: 'customClass',
                field: 'props.customClass',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'openDelay',
            props: {
              label: 'dialog 打开的延时时间，单位毫秒',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'openDelay',
                field: 'props.openDelay',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'closeDelay',
            props: {
              label: 'dialog 关闭的延时时间，单位毫秒',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'closeDelay',
                field: 'props.closeDelay',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'closeOnClickModal',
            props: {
              label: '是否可以通过点击 modal 关闭 Dialog',
            },
            children: [
              {
                type: 'al-switch',
                id: 'closeOnClickModal',
                field: 'props.closeOnClickModal',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'closeOnPressEscape',
            props: {
              label: '是否可以通过按下 ESC 关闭 Dialog',
            },
            children: [
              {
                type: 'al-switch',
                id: 'closeOnPressEscape',
                field: 'props.closeOnPressEscape',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showClose',
            props: {
              label: '是否显示关闭按钮',
            },
            children: [
              {
                type: 'al-switch',
                id: 'showClose',
                field: 'props.showClose',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'draggable',
            props: {
              label: '为 Dialog 启用可拖拽功能',
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
            id: 'overflow',
            props: {
              label: '拖动范围可以超出可视区',
            },
            children: [
              {
                type: 'al-switch',
                id: 'overflow',
                field: 'props.overflow',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'center',
            props: {
              label: '是否让 Dialog 的 header 和 footer 部分居中排列',
            },
            children: [
              {
                type: 'al-switch',
                id: 'center',
                field: 'props.center',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'alignCenter',
            props: {
              label: '是否水平垂直对齐对话框',
            },
            children: [
              {
                type: 'al-switch',
                id: 'alignCenter',
                field: 'props.alignCenter',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'destroyOnClose',
            props: {
              label: '当关闭 Dialog 时，销毁其中的元素',
            },
            children: [
              {
                type: 'al-switch',
                id: 'destroyOnClose',
                field: 'props.destroyOnClose',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'closeIcon',
            props: {
              label: '自定义关闭图标，默认 Close',
            },
            children: [
              {
                type: 'al-input',
                id: 'closeIcon',
                field: 'props.closeIcon',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'zIndex',
            props: {
              label: '和原生的 CSS 的 z-index 相同',
            },
            children: [
              {
                type: 'al-input-number',
                id: 'zIndex',
                field: 'props.zIndex',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headerAriaLevel',
            props: {
              label: 'header 的 aria-level 属性',
            },
            children: [
              {
                type: 'al-input',
                id: 'headerAriaLevel',
                field: 'props.headerAriaLevel',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
