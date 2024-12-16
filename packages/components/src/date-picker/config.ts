import { DatePicker } from '@arco-design/web-vue'
import { ElDatePicker } from 'element-plus'

import { NDatePicker } from 'naive-ui'

import { ComponentType } from '@/common'

export const datePickerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElDatePicker,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: DatePicker,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NDatePicker,
    bindMapping: {},
  },
}
