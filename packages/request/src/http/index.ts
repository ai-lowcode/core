import { AlAxios } from './axios'
import { CreateAxiosOptionsType } from './types.ts'

// 全局请求默认配置
const defaultOptions: CreateAxiosOptionsType = {
  timeout: 100000,
  requestOptions: {
    withToken: true,
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
