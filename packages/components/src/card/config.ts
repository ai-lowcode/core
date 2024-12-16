import { Card } from '@arco-design/web-vue'
import { ElCard } from 'element-plus'

import { NCard } from 'naive-ui'

import { ComponentType } from '@/common'

export const cardConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCard,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Card,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCard,
    bindMapping: {},
  },
}
