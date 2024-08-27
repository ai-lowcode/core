import type { Schema } from '@ai-lowcode/core'
import { Ref } from 'vue'

export interface DesignerContext {
  selectComponent?: Ref<Schema>
  changeComponentSelect?: (comp: Schema) => void
  workspaceRef?: Ref<any>
}
