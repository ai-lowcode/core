import { Optgroup, Option, Select } from '@arco-design/web-vue'
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus'
import { NSelect } from 'naive-ui'

import { ComponentType, componentFactory } from '@/common'

export const AlSelect = componentFactory('AlSelect', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElSelect,
    },
    [ComponentType.ArcoDesign]: {
      component: Select,
    },
    [ComponentType.NaiveUi]: {
      component: NSelect,
    },
  },
})

export const AlOption = componentFactory('AlOption', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElOption,
    },
    [ComponentType.ArcoDesign]: {
      component: Option,
    },
    [ComponentType.NaiveUi]: {
      component: ElOption,
    },
  },
})

export const AlOptionGroup = componentFactory('AlOptionGroup', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElOptionGroup,
    },
    [ComponentType.ArcoDesign]: {
      component: Optgroup,
    },
    [ComponentType.NaiveUi]: {
      component: ElOptionGroup,
    },
  },
})
