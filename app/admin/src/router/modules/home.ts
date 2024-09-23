import type { RouteRecordRaw } from 'vue-router'

import { RouteNameEnum } from '../types'

import HomeLayout from '@/layout/home/index.vue'
import NotFoundPage from '@/views/page/system/exception/index.vue'
import HomePage from '@/views/page/system/home/index.vue'
import RedirectPage from '@/views/page/system/redirect/index.vue'

/**
 * 首页路由信息
 */
export const HOME_ROUTE_INFO: RouteRecordRaw = {
  path: '/',
  name: RouteNameEnum.HOME,
  component: HomePage,
  meta: {
    title: '应用首页',
  },
}

/**
 * 404路由
 */
export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: RouteNameEnum.PATH_MATCH,
  redirect: '/exception',
  meta: {
    title: '404',
  },
}

/**
 * 异常页路由
 */
export const EXCEPTION_ROUTE: RouteRecordRaw = {
  path: '/exception',
  name: RouteNameEnum.NOT_FOUND,
  component: NotFoundPage,
  meta: {
    title: '异常页',
  },
}

/**
 * 重定向路由信息
 */
export const REDIRECT_ROUTE_INFO: RouteRecordRaw = {
  path: '/redirect/:path(.*)',
  name: RouteNameEnum.REDIRECT,
  component: RedirectPage,
  meta: {
    title: '重定向',
  },
}

/**
 * LAYOUT路由
 */
export const HOME_ROUTE: RouteRecordRaw = {
  path: '/',
  name: RouteNameEnum.LAYOUT,
  component: HomeLayout,
  children: [HOME_ROUTE_INFO, REDIRECT_ROUTE_INFO, NOT_FOUND_ROUTE, EXCEPTION_ROUTE],
}
