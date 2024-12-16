import { Divider } from '@arco-design/web-vue'
import { ElDivider } from 'element-plus'

import { NDivider } from 'naive-ui'

import { ComponentType } from '@/common'

export const dividerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDivider,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Divider,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDivider,
    bindMapping: {},
  },
}
