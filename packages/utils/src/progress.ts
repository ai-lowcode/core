/**
 * 进度条配置和导出模块
 *
 * @remarks
 * NProgress配置详解:
 * - easing: 动画方式，使用 CSS3 的 transition-timing 函数
 * - speed: 进度条递增速度(ms)
 * - showSpinner: 是否显示加载图标
 * - trickleSpeed: 自动递增的间隔时间(ms)
 * - minimum: 初始化时的最小百分比(0-1)
 *
 * @example
 * ```typescript
 * // 示例1: 基础使用
 * import { nProgress } from './progress'
 *
 * // 开始显示进度条
 * nProgress.start()
 *
 * // 结束进度条
 * nProgress.done()
 *
 * // 示例2: 自定义进度
 * nProgress.set(0.4)    // 设置40%的进度
 * nProgress.inc()       // 稍微增加一点进度
 * nProgress.done()      // 完成进度
 *
 * // 示例3: 在请求拦截器中使用
 * axios.interceptors.request.use(config => {
 *   nProgress.start()
 *   return config
 * })
 *
 * axios.interceptors.response.use(response => {
 *   nProgress.done()
 *   return response
 * })
 *
 * // 示例4: 在路由跳转时使用
 * router.beforeEach((to, from, next) => {
 *   nProgress.start()
 *   next()
 * })
 *
 * router.afterEach(() => {
 *   nProgress.done()
 * })
 * ```
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 检查并配置 NProgress
if (NProgress && NProgress?.configure) {
  NProgress?.configure({
    // 动画方式，使用 CSS3 transition-timing 函数控制动画
    easing: 'ease',

    // 递增进度条的速度,单位ms,默认200
    speed: 500,

    // 是否显示加载图标(默认true)
    showSpinner: false,

    // 自动递增的时间间隔,越小越快,默认800
    trickleSpeed: 200,

    // 初始化时的最小百分比,介于0-1之间,默认0.08
    minimum: 0.3,
  })
}

/**
 * 导出配置好的进度条实例
 * 提供以下主要方法:
 * - start(): 开始进度
 * - done(): 结束进度
 * - set(n): 设置指定进度,n介于0-1
 * - inc(): 稍微增加一点进度
 * - remove(): 移除进度条
 */
export const nProgress = NProgress
