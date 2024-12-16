import { componentFactory } from '@/common'
import { configProviderConfig } from '@/config-provider/config.ts'

export * from './props.ts'

export const AlConfigProvider = componentFactory('AlConfigProvider', {
  componentConfig: configProviderConfig,
})
