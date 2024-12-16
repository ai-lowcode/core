import { colorPickerConfig } from '@/color-picker/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlColorPicker = componentFactory('AlColorPicker', {
  componentConfig: colorPickerConfig,
})
