import { ConfigProvider } from '@arco-design/web-vue'
import { ElConfigProvider } from 'element-plus'

import { NConfigProvider } from 'naive-ui'

import { ComponentType } from '@/common'

export const configProviderConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElConfigProvider,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: ConfigProvider,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NConfigProvider,
    bindMapping: {},
  },
}
