import type { RouteRecordRaw } from 'vue-router'

import { LOGIN_ROUTE, NOT_FOUND_ROUTE } from './modules/base'
import { EXCEPTION_ROUTE, HOME_ROUTE } from './modules/home'

// 路由信息
export const routes: Readonly<RouteRecordRaw[]> = [HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE, EXCEPTION_ROUTE]
