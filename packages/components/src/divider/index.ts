import { componentFactory } from '@/common'
import { dividerConfig } from '@/divider/config.ts'

export * from './props.ts'

export const AlDivider = componentFactory('AlDivider', {
  componentConfig: dividerConfig,
})
