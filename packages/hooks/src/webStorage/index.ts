import { decrypt, encrypt } from './encry'
import type { globalConfig } from './interface'

const config: globalConfig = {
  type: 'localStorage', // 存储类型，localStorage | sessionStorage
  prefix: 'fastsun_0.0.1', // 版本号
  expire: 24 * 60, // 过期时间，默认为一天，单位为分钟
  isEncrypt: true, // 支持加密、解密数据处理
}

class WebStorage {
  setStorage = (key: keyof Record<string, any>, value: any, expire: number = 24 * 60): boolean => {
    // 设定值
    if (value === '' || value === null || value === undefined) {
      // 空值重置
      value = null
    }
    if (Number.isNaN(expire) || expire < 0) {
      // 过期时间值合理性判断
      throw new Error('Expire must be a number')
    }
    const data = {
      value, // 存储值
      time: Date.now(), // 存储日期
      expire: Date.now() + 1000 * 60 * expire, // 过期时间
    }
    // 是否需要加密，判断装载加密数据或原数据
    if (typeof window !== 'undefined') {
      window[config.type].setItem(
        this.autoAddPreFix(key),
        config.isEncrypt ? encrypt(JSON.stringify(data)) : JSON.stringify(data),
      )
    }
    return true
  }

  getStorageFromKey = (key: keyof Record<any, any>) => {
    // 获取指定值
    if (config.prefix) {
      key = this.autoAddPreFix(key) as keyof any
    }
    if (typeof window !== 'undefined') {
      if (!window[config.type].getItem(key)) {
        // 不存在判断
        return null
      }

      const storageVal = config.isEncrypt
        ? JSON.parse(decrypt(window[config.type].getItem(key) as string))
        : JSON.parse(window[config.type].getItem(key) as string)
      const now = Date.now()
      if (now >= storageVal.expire) {
        // 过期销毁
        this.removeStorageFromKey(key)
        return null
        // 不过期回值
      }
      else {
        return storageVal.value
      }
    }
  }

  getAllStorage = () => {
    // 获取所有值
    const storageList: any = {}
    if (typeof window !== 'undefined') {
      const keys = Object.keys(window[config.type])
      keys.forEach((key) => {
        const value = this.getStorageFromKey(this.autoRemovePreFix(key))
        if (value !== null) {
          // 如果值没有过期，加入到列表中
          storageList[this.autoRemovePreFix(key)] = value
        }
      })
      return storageList
    }
  }

  getStorageLength = () => {
    // 获取值列表长度
    if (typeof window !== 'undefined')
      return window[config.type].length
  }

  removeStorageFromKey = (key: keyof Record<any, any>) => {
    // 删除值
    if (config.prefix) {
      key = this.autoAddPreFix(key) as keyof any
    }
    if (typeof window !== 'undefined')
      window[config.type].removeItem(key)
  }

  clearStorage = () => {
    if (typeof window !== 'undefined')
      window[config.type].clear()
  }

  autoAddPreFix = (key: string): string => {
    // 添加前缀，保持唯一性
    const prefix = config.prefix || ''
    return `${prefix}_${key}`
  }

  autoRemovePreFix = (key: string): keyof any => {
    // 删除前缀，进行增删改查
    const lineIndex = config.prefix.length + 1
    return key.substr(lineIndex) as keyof any
  }
}

export const webStorage = new WebStorage()
