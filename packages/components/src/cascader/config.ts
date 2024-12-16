import { Cascader } from '@arco-design/web-vue'
import { ElCascader } from 'element-plus'

import { NCascader } from 'naive-ui'

import { ComponentType } from '@/common'

export const cascaderConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCascader,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Cascader,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCascader,
    bindMapping: {},
  },
}
