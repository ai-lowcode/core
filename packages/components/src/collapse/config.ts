import { Collapse, CollapseItem } from '@arco-design/web-vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'

import { NCollapse, NCollapseItem } from 'naive-ui'

import { ComponentType } from '@/common'

export const collapseConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCollapse,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Collapse,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCollapse,
    bindMapping: {},
  },
}

export const collapseItemConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCollapseItem,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: CollapseItem,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCollapseItem,
    bindMapping: {},
  },
}
