import { autoCompleteConfig } from '@/auto-complete/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlAutoComplete = componentFactory('AlAutoComplete', {
  componentConfig: autoCompleteConfig,
})
