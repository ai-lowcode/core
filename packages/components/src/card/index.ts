import { cardConfig } from '@/card/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlCard = componentFactory('AlCard', {
  componentConfig: cardConfig,
})
