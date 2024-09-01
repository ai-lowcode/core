import * as elementPlus from '@ai-lowcode/element-plus'

import '@ai-lowcode/element-plus/css'

import { App, Component } from 'vue'

import Designer from './index.vue'

import './style/index.css'

import './style/tailwind.css'

import { AlDragBox, AlVueDragAble } from '@/components/workspace/index.ts'

export * from './enums'

export * from './types'

export * from './components'

export * from './utils'

export const AlDesigner = Designer

export function initComponents(app: App) {
  app.component(AlDragBox.name as string, AlDragBox)
  app.component(AlVueDragAble.name as string, AlVueDragAble)
  for (const elementPlusKey in elementPlus) {
    app.component(elementPlusKey, (elementPlus as Record<string, Component>)[elementPlusKey] as Component)
  }
}
