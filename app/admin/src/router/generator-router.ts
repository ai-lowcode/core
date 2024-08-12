import { MenuType } from '@ai-lowcode/request'
import { treeToArray } from '@ai-lowcode/utils'

import { routes } from './routes'

import { RouteNameEnum } from './types'

import { resetRouter, router } from './index'

/**
 * 获取到所有views目录下的vue文件
 */
const modulesFiles = import.meta.glob<Record<string, any>>('@/views/**/*.vue')

/**
 * 组件渲染策略
 * @param menu
 */
export function componentStrategyRender(menu: MenuType) {
  return modulesFiles['/src/views/common/index.vue']
}

/**
 * 生成&挂载路由
 * @param menuTree
 */
export function generatorRouter(menuTree: Array<MenuType>) {
  const menus = menuTree ? treeToArray<MenuType>(menuTree).filter(menu => menu.meta.show) : []
  const menuList: Array<any> = []
  menus.forEach((item: MenuType) => {
    // 深拷贝组件, 实现keep-alive功能
    const component = componentStrategyRender(item)
    if (component) {
      menuList.push({
        component,
        path: item.path,
        name: item.id,
        meta: item.meta,
      })
    }
  })
  const layout = routes.find(item => item.name === RouteNameEnum.LAYOUT)
  layout.children = [...menuList, ...layout.children]
  resetRouter()
  router.addRoute(layout)
}

export { modulesFiles }
