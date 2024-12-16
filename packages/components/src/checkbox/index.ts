import { checkboxConfig, checkboxGroupConfig } from '@/checkbox/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlCheckbox = componentFactory('AlCheckbox', {
  componentConfig: checkboxConfig,
})

export const AlCheckboxGroup = componentFactory('AlCheckboxGroup', {
  componentConfig: checkboxGroupConfig,
})
