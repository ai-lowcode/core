import { ColProps } from 'element-plus'

import { Update } from 'vite'
import { Component } from 'vue'

import { Api } from './api.ts'
import { ComponentSize, Control, InjectArg, VNodeRule } from './basic.ts'

/**
 * 表单 schema
 */
export interface Schema {
  id?: string
  props?: Record<string, any>
  binds?: Record<string, any>
  events?: Record<string, any>
  lifeCycle?: Record<string, any>
  // 插槽列表，可选
  slots?: Record<string, Schema[]>
  modelField?: string
  defaultValue?: string
  field?: string
  label?: string
  attrs?: any
  /**
   * 基础配置
   */
  type?: string
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
  on?: object
  directives?: object
  slot?: string
  /**
   * 扩展配置
   */
  component?: object | Component
  validate?: object[]
  options?: Array<any> | Function
  optionsTo?: string
  inject?: InjectArg
  effect?: {
    fetch?: any
    componentValidate?: string | boolean
    required?: boolean | string | object
    loadData?: any
    [key: string]: any
  }
  update?: Update
  link?: string[]
  col?: boolean | ColProps & {
    labelWidth?: number | string
    show?: boolean
  }
  // 设置组件的FormItem规则
  wrap?: boolean | VNodeRule & {
    labelWidth?: string
    required?: boolean
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    size?: ComponentSize
    show?: boolean
  }
  // 配置prop.sync,设置props中需要双向绑定属性的名称
  sync?: Array<any>
  // 控制其他组件显示
  control?: Control
  // 设置父级组件的插槽,默认为default.可配合 slot 配置项使用
  children?: Array<Schema | string | any> | Function
  emit?: Array<string | { name: string, inject: any }>
  emitPrefix?: string
}

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
  menu?: 'main' | 'aide' | 'layout' | 'template' | string
  // 如果是子表单组件，需要定义`value`的类型
  subForm?: 'object' | 'array'
  // 组件，不建议使用
  component?: Component
  // 组件的生成规则
  schema: () => Schema
  // 组件属性配置的规则
  props: (schema: Schema, arg: { api: Api }) => Schema[]
  // 导出规则时通过这个方法转成最终规则
  parseRule?: (schema: Schema) => void
  // 导入规则时通过这个方法转成设计器中的渲染规则
  loadRule?: (schema: Schema) => void
  // 当props中的字段变化时触发
  watch?: {
    [key: string]: (arg: { value: any, schema: Schema, api: Api, field: string }) => void
  }
  // 是否有配套的子组件，例如Row和Col
  children?: string
  // 初始化时渲染几个子组件
  childrenLen?: number
  // 当前组件的操作容器是否显示在组件内部，为false时操作容器包裹当前组件
  inside?: true | boolean
  // 是否可以拖入其他组件到当前组件内部
  drag?: true | string | boolean
  // 是否显示拖拽按钮
  dragBtn?: false | boolean
  // 控制操作操作按钮是否显示，显示哪些
  handleBtn?: true | boolean | Array<'create' | 'copy' | 'addChild' | 'delete'>
  // 隐藏基础配置中的字段
  hiddenBaseField?: string[]
  // 是否显示遮罩, 避免对组件操作. 建议有子组件时为true，其他为false
  mask?: false | boolean
  // 是否只能拖入一个
  only?: boolean
  // 是否生成name
  aide?: boolean
  // 是否支持样式配置
  style?: boolean
  // 当前组件支持的事件
  event?: string[]
  // 当前组件`value`的数据类型
  validate?: string[] | boolean
}
