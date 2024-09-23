/**
 * 表单 schema
 */
export interface Schema {
  id?: string
  props?: Record<string, any>
  binds?: Record<string, any>
  events?: Record<string, any>
  lifeCycle?: Record<string, any>
  content?: string
  // 插槽列表，可选
  slotName?: string
  slotHidden?: boolean
  modelField?: string
  modelMethod?: string
  defaultValue?: any
  field?: string
  label?: string
  attrs?: any
  modelType?: string
  cssString?: string
  /**
   * 基础配置
   */
  type?: string
  name?: string
  hidden?: boolean
  // 设置父级组件的插槽,默认为default.可配合 slot 配置项使用
  children?: Array<Schema | string | any> | Function
}
