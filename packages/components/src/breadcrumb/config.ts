import { Breadcrumb, BreadcrumbItem } from '@arco-design/web-vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

import { ComponentType } from '@/common'

export const breadcrumbConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElBreadcrumb,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Breadcrumb,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NBreadcrumb,
    bindMapping: {},
  },
}

export const breadcrumbItemConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElBreadcrumbItem,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: BreadcrumbItem,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NBreadcrumbItem,
    bindMapping: {},
  },
}
