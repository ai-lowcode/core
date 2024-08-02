import { webStorage } from '@ai-lowcode/hooks'
import { nProgress } from '@ai-lowcode/utils'
import { App } from 'vue'
import { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'

import { ROUTER_WHITE_LIST, RouteNameEnum } from '@/router/types'
import useUserStore from '@/store/modules/user'

/**
 * 放行规则
 * @param to 即将跳转到的路由信息
 * @param next 下一步的跳转行为
 */
function through(to: RouteLocationNormalized, next: NavigationGuardNext) {
  // 如果当前路由是由于重定向而来的，则使用redirectedFrom属性提供的原
  if (to.redirectedFrom) {
    next(to.redirectedFrom.path)
    return
  }
  // 如果查询参数中包含redirect字段，则使用该字段的值进行导航。
  if (to.query.redirect) {
    next(to.query.redirect as string)
    return
  }
  // 如果以上条件都不满足，则继续正常的路由导航。
  next()
}

export function createPermissionGuard(_app: App, router: Router) {
  router.beforeEach(async (to, _from, next) => {
    nProgress.start()
    const isLogin = webStorage.getStorageFromKey('isLogin')
    if (isLogin) {
      // 如果用户已登录并试图访问登录页，重定向到主页。
      if (to.name === RouteNameEnum.LOGIN) {
        next({ name: RouteNameEnum.HOME })
      }
      else {
        const userStore = useUserStore() // 用户信息
        const hasRoute = router.hasRoute(to.name!)
        if (userStore.menuInfo && userStore.menuInfo.length === 0) {
          // 如果用户菜单为空，从后台获取菜单。
          try {
            await userStore.initRouter()
          }
          catch (e) {
            console.log(e)
            // 如果获取菜单失败，清除用户授权元数据，并重定向到登录页。
            userStore.handleAuthStorage({ isClear: true })
            return next({ name: RouteNameEnum.LOGIN })
          }
          if (!hasRoute) {
            // 如果该路由不存在，可能是动态注册的路由，它还没准备好，需要再重定向一次到该路由
            next({ ...to, replace: true })
          }
          else {
            through(to, next)
          }
        }
        else {
          if (hasRoute)
            next()
          else next({ name: RouteNameEnum.HOME })
        }
      }
    }
    else {
      // 用户未登录
      if (ROUTER_WHITE_LIST.includes(<RouteNameEnum>to.name)) {
        // 在免登录名单，直接进入
        next()
      }
      else {
        // 回到登录页面
        next({
          name: RouteNameEnum.LOGIN,
          query: { redirect: to.fullPath },
          replace: true,
        })
      }
    }
  })

  router.afterEach(() => {
    nProgress.done()
  })

  router.onError((error) => {
    nProgress.start()
    console.warn('路由错误 =>', error.message)
  })
}
