import { AlHttp } from '../../../http'

import { AuthType, LoginParamType, MenuType } from './types.ts'

/**
 * 接口配置
 * @constructor
 */
function Api() {
  return {
    FindMenu: `/oauth2/menu/roleTree`,
    Login: `/oauth2/accessToken`,
    UserInfo: `/oauth2/user/info`,
    Logout: `/oauth2/user/revoke`,
  }
}

/**
 * oauth2请求
 */
class Oauth2Api {
  /**
   * 登录
   * @param {LoginParamType} params 登录请求参数
   */
  login(params: LoginParamType) {
    return AlHttp.post<AuthType>(Api().Login, params, {
      withToken: false,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    })
  }

  /**
   * 获取以后信息
   */
  userInfo() {
    return AlHttp.get(Api().UserInfo, {}, {})
  }

  /**
   * 退出登录
   */
  logout() {
    return AlHttp.remove<AuthType>(
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

const oauth2Api = new Oauth2Api()

export { oauth2Api }
export * from './types.ts'
