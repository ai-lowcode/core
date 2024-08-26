import '@ai-lowcode/element-plus/css'

import { App } from 'vue'

import Designer from './index.vue'

import './style/index.css'

import './style/tailwind.css'

import { AlDragBox, AlVueDragAble } from '@/components/workspace/index.ts'

export * from './enums'

export * from './types'

export * from './components'

export const AlDesigner = Designer

export function initComponents(app: App) {
  app.component(AlDragBox.name as string, AlDragBox)
  app.component(AlVueDragAble.name as string, AlVueDragAble)
}
