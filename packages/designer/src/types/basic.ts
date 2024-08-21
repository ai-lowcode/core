import { FormRule } from '@form-create/element-ui'

import { Api, Schema } from '@/types'

interface SizeObject {
  span?: number
  offset?: number
}

interface Directive {
  value?: any
  arg?: string
  modifiers?: object
}

export interface VNodeData {
  type?: string
  slot?: string
  class?: any
  style?: string | object[] | object
  props?: { [key: string]: any }
  on?: { [key: string]: Function | Function[] }
  directives?: {
    [name: string]: Directive
  }
}

export interface VNodeRule extends VNodeData {
  children?: Array<VNodeRule | string>
}

export type ComponentSize = 'large' | 'default' | 'small'

interface UpdateArg {
  // 触发方式
  origin: 'change' | 'init' | 'link'
  // 关联触发的字段
  linkField: string | undefined
}
export type Update = (val: any, rule: FormRule, fApi: Api, arg: UpdateArg) => boolean | undefined

export type Control = Array<{
  // 通过内置条件控制,和`handle`二选一
  value?: any
  // 内置的条件,可以和`value`组合使用
  condition?: '==' | '!=' | '<>' | '>' | '>=' | '<' | '<=' | 'in' | 'notIn' | 'on' | 'notOn' | 'between' | 'notBetween' | 'empty' | 'notEmpty'
  // 自定义控制条件
  handle?: (val: any, api: Api) => boolean
  // 控制对应规则的显示,禁用,必填
  method?: 'display' | 'disabled' | 'hidden' | 'required'
  // 控制的字段
  rule: string[]
} | {
  // 通过内置条件控制,和`handle`二选一
  value?: any
  // 内置的条件,可以和`value`组合使用
  condition?: '==' | '!=' | '<>' | '>' | '>=' | '<' | '<=' | 'in' | 'notIn' | 'on' | 'notOn' | 'between' | 'notBetween' | 'empty' | 'notEmpty'
  // 自定义控制条件
  handle?: (val: any, api: Api) => boolean
  // 控制的规则
  rule: Schema[]
  // 条件达成时,将`rule`添加到对应字段后面
  append?: string
  // 条件达成时,将`rule`添加到对应字段前面
  prepend?: string
  // 条件达成时,将`rule`添加到对应字段的子级, 不配置`append`和`prepend`时,默认当前规则
  child?: boolean
}>

export interface ColProps {
  tag?: string | 'div'
  span?: number | 24
  offset?: number | 0
  pull?: number | 0
  push?: number | 0
  xs?: number | SizeObject
  sm?: number | SizeObject
  md?: number | SizeObject
  lg?: number | SizeObject
  xl?: number | SizeObject
}

export interface InjectArg {
  api: Api// api
  rule: Schema[]// 生成规则
  self: Schema// 当前生成规则
  option: object // 全局配置
  inject: any// 自定义注入的参数
  args: any[]// 原始回调参数
}

export interface FetchEffectOption {
  action: string | ((rule: object, api: object) => Promise<any>)
  to?: string
  parse?: string | ((body: any, rule: object, api: object) => any)
  method?: string
  data?: object
  dataType?: 'json'
  headers?: object
  withCredentials?: boolean
  onError?: (e: Error | ProgressEvent, rule: object, api: object) => void
  watch?: boolean
  wait?: number
}
