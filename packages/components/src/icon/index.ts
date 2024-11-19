import { Icon } from '@arco-design/web-vue'
import { ElIcon } from 'element-plus'
import { NIcon } from 'naive-ui'

import { ComponentType } from '@/common'
import { componentFactory } from '@/common/componentFactory.ts'

export const AlIcon = componentFactory('AlIcon', {
  componentConfig: {
    [ComponentType.ElementPlus]: {
      component: ElIcon,
    },
    [ComponentType.ArcoDesign]: {
      component: Icon,
    },
    [ComponentType.NaiveUi]: {
      component: NIcon,
    },
  },
})
