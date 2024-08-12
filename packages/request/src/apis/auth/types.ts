export interface LoginParamType {
  username: string
  password: string
  captchaId: string
  verifyCode: string
}

/**
 * Auth类型
 */
export interface AuthType {
  /**
   * 访问token
   */
  token: string
}

/**
 * 菜单类型
 */
export interface MenuType {
  /**
   * 是否为移动端菜单
   */
  id: number
  /**
   * 权限点
   */
  component: string
  /**
   * 渲染类型
   */
  meta: MenuMeta
  /**
   * 菜单外链
   */
  name: string
  /**
   * 菜单图标
   */
  path: string
  /**
   * 是否是管理员菜单
   */
  redirect: string
  /**
   * 子菜单
   */
  children?: Array<MenuType>
}

export interface MenuMeta {
  activeMenu: number
  extOpenMode: number
  icon: string
  isExt: boolean
  keepAlive: number
  orderNo: number
  show: number
  status: number
  title: string
  type: number
}
