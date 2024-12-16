import { componentFactory } from '@/common'
import { drawerConfig } from '@/drawer/config.ts'

export * from './props.ts'

export const AlDrawer = componentFactory('AlDrawer', {
  componentConfig: drawerConfig,
})
