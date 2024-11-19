import { Drawer } from '@arco-design/web-vue'
import { ElDrawer } from 'element-plus'

import { NDrawer } from 'naive-ui'

import { ComponentType } from '@/common'

export const config = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDrawer,
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Drawer,
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDrawer,
  },
}
