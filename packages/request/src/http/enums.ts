/**
 * 请求格式枚举
 */
export enum ContentTypeEnum {
  /**
   * JSON格式
   */
  JSON = 'application/json;charset=UTF-8',
  /**
   * urlcode格式
   */
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  /**
   * 文件上传
   */
  FORM_DATA = 'multipar/form-data;charset=UTF-8',
}

/**
 * 请求方式枚举
 */
export enum RequestMethodEnum {
  /**
   * GET
   */
  GET = 'GET',
  /**
   * POST
   */
  POST = 'POST',
  /**
   * PUT
   */
  PUT = 'PUT',
  /**
   * DELETE
   */
  DELETE = 'DELETE',
}

/**
 * 响应结果枚举
 */
export enum ResponseCodeEnum {
  /**
   * 请求成功
   */
  SUCCESS = 0,
  /**
   * 请求失败
   */
  FAILURE = -1,
  /**
   * 请求失败
   */
  FAIL = 1,
  /**
   * 权限过期
   */
  EXPIRED = 2,
}
