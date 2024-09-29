import type { Schema } from '@ai-lowcode/core'

/**
 * 拖拽组件描述规则结构
 */
export interface CompSchema {
  // 组件id，不能重复
  name: string
  // 组件的名称
  label?: string
  // 组件的图标
  icon?: string
  // 插入的分类
  menu?: string
  // 组件的生成规则
  schema: () => Schema
  // 组件属性配置的规则
  props: (changePropsData?: Function) => Schema[]
  slots?: () => Array<any>
  events?: () => Array<any>
  // 是否有配套的子组件，例如Row和Col
  children?: string
}
