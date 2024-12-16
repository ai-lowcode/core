import { componentFactory } from '@/common'
import { datePickerConfig } from '@/date-picker/config.ts'

export * from './props.ts'

export const AlDatePicker = componentFactory('AlDatePicker', {
  componentConfig: datePickerConfig,
})
