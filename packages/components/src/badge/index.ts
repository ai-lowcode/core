import { badgeConfig } from '@/badge/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlBadge = componentFactory('AlBadge', {
  componentConfig: badgeConfig,
})
