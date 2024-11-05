/**
 * 表单 schema
 */
export interface Schema {
  /**
   * 组件 id
   */
  id?: string
  /**
   * 字段绑定的值
   */
  field?: string
  /**
   * 组件名称标识
   */
  name?: string
  /**
   * 组件展示名称
   */
  label?: string
  /**
   * 组件渲染类型
   */
  type?: string
  /**
   * 组件 props
   */
  props?: Record<string, any>
  /**
   * 组件绑定参数
   */
  binds?: Record<string, any>
  /**
   * 组件事件
   */
  events?: Record<string, any>
  /**
   * 组件生命周期
   */
  lifeCycle?: Record<string, any>
  /**
   * 组件文本内容
   */
  content?: string
  /**
   * 组件所属插槽名称
   */
  slotName?: string
  /**
   * 隐藏插槽
   */
  slotHidden?: boolean
  /**
   * v-model 绑定的字段
   */
  modelField?: string
  /**
   * 输入默认值
   */
  defaultValue?: any
  /**
   * 组件 css 字符串
   */
  cssString?: string
  /**
   * 是否隐藏组件
   */
  hidden?: boolean
  /**
   * 子组件
   */
  children?: Array<Schema | string | any>
}
