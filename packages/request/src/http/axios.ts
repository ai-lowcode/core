import { AlLoadingService, AlMessage } from '@ai-lowcode/element-plus'
import { webStorage } from '@ai-lowcode/hooks'
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { RequestMethodEnum, ResponseCodeEnum } from './enums.ts'
import { CommonResultType, CreateAxiosOptionsType, RequestConfigType, RequestOptionsType } from './types.ts'

/**
 * 请求类
 * @example
 * ```typescript
 * import { AlAxios } from '@ai-lowcode/request';
 *
 * // 使用示例
 * const alAxios = new AlAxios()
 * ```
 */
export class AlAxios {
  // Axios实例
  private readonly axiosInstance: AxiosInstance

  // 自定义配置
  private readonly options: CreateAxiosOptionsType

  // 当前请求选项
  private currentOptions: RequestOptionsType = {}

  // 加载动画
  loading: ReturnType<typeof AlLoadingService> | null = null

  constructor(options: CreateAxiosOptionsType) {
    this.axiosInstance = axios.create(options)
    this.options = options
    this.setupInterceptors()
  }

  /**
   * 获取 Axios 实例
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * 获取请求选项
   */
  private getTransform(): RequestOptionsType {
    const { requestOptions } = this.options
    return requestOptions
  }

  // 拦截器配置
  private setupInterceptors() {
    const requestOptions = this.getTransform()
    if (!requestOptions)
      return

    try {
      // 请求拦截器配置处理
      this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig & RequestConfigType) => {
        // 合并请求选项
        const { withToken, isShowLoading, loadingMessageText, joinParamsToUrl, headers } = {
          ...requestOptions,
          ...config.requestOptions,
        }
        // 处理loading
        isShowLoading
        && (this.loading = AlLoadingService({
          lock: true,
          text: loadingMessageText || '加载中...',
          background: 'rgba(0, 0, 0, 0.7)',
        }))

        // `timeout` 指定请求超时的毫秒数。
        // 如果请求时间超过 `timeout` 的值，则请求会被中断
        config.timeout = 240000 // 默认值是 `0` (永不超时)

        // 合并请求头
        config.headers = Object.assign(config.headers, headers)

        const globalConfig = webStorage.getStorageFromKey('config')
        const token = webStorage.getStorageFromKey('token')
        // 处理请求路径(适配单体地址情况)
        const regex = /^(http|https):\/\//i
        config.url = regex.test(config.url!)
          ? config.url
          : globalConfig.SERVER_URL + config.url

        // 将请求参数处理成为params形式
        if (joinParamsToUrl) {
          for (const key in config.data) {
            config.url += `/${config.data[key]}`
          }
          delete config.data
        }

        // 处理token
        withToken
        && (config.headers.Authorization
                    = config.headers.Authorization
                    || `Bearer ${token}`)

        return config
      }, undefined)

      // 响应拦截器配置处理
      this.axiosInstance.interceptors.response.use((response: AxiosResponse<CommonResultType<any>>) => {
        const { isShowSuccessMessage, isShowErrorMessage, successMessageText, errorMessageText } = this.currentOptions

        // 关闭loading
        this.loading?.close()

        if (response.data?.code === ResponseCodeEnum.EXPIRED) {
          // 处理请求成功的消息提醒
          AlMessage.error(response.data?.msg)
        }

        if (response.data?.code === ResponseCodeEnum.SUCCESS) {
          // 处理请求成功的消息提醒
          isShowSuccessMessage
          && (successMessageText ? AlMessage.success(successMessageText) : AlMessage.success('请求成功'))
        }

        if (response.data?.code !== ResponseCodeEnum.SUCCESS) {
          // 处理请求失败的消息提醒
          isShowErrorMessage
          && (errorMessageText ? AlMessage.error(errorMessageText) : AlMessage.error(response.data?.msg))
        }

        return response
      }, undefined)
    }
    catch (e) {
      console.log(e)
      AlMessage.error('接口请求失败')
    }
  }

  /**
   * 通用请求接口
   * @param {RequestConfigType} config 请求配置
   * @param {RequestOptionsType} options 请求选项
   * @returns 请求结果
   */
  request<T = any>(config: RequestConfigType, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    try {
      // 深拷贝对象
      const conf: RequestConfigType = config
      const { requestOptions } = this.options
      const opt: RequestOptionsType = { ...requestOptions, ...options }

      // 重新赋值最新配置
      conf.requestOptions = opt
      this.currentOptions = opt

      return new Promise((resolve, reject) => {
        this.axiosInstance
          .request<any, AxiosResponse<CommonResultType<T>>>(conf)
          .then((response: AxiosResponse<CommonResultType<T>>) => {
            resolve(response.data as unknown as Promise<CommonResultType<T>>)
          })
          .catch(error => reject(error))
      })
    }
    catch (e) {
      AlMessage.error('接口请求失败')
      return new Promise(() => {})
    }
  }

  /**
   * GET请求
   * @param {string} url 请求路径
   * @param {*} params 请求参数
   * @param {RequestOptionsType} options 请求选项
   * @returns 请求结果
   */
  get<T = any>(url: string, params?: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return this.request<T>(
      {
        url,
        params,
        method: RequestMethodEnum.GET,
      },
      options,
    )
  }

  /**
   * POST请求
   * @param {string} url 请求路径
   * @param {*} data 请求参数
   * @param {RequestOptionsType} options 请求选项
   * @returns 请求结果
   */
  post<T = any>(url: string, data: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return this.request<T>(
      {
        url,
        data,
        method: RequestMethodEnum.POST,
      },
      options,
    )
  }

  /**
   * PUT请求
   * @param {string} url 请求路径
   * @param {*} data 请求参数
   * @param {RequestOptionsType} options 请求选项
   * @returns 请求结果
   */
  put<T = any>(url: string, data: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return this.request<T>(
      {
        url,
        data,
        method: RequestMethodEnum.PUT,
      },
      options,
    )
  }

  /**
   * DELETE请求
   * @param {string} url 请求路径
   * @param {*} data 请求参数
   * @param {RequestOptionsType} options 请求选项
   * @returns 请求结果
   */
  remove<T = any>(url: string, data: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return this.request<T>(
      {
        url,
        data,
        method: RequestMethodEnum.DELETE,
      },
      options,
    )
  }
}
