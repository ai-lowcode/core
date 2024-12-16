import { componentFactory } from '@/common'
import { descriptionsConfig, descriptionsItemConfig } from '@/descriptions/config.ts'

export * from './props.ts'

export const AlDescriptions = componentFactory('AlDescriptions', {
  componentConfig: descriptionsConfig,
})

export const AlDescriptionsItem = componentFactory('AlDescriptionsItem', {
  componentConfig: descriptionsItemConfig,
})
