import { AlHttp, CommonResultType } from '..'

/**
 * 基础接口类
 */
export class BaseApi {
  group: string
  module: string

  /**
   * @param {string} group 接口组
   * @param {string} module 模块名
   */
  constructor(group: string, module?: string) {
    this.group = group || ''
    this.module = module || ''
    // 绑定this 避免 new 之后this指向实例 从而获取不到 service 和 vo
    this.list = this.list.bind(this)
    this.add = this.add.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  /**
   * 查询
   * @param {QueryParameter} params 查询参数
   */
  list<T = any>(params?: any): Promise<CommonResultType<T>> {
    return AlHttp.get<T>(`/${this.group}/${this.module}`, params)
  }

  /**
   * 增加
   * @param {*} data 增加参数
   */
  add<T = any>(data: any): Promise<CommonResultType<T>> {
    return AlHttp.post<T>(`/${this.group}/${this.module}`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '保存成功',
    })
  }

  /**
   * 更新
   * @param id
   * @param {*} data 更新参数
   */
  update<T = any>(id: string, data: any): Promise<CommonResultType<T>> {
    return AlHttp.put<T>(`/${this.group}/${this.module}/${id}`, data, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '修改成功',
    })
  }

  /**
   * 删除
   * @param id
   */
  delete<T = any>(id: string): Promise<CommonResultType<T>> {
    return AlHttp.remove<T>(`/${this.group}/${this.module}/${id}`, {}, {
      isShowLoading: true,
      isShowSuccessMessage: true,
      successMessageText: '删除成功',
    })
  }

  /**
   * 编辑
   * @param {string} id 编辑ID
   */
  edit<T = any>(id: string): Promise<CommonResultType<T>> {
    return AlHttp.get<T>(`/${this.group}/${this.module}/${id}`)
  }
}
