import { ColorPicker } from '@arco-design/web-vue'
import { ElColorPicker } from 'element-plus'
import { NColorPicker } from 'naive-ui'

import { ComponentType, componentFactory } from '@/common'

export const AlColorPicker = componentFactory('AlColorPicker', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElColorPicker,
    },
    [ComponentType.ArcoDesign]: {
      component: ColorPicker,
    },
    [ComponentType.NaiveUi]: {
      component: NColorPicker,
    },
  },
})
