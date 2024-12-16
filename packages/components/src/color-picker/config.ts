import { ColorPicker } from '@arco-design/web-vue'
import { ElColorPicker } from 'element-plus'

import { NColorPicker } from 'naive-ui'

import { ComponentType } from '@/common'

export const colorPickerConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElColorPicker,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: ColorPicker,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NColorPicker,
    bindMapping: {},
  },
}
