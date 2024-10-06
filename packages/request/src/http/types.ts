import { AxiosRequestConfig, AxiosRequestHeaders, CreateAxiosDefaults } from 'axios'

import { ResponseCodeEnum } from './enums.ts'

/**
 * 创建Axios实例配置类型
 */
export interface CreateAxiosOptionsType extends Partial<CreateAxiosDefaults> {
  requestOptions: RequestOptionsType
}

/**
 * 请求配置类型
 */
export interface RequestConfigType extends Partial<AxiosRequestConfig> {
  requestOptions?: RequestOptionsType
}

/**
 * 请求选项类型
 */
export interface RequestOptionsType {
  /**
   * 请求参数拼接到url Params形式
   */
  joinParamsToUrl?: boolean
  /**
   * 成功的文本信息
   */
  successMessageText?: string
  /**
   * 是否显示成功信息
   */
  isShowSuccessMessage?: boolean
  /**
   * 是否显示失败信息
   */
  isShowErrorMessage?: boolean
  /**
   * 错误的文本信息
   */
  errorMessageText?: string
  /**
   * 是否展示loading
   */
  isShowLoading?: boolean
  /**
   * loading文本信息
   */
  loadingMessageText?: string
  /**
   * 是否携带token
   */
  withToken?: boolean
  /**
   * 请求头
   */
  headers?: Partial<AxiosRequestHeaders>
}

/**
 * 通用请求返回值类型
 */
export interface CommonResultType<T> {
  code: ResponseCodeEnum
  msg: string
  data: T
}

/**
 * 分页请求返回值类型
 */
export interface PageResultType<T> {
  content: T[]
  total: number
  totalElements: number
}
