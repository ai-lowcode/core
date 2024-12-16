import { collapseConfig, collapseItemConfig } from '@/collapse/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlCollapse = componentFactory('AlCollapse', {
  componentConfig: collapseConfig,
})

export const AlCollapseItem = componentFactory('AlCollapseItem', {
  componentConfig: collapseItemConfig,
})
