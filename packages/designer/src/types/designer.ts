import { Ref } from 'vue'

export interface DesignerContext {
  selectComponentId?: Ref<string>
  changeComponentSelect?: (id: string) => void
  workspaceRef?: Ref<any>
}
