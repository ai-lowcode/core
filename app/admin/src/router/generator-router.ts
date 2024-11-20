import { MenuMeta, MenuType } from '@zero-dim/request'
import { treeToArray } from '@zero-dim/utils'

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
export function componentStrategyRender(menu: MenuMeta) {
  switch (menu?.compType) {
    case 0:
      return modulesFiles['/src/views/common/index.vue']
    case 1:
      return modulesFiles['/src/views/common/index.vue']
    case 2:
      return modulesFiles['/src/views/common/index.vue']
    case 3:
      return modulesFiles[`/src/views/system/${menu?.systemModule}/index.vue`]
    default:
      return modulesFiles['/src/views/common/index.vue']
  }
}

/**
 * 生成&挂载路由
 * @param menuTree
 */
export function generatorRouter(menuTree: Array<MenuMeta>) {
  const menus = menuTree ? treeToArray<MenuMeta>(menuTree).filter(menu => menu.isVisible && menu.menuType === 1) : []
  const menuList: Array<MenuType> = []
  menus.forEach((item: MenuMeta) => {
    // 深拷贝组件, 实现keep-alive功能
    const component = componentStrategyRender(item)
    if (component) {
      menuList.push({
        component,
        path: item.routePath,
        name: item.id,
        menuName: item.menuName,
        menuCode: item.menuCode,
        meta: {
          isExternal: item.isExternal,
          isKeepalive: item.isKeepalive,
          menuName: item.menuName,
          menuIcon: item.menuIcon,
          menuSort: item.menuSort,
          menuCode: item.menuCode,
          compType: item.compType,
          localFile: item.localFile,
          externalUrl: item.externalUrl,
          lowcodePage: item.lowcodePage,
        } as MenuMeta,
      } as MenuType)
    }
  })
  const layout = routes.find(item => item.name === RouteNameEnum.LAYOUT)
  layout.children = [...menuList, ...layout.children] as any
  resetRouter()
  router.addRoute(layout)
}

export { modulesFiles }
