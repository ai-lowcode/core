import { Drawer, Modal } from '@arco-design/web-vue'
import { ElDialog, ElMessageBox } from 'element-plus'

import { NDialog, NDrawer } from 'naive-ui'

import { ComponentType } from '@/common'

export const dialogConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDialog,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Modal,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDialog,
    bindMapping: {},
  },
}

export const messageBoxConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElMessageBox,
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
