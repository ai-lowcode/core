import { Optgroup, Option } from '@arco-design/web-vue'
import { ElOption, ElOptionGroup } from 'element-plus'

import { ComponentType, componentFactory } from '@/common'
import { selectConfig } from '@/select/select.ts'

export const AlSelect = componentFactory('AlSelect', {
  componentConfig: selectConfig,
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
