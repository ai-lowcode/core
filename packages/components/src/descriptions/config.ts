import { Descriptions, DescriptionsItem } from '@arco-design/web-vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'

import { NDescriptions, NDescriptionsItem } from 'naive-ui'

import { ComponentType } from '@/common'

export const descriptionsConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDescriptions,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Descriptions,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDescriptions,
    bindMapping: {},
  },
}

export const descriptionsItemConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDescriptionsItem,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: DescriptionsItem,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDescriptionsItem,
    bindMapping: {},
  },
}
