export interface LoginParamType {
  username: string
  password: string
  rememberMe: boolean
  captchaValue: string
  captchaKey: string
  client_id: string
  client_secret: string
  grant_type: string
  redirect_uri: string
  mode: string
}

/**
 * Auth类型
 */
export interface AuthType {
  /**
   * 访问token
   */
  access_token: string
}

/**
 * 菜单类型
 */
export interface MenuType {
  /**
   * 菜单id
   */
  id: number
  /**
   * 菜单组件
   */
  component: string | any
  /**
   * 菜单信息
   */
  meta: MenuMeta
  /**
   * 菜单名称
   */
  name: string | number
  /**
   * 菜单路径
   */
  path: string
  /**
   * 菜单重定向地址
   */
  redirect: string
  /**
   * 菜单代码
   */
  menuCode: string
  /**
   * 菜单名称
   */
  menuName: string
  /**
   * 子菜单
   */
  children?: Array<MenuType>
}

export interface MenuMeta {
  activeMenu: number
  compType: number
  externalUrl: string
  id: number
  isExternal: number
  isKeepalive: number
  isVisible: number
  localFile: string
  lowcodePage: string
  menuCode: string
  menuIcon: string
  menuLevel: number
  menuName: string
  menuSort: number
  menuType: number
  parentId: string
  permissions: any
  remark: string
  routePath: string
  systemModule: string
  /**
   * 子菜单
   */
  children?: Array<MenuMeta>
}
