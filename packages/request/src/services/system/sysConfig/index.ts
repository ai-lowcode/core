import { BaseApi } from '../../base.ts'

/**
 * sysConfigApi请求
 */
class SysConfigApi extends BaseApi {}

const sysConfigApi = new SysConfigApi('sys', 'sysConfig')

export { sysConfigApi }
