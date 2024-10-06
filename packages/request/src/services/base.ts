import { AlHttp, CommonResultType, RequestOptionsType } from '..'

/**
 * 基础接口类
 */
export class BaseApi {
  service: string
  module: string

  /**
   * @param {string} service 服务名
   * @param {string} module 模块名
   */
  constructor(service: string, module?: string) {
    this.service = service || ''
    this.module = module || ''
    // 绑定this 避免 new 之后this指向实例 从而获取不到 service 和 vo
    this.list = this.list.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.deleteBatch = this.deleteBatch.bind(this)
  }

  /**
   * 查询
   * @param {QueryParameter} params 查询参数
   * @param options
   */
  list<T = any>(params?: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.get<T>(`/${this.service}/${this.module}`, params, options)
  }

  /**
   * 增加
   * @param {*} data 增加参数
   * @param options
   */
  add<T = any>(data: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.post<T>(`/${this.service}/${this.module}`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功',
      ...options,
    })
  }

  /**
   * 编辑
   * @param {string} id 编辑ID
   * @param options
   */
  edit<T = any>(id: string, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.get<T>(`/${this.service}/${this.module}/${id}`, {}, options)
  }

  /**
   * 更新
   * @param {*} data 更新参数
   * @param options
   */
  update<T = any>(data: any, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.put<T>(`/${this.service}/${this.module}`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '修改成功',
      ...options,
    })
  }

  /**
   * 删除
   * @param id
   * @param options
   */
  delete<T = any>(id: string, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.remove<T>(`/${this.service}/${this.module}/${id}`, {}, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '删除成功',
      ...options,
    })
  }

  /**
   * 批量删除
   * @param ids
   * @param options
   */
  deleteBatch<T = any>(ids: string, options?: RequestOptionsType): Promise<CommonResultType<T>> {
    return AlHttp.remove<T>(`/${this.service}/${this.module}/${ids}`, {}, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '批量删除成功',
      ...options,
    })
  }
}
