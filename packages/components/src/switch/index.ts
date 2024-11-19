import { Switch } from '@arco-design/web-vue'
import { ElSwitch } from 'element-plus'
import { NSwitch } from 'naive-ui'

import { ComponentType, componentFactory } from '@/common'

export const AlSwitch = componentFactory('AlSwitch', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElSwitch,
    },
    [ComponentType.ArcoDesign]: {
      component: Switch,
    },
    [ComponentType.NaiveUi]: {
      component: NSwitch,
    },
  },
})
