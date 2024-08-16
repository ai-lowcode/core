import * as formCreate from '@form-create/element-ui'
import { ComponentInternalInstance, Ref } from 'vue'

import { DeviceEnum, PreviewStatusEnum } from '@/designer'

export interface DesignerComponentInternalInstance extends ComponentInternalInstance {
  setupState?: any
}

export type Rule = formCreate.Rule
export type Api = formCreate.Api
export interface Options extends formCreate.Options {
  _resetBtn?: any
  _submitBtn?: any
  _event?: any
}

export interface OptionBtnConfig {
  click?: Function
  innerText?: string
  show?: boolean
}

// 定义函数返回规则或者通过rule字段返回规则
export type extendRule = (() => Rule[]) | { rule: () => Rule[], append?: boolean }

// 设计器的props.config配置
export interface DesignerConfig {
  // 配置field是否可以编辑
  fieldReadonly?: boolean
  // 是否显示右侧的配置界面
  showConfig?: boolean
  // 是否显示组件的基础配置表单
  showBaseForm?: boolean
  // 是否显示组件的属性配置表单
  showPropsForm?: boolean
  // 是否显示组件的事件配置表单
  showEventForm?: boolean
  // 是否显示组件的验证配置表单
  showValidateForm?: boolean
  // 是否显示表单配置
  showFormConfig?: boolean
  // 是否显示多端适配选项
  showDevice?: boolean
  // 基础配置的渲染规则，可以覆盖默认规则.append为true时追加到默认规则后面
  formRule?: extendRule
  // 组件配置的渲染规则，可以覆盖默认规则.append为true时追加到默认规则后面
  baseRule?: extendRule
  // 验证配置的渲染规则，可以覆盖默认规则.append为true时追加到默认规则后面
  validateRule?: extendRule
  // 表单的渲染规则，可以覆盖默认规则.append为true时追加到默认规则后面
  componentRule?: {
    // id组件拖拽组件规则的id，rule为当前组件的生成规则
    [id: string]: (rule: Rule,) => Rule[] | {
      rule: (rule: Rule,) => Rule[]
      append?: boolean
    }
  }
  showControl?: any
  appendConfigData?: any
}

// 拖拽组件描述规则结构
export interface DragRule {
  // 组件id，不能重复
  name: string
  // 组件的名称
  label?: string
  // 组件的图标
  icon?: string
  // 插入的分类
  menu?: 'main' | 'aide' | 'layout' | string
  // 如果是子表单组件，需要定义`value`的类型
  subForm?: 'object' | 'array'
  // 组件，不建议使用
  component?: any
  only?: any
  tool?: any
  slot?: any

  // 组件的生成规则
  rule: () => Rule

  // 组件属性配置的规则
  props: (rule: Rule, arg: { api: Api }) => Rule[]

  // 导出规则时通过这个方法转成最终规则
  parseRule?: (rule: Rule) => void
  // 导入规则时通过这个方法转成设计器中的渲染规则
  loadRule?: (rule: Rule) => void
  // 当props中的字段变化时触发
  watch?: {
    [key: string]: (arg: { value: any, rule: Rule, api: Api, field: string }) => void
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
  // 是否显示遮罩，避免对组件操作. 建议有子组件时为true，其他为false
  mask?: false | boolean
  // 当前组件支持的事件
  event?: string[]
  // 当前组件`value`的数据类型
  validate?: string[]
}

// 拖拽组件
export interface MenuItem {
  // 拖拽组件名
  label: string
  // 拖拽组件id
  name: string
  // 拖拽组件图标
  icon: string
  only: any
}
// 菜单
export interface Menu {
  // 菜单名
  title: string
  // 菜单id
  name: string
  // 拖拽组件列表
  list: MenuItem[]
}

export type MenuList = Menu[]

export type Handle = Array<{
  // 按钮名称
  label: string
  // 回调函数
  callback: Function
}>

export interface DragForm {
  /**
   * 表单生成规则
   */
  rule?: Rule | Array<Rule>
  /**
   * 实例对象
   */
  api?: Api
  /**
   * 表单数据
   */
  value?: object
  /**
   * 组件参数配置
   */
  options?: Options
  html?: string
  isShow?: boolean
  key?: string
  config?: Record<string, any>
  data?: any
}

export interface OperationCache {
  /**
   * 当前操作索引
   */
  index: number
  /**
   * 缓存操作 rule 列表
   */
  list: Array<any>
}

export interface OutLineTree {
  id: string
  rule: Rule
  children: Array<OutLineTree>
}

export interface UseDesignerType {
  previewDialogConfig: Ref<DragForm>
  device: Ref<DeviceEnum>
  previewStatus: Ref<PreviewStatusEnum>
  settingFormConfig: Ref<DragForm>
  settingPanelRef: any
  settingBaseConfig: Ref<DragForm>
  eventShow: Ref<boolean>
  settingPropsConfig: Ref<DragForm>
  workspacePreviewConfig: Ref<DragForm>
  settingValidateConfig: Ref<DragForm>
  workspaceEditConfig: Ref<DragForm>
  settingCustomConfig: Ref<DragForm>
  activeRule: Ref<Rule>
  configRef: Ref<DesignerConfig>
  selectComponent: any
  designerInstance: DesignerComponentInternalInstance | null
  changeSelectComponent: (value: string) => void
  toolActive: Function
  clearActiveRule: Function
  handleChange: Function
  watchActiveRule: Function
  getOption: Function
  getOptionsJson: Function
  unWatchActiveRuleFunc: Function
  setWorkspaceOption: Function
  deviceChange: Function
}

export interface UseRuleType {
  unloadStatus: Ref<boolean>
  operation: Ref<OperationCache>
  outlineTree: Ref<Array<OutLineTree>>
  dragRuleList: Ref<Record<string, DragRule>>
  workspaceRule: Ref<Array<Rule>>
  addOperationRecord: Function
  clearActiveRule: Function
  setRule: Function
  dragComponent: Function
  makeDragRule: Function
  makeChildren: Function
}
