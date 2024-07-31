import { CreateAxiosOptionsType } from '@fastsun/model'

import { AlAxios } from './axios'

// 全局请求默认配置
const defaultOptions: CreateAxiosOptionsType = {
  timeout: 100000,
  requestOptions: {
    withTenantId: true,
    withToken: true,
    withXAppId: true,
    isShowErrorMessage: true,
  },
}

/**
 * 创建请求实例
 * @param {Partial<CreateAxiosOptionsType>} options 请求配置
 * @returns 请求实例
 */
function createAxios(options: Partial<CreateAxiosOptionsType> = {}) {
  return new AlAxios(Object.assign(defaultOptions, options))
}

const AlHttp = createAxios()

export { AlHttp, createAxios }
