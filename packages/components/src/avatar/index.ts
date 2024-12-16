import { avatarConfig } from '@/avatar/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlAvatar = componentFactory('AlAvatar', {
  componentConfig: avatarConfig,
})
