import { Badge } from '@arco-design/web-vue'
import { ElBadge } from 'element-plus'

import { NBadge } from 'naive-ui'

import { ComponentType } from '@/common'

export const badgeConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElBadge,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Badge,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NBadge,
    bindMapping: {},
  },
}
