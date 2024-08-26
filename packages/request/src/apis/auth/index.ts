import { AlHttp } from '../../http'

import { AuthType, LoginParamType, MenuType } from './types.ts'

/**
 * 接口配置
 * @constructor
 */
function Api() {
  return {
    FindMenu: `/account/menus`,
    Login: `/auth/login`,
    Logout: `/account/logout`,
  }
}

/**
 * oauth2请求
 */
class AuthApi {
  /**
   * 登录
   * @param {LoginParamType} params 登录请求参数
   */
  login(params: LoginParamType) {
    return AlHttp.post<AuthType>(Api().Login, params, {
      withToken: false,
    })
  }

  /**
   * 退出登录
   */
  logout() {
    return AlHttp.get<AuthType>(
      Api().Logout,
      {},
    )
  }

  /**
   * 获取菜单
   */
  findMenu() {
    return AlHttp.get<MenuType>(
      Api().FindMenu,
      {},
      {
        isShowErrorMessage: false,
      },
    )
  }
}

const authApi = new AuthApi()

export { authApi }
export * from './types.ts'
