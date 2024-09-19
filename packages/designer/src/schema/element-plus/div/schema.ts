import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = 'div'
const name = 'div'
const icon = 'material-symbols-light:dialogs-outline-sharp'

export const DivSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'div',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
      props: {
        class: 'p-1 w-full',
      },
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
  props: () => {},
}
