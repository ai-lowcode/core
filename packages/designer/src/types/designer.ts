import type { Schema } from '@zero-dim/core'
import { Ref } from 'vue'

export interface DesignerContext {
  selectComponent?: Ref<Schema>
  changeComponentSelect?: (comp: Schema) => void
  workspaceRef?: Ref<any>
}
