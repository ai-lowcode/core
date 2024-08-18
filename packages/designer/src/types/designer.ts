import { Ref } from 'vue'

import { Schema } from '@/types/schema.ts'

export interface DesignerContext {
  selectComponent?: Ref<Schema>
  changeComponentSelect?: (comp: Schema) => void
  workspaceRef?: Ref<any>
}
