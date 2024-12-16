import { cascaderConfig } from '@/cascader/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlCascader = componentFactory('AlCascader', {
  componentConfig: cascaderConfig,
})
