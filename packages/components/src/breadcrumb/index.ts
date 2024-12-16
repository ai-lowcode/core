import { breadcrumbConfig, breadcrumbItemConfig } from '@/breadcrumb/config.ts'
import { componentFactory } from '@/common'

export * from './props.ts'

export const AlBreadcrumb = componentFactory('AlBreadcrumb', {
  componentConfig: breadcrumbConfig,
})

export const AlBreadcrumbItem = componentFactory('AlBreadcrumbItem', {
  componentConfig: breadcrumbItemConfig,
})
