// 基础类型
import { ComponentMenu } from '@/enums'

// 设计器类型
export * from './designer.ts'

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

export interface ActiveComponentMenu {
  menu: ComponentMenu
  expand: boolean
}
