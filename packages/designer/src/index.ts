import * as elementPlus from '@ai-lowcode/element-plus'

import '@ai-lowcode/element-plus/css'

import { App, Component } from 'vue'

import Designer from './index.vue'

import './style/index.css'

import './style/tailwind.css'

import * as Atoms from '@/atoms'
import { AlDragBox, AlVueDragAble } from '@/components/workspace/index.ts'

import { AlActionBar } from '@/schema/element-plus/action-bar'
import { AlQueryBar } from '@/schema/element-plus/query-bar'
import { AlSelectSchema } from '@/schema/element-plus/select'
import { AlDataTable } from '@/schema/element-plus/table'
import { AlTreeSelectSchema } from '@/schema/element-plus/tree-select'

export * from './enums'

export * from './types'

export * from './components'

export * from './utils'

export const AlDesigner = Designer

export function initComponents(app: App) {
  for (const elementPlusKey in elementPlus) {
    app.component(elementPlusKey, (elementPlus as Record<string, Component>)[elementPlusKey] as Component)
  }
  app.component(AlDragBox.name as string, AlDragBox)
  app.component(AlVueDragAble.name as string, AlVueDragAble)
  app.component(AlDataTable.name as string, AlDataTable)
  app.component(AlActionBar.name as string, AlActionBar)
  app.component(AlQueryBar.name as string, AlQueryBar)
  app.component(AlTreeSelectSchema.name as string, AlTreeSelectSchema)
  app.component(AlSelectSchema.name as string, AlSelectSchema)
  for (const atomsKey in Atoms) {
    app.component((Atoms as any)[atomsKey].name as string, (Atoms as any)[atomsKey])
  }
}
