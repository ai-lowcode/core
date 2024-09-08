import { Ref } from 'vue'

export interface FormDataType {
  value: Ref<Record<string, any>>
  getValueFromPath: (path?: string) => void
  generateObjectFromPath: (path?: string) => void
  setValueAtPath: (path?: string, newValue?: any) => void
}
