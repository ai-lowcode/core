import { Drawer } from '@arco-design/web-vue'
import { ElDrawer } from 'element-plus'

import { NDrawer } from 'naive-ui'

import { ComponentType } from '@/common'

export const drawerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDrawer,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Drawer,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDrawer,
    bindMapping: {},
  },
}
