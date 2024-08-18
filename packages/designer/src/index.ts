import { App } from 'vue'

import Designer from './index.vue'

import { AlDragBox, AlVueDragAble } from '@/layout/workspace/index.ts'

export * from './enums'

export * from './types'

export * from './components'

export const AlDesigner = Designer

export function initComponents(app: App) {
  app.component(AlDragBox.name as string, AlDragBox)
  app.component(AlVueDragAble.name as string, AlVueDragAble)
}
