import { componentFactory } from '@/common'
import { asideConfig, containerConfig, footerConfig, headerConfig, mainConfig } from '@/container/config.ts'

export * from './props.ts'

export const AlFooter = componentFactory('AlFooter', {
  componentConfig: footerConfig,
})

export const AlMain = componentFactory('AlMain', {
  componentConfig: mainConfig,
})

export const AlAside = componentFactory('AlAside', {
  componentConfig: asideConfig,
})

export const AlHeader = componentFactory('AlHeader', {
  componentConfig: headerConfig,
})

export const AlContainer = componentFactory('AlContainer', {
  componentConfig: containerConfig,
})
