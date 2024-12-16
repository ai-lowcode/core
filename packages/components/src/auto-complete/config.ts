import { AutoComplete } from '@arco-design/web-vue'
import { ElAutocomplete } from 'element-plus'

import { NAutoComplete } from 'naive-ui'

import { ComponentType } from '@/common'

export const autoCompleteConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElAutocomplete,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: AutoComplete,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NAutoComplete,
    bindMapping: {},
  },
}
