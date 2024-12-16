import { Drawer } from '@arco-design/web-vue'
import { ElAside, ElContainer, ElFooter, ElHeader, ElMain } from 'element-plus'

import { NDrawer } from 'naive-ui'

import { ComponentType } from '@/common'

export const asideConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElAside,
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

export const containerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElContainer,
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

export const footerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElFooter,
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

export const headerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElHeader,
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

export const mainConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElMain,
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
