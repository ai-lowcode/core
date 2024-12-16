import { Checkbox, CheckboxGroup } from '@arco-design/web-vue'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'

import { NCheckbox, NCheckboxGroup } from 'naive-ui'

import { ComponentType } from '@/common'

export const checkboxConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCheckbox,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Checkbox,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCheckbox,
    bindMapping: {},
  },
}

export const checkboxGroupConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElCheckboxGroup,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: CheckboxGroup,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NCheckboxGroup,
    bindMapping: {},
  },
}
