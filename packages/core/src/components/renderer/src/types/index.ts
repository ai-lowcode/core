import { Ref } from 'vue'

export interface FormDataType {
  value?: Ref<Record<string, any>>
  getValueFromPath: (path?: string) => void
  generateObjectFromPath: (path?: string) => void
  setValueAtPath: (path?: string, newValue?: any) => void
}

export interface GlobalInstanceType {
  value?: Ref<Record<string, any>>
  getInstanceFromKey: (key: string) => void
  setInstance: (key: string, value: any) => void
}
