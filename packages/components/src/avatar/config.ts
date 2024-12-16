import { Avatar } from '@arco-design/web-vue'
import { ElAvatar } from 'element-plus'

import { NAvatar } from 'naive-ui'

import { ComponentType } from '@/common'

export const avatarConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElAvatar,
    bindMapping: {},
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'visible',
    component: Avatar,
    bindMapping: {},
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'show',
    component: NAvatar,
    bindMapping: {},
  },
}
