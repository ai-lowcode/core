import type { Schema } from '@ai-lowcode/core'
import { MaterType } from '@ai-lowcode/types'
/**
 * 拖拽组件描述规则结构
 */
export interface CompSchema {
  /**
   * 组件 id 不能重复
   */
  name: string
  /**
   * 组件名称
   */
  label?: string
  /**
   * 组件图标
   */
  icon?: string
  /**
   * 组件分类
   */
  menu?: MaterType
  /**
   * 组件生产规则
   */
  schema: () => Schema
  /**
   * 组件属性配置规则
   * @param changePropsData 测试
   */
  props: (changePropsData?: Function) => Schema[]
  /**
   * 组件插槽
   */
  slots?: () => Array<any>
  /**
   * 组件绑定事件
   */
  events?: () => Array<any>
  /**
   * 是否配有子组件，例如 row，col
   */
  children?: string
}
