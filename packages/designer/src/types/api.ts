import { ButtonProps } from 'element-plus'

import { ComponentInternalInstance } from 'vue'

import { Schema } from '@/types'

export interface Api {
  // 表单配置
  readonly config: object
  readonly options: object
  // 表单数据
  readonly form: object
  // 表单生成规则
  readonly rule: Schema[]
  // 父级表单的api
  readonly parent: Api | undefined
  // 最顶级表单的api
  readonly top: Api | undefined
  // 子表单的api
  readonly children: Api[]
  btn: {
    // 设置表单提交按钮加载状态
    loading: (loading: boolean) => void
    // 设置表单提交按钮禁用状态
    disabled: (disabled: boolean) => void
    // 设置表单提交按钮显示状态
    show: (show: boolean) => void
  }
  resetBtn: {
    // 设置表单重置按钮加载状态
    loading: (loading: boolean) => void
    // 设置表单重置按钮禁用状态
    disabled: (disabled: boolean) => void
    // 设置表单重置按钮显示状态
    show: (show: boolean) => void
  }
  // 获取组件的el/vm
  el: (id: string) => any
  // 获取`Form`组件的vm
  formEl: () => undefined | ComponentInternalInstance
  // 获取`FormItem`组件的vm
  wrapEl: (id: string) => undefined | ComponentInternalInstance
  // 更新表单提交按钮配置
  submitBtnProps: (props: ButtonProps) => void
  // 更新表单重置按钮配置
  resetBtnProps: (props: ButtonProps) => void
  // 获取表单数据
  formData: (() => object) & ((field: string[]) => object)
  // 根据field获取value
  getValue: (field: string) => any
  // 设置表单数据
  coverValue: (formData: object) => void
  setValue: ((formData: object) => void) & ((field: string, value: any) => void)
  // 根据field删除规则
  removeField: (field: string) => Schema
  // 删除表单生成规则中的 rule
  removeRule: (rule: Schema) => Schema
  // 获取所有字段名
  fields: () => string[]
  // 后置追加规则
  append: ((rule: Schema) => void) & ((rule: Schema, field: string) => void) & ((rule: Schema, field: string, child: boolean) => void)
  // 前置插入规则
  prepend: ((rule: Schema) => void) & ((rule: Schema, field: string) => void) & ((rule: Schema, field: string, child: boolean) => void)
  // 隐藏组件
  hidden: ((hidden: boolean) => void) & ((hidden: boolean, field: string | Array<string>) => void)
  display: ((hidden: boolean) => void) & ((hidden: boolean, field: string | Array<string>) => void)
  // 获取隐藏状态
  hiddenStatus: (field: string) => boolean
  displayStatus: (field: string) => boolean
  // 禁用组件
  disabled: ((disabled: boolean) => void) & ((disabled: boolean, field: string | Array<string>) => void)
  // 获取所有的表单组件规则
  model: () => { [field: string]: Schema }
  // 获取所有定义`name`的组件规则
  component: () => { [name: string]: Schema }
  // 重新加载表单
  reload: (rules: Schema[]) => void
  // 更新表单配置
  updateOptions: (options: object) => void
  // 监听提交表单
  onSubmit: (fn: (formData: object, api: Api) => void) => void
  // 提交表单
  submit: (success?: (formData: object, api: Api) => void, fail?: (api: Api) => void) => Promise<any>
  // 同步指定规则
  sync: ((field: string | string[]) => void) & ((rule: Schema | Schema[]) => void)
  // 重新渲染表单
  refresh: () => void
  refreshOptions: () => void
  // 隐藏表单
  hideForm: (hide?: boolean) => void
  // 表单修改状态
  changeStatus: () => boolean
  // 重置表单修改状态
  clearChangeStatus: () => void
  // 设置自定义属性
  setEffect: (id: string, attr: string, value: any) => void
  // 清理自定义属性数据
  clearEffectData: (id: string, attr?: string) => void
  // 更新组件规则
  updateRule: ((field: string, rule: Schema) => void) & ((rules: { [field: string]: Schema }) => void)
  mergeRule: (field: string, rule: Schema) => void
  mergeRules: (rules: { [field: string]: Schema }) => void
  // 获取组件规则
  getRule: ((id: string) => Schema) & ((id: string, origin: true) => Schema) & ((id: string, origin: false) => Schema)
  // 获取组件最终渲染规则
  getRenderRule: (id: string) => Schema
  // 通过`name`获取组件规则
  getRefRule: (id: string) => Schema | Schema[]
  // 更新组件验证规则
  updateValidate: (id: string, validate: object[], merge?: boolean) => Promise<any>
  updateValidates: (validates: { [id: string]: object[] }, merge?: boolean) => Promise<any>
  refreshValidate: () => void
  // 清理表单验证信息
  clearValidateState: (fields?: string | string[], clearSub?: boolean) => void
  clearSubValidateState: (fields?: string | string[]) => void
  // 表单验证
  validate: (callback?: (state: any) => void) => Promise<any>
  validateField: (field: string, callback?: (state: any) => void) => Promise<any>
  // 获取组件的方法
  method: (id: string, name: string) => (...args: any[]) => any
  // 手动执行组件的方法
  exec: (id: string, name: string, ...args: any[]) => any
  // 获取表单的json生成规则
  toJson: (space?: string | number) => string
  // 手动触发组件的事件
  trigger: (id: string, event: string, ...args: any[]) => void
  // 关闭指定frame组件的弹出框
  closeModal: (id: string) => void
  // 重置表单
  resetFields: (() => void) & ((field: string | string[]) => void)
  // 获取指定子表单
  getSubForm: (field: string) => Api | Api[]
  // 表单渲染后执行回调
  nextTick: (fn: (api: Api) => void) => void
  // 执行回调后重新渲染表单
  nextRefresh: (fn: Function) => void
  // 执行回调后同步formData
  deferSyncValue: (fn: Function, autoSync?: boolean) => void
  // 手动触发表单的事件
  emit: (event: string, ...args: any[]) => void
  // 监听表单事件
  on: (event: string | string[], callback: Function) => this
  // 监听表单事件,只触发一次
  once: (event: string | string[], callback: Function) => this
  // 取消监听事件
  off: (event?: string | string[], callback?: Function) => this
}
