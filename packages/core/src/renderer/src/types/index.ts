import { Ref } from 'vue'

/**
 * 全局formData 类型
 */
export interface FormDataType {
  value?: Ref<Record<string, any>>
  getValueFromPath: (path?: string) => void
  generateObjectFromPath: (path?: string) => void
  setValueAtPath: (path?: string, newValue?: any) => void
}

/**
 * 全局实例类型
 */
export interface GlobalInstanceType {
  value?: Ref<Record<string, any>>
  getInstanceFromKey: (key: string) => void
  setInstance: (key: string, value: any) => void
}
