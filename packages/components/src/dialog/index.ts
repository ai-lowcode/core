import { componentFactory } from '@/common'
import { dialogConfig, messageBoxConfig } from '@/dialog/config.ts'

export * from './props.ts'

export const AlDialog = componentFactory('AlDialog', {
  componentConfig: dialogConfig,
})

export const AlMessageBox = componentFactory('AlMessageBox', {
  componentConfig: messageBoxConfig,
})
