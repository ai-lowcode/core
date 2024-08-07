const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isObject(val: unknown): boolean {
  return val !== null && is(val, 'Object')
}

export function isFunction(val: unknown): boolean {
  return typeof val === 'function'
}

export function isUndefined(val: unknown): boolean {
  return val === undefined || val === null
}

export function isNumber(val: unknown): val is string {
  return is(val, 'Number')
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isArray(val: unknown): val is boolean {
  return Array.isArray(val)
}

export function isExternal(val: any) {
  return /^(https?:|mailto:|tel:)/.test(val)
}

export function hasProperty(rule: string, k: string) {
  return ({}).hasOwnProperty.call(rule, k)
}

/**
 * 判断目标字符串是否是JSON字符串形式
 * @param str
 */
export function isJsonStringTryCatch(str: string) {
  try {
    if (typeof JSON.parse(str) === 'object') {
      return true
    }
  }
  catch (e) {
    return false
  }
  return false
}

export function isEmpty(value: any) {
  // 检查 null 和 undefined

  if (value == null) {
    return true
  }

  // 判断空字符串
  if (typeof value === 'string' && value.trim() === '') {
    return true
  }

  // 判断空数组
  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  // 判断空对象
  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true
  }

  // 判断空 Map
  if (value instanceof Map && value.size === 0) {
    return true
  }

  // 判断空 Set
  if (value instanceof Set && value.size === 0) {
    return true
  }

  // 如果以上情况都不满足，返回 false
  return false
}
