import type { RouteRecordRaw } from 'vue-router'

import HomeLayout from '@/layout/home/index.vue'
import { RouteNameEnum } from '@/router/types'
import NotFoundPage from '@/views/page/system/exception/index.vue'
import LoginPage from '@/views/page/system/login/index.vue'

/**
 * 登录路由
 */
export const LOGIN_ROUTE: RouteRecordRaw = {
  path: '/login',
  name: RouteNameEnum.LOGIN,
  component: LoginPage,
  meta: {
    title: '登录',
  },
}

/**
 * 404路由
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'pathMatch',
  redirect: '/exception/404',
  meta: {
    title: '404',
  },
}

/**
 * 异常页路由
 */
export const EXCEPTION_ROUTE: RouteRecordRaw = {
  path: '/exception',
  component: HomeLayout,
  redirect: '/exception/404',
  meta: {
    title: '异常页',
  },
  children: [
    {
      path: '/exception/404',
      name: RouteNameEnum.NOT_FOUND,
      component: NotFoundPage,
      meta: {
        title: '404',
      },
    },
  ],
}
