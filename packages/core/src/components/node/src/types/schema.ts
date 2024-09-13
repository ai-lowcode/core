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
  defaultValue?: any
  field?: string
  label?: string
  attrs?: any
  /**
   * 基础配置
   */
  type?: string
  icon?: string
  title?: string | Schema
  name?: string
  value?: any
  info?: string | Schema
  native?: boolean
  hidden?: boolean
  display?: boolean
  prefix?: string | Schema
  suffix?: string | Schema
  /**
   * 通用配置
   */
  class?: object | string | Array<any>
  style?: object | string
  // 设置父级组件的插槽,默认为default.可配合 slot 配置项使用
  children?: Array<Schema | string | any> | Function
}
