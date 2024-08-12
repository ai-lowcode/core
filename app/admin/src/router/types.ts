/**
 * 路由枚举常量
 */
export enum RouteNameEnum {
  /**
   * 首页
   */
  HOME = 'home',
  /**
   * LAYOUT
   */
  LAYOUT = 'layout',
  /**
   * 登录页
   */
  LOGIN = 'login',
  /**
   * 重定向页
   */
  REDIRECT = 'redirect',
  /**
   * 403
   */
  FORBIDDEN = 'forbidden',
  /**
   * 404
   */
  NOT_FOUND = 'notfound',
}

/**
 * 路由白名单
 */
export const ROUTER_WHITE_LIST = [
  RouteNameEnum.FORBIDDEN,
  RouteNameEnum.NOT_FOUND,
  RouteNameEnum.REDIRECT,
  RouteNameEnum.LOGIN,
]
