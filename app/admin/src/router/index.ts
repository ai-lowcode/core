import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import { createPermissionGuard } from '@/router/guard'
import { routes } from '@/router/routes'
import { ROUTER_WHITE_LIST, RouteNameEnum } from '@/router/types'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

/**
 * 启动路由
 * @param app
 */
function setupRouter(app: App) {
  app.use(router)
  createPermissionGuard(app, router)
}

/**
 * 重置路由信息
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !ROUTER_WHITE_LIST.includes(<RouteNameEnum>name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export { router, setupRouter }
