/**
 * 获取对象的原始类型字符串
 * @internal
 * @remarks
 * 使用 Object.prototype.toString 方法获取值的内部 [[Class]] 属性
 */
const toString = Object.prototype.toString

/**
 * 判断值是否为指定的类型
 * @param val - 要检查的值
 * @param type - 期望的类型字符串
 * @returns 如果值为指定类型则返回true,否则返回false
 *
 * @example
 * ```ts
 * is([], 'Array')  // true
 * is({}, 'Object') // true
 * is(123, 'Number') // true
 * ```
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * 判断值是否为普通对象(非null的object类型)
 * @param val - 要检查的值
 * @returns 如果值为普通对象则返回true,否则返回false
 *
 * @remarks
 * 此函数会排除 null 值,因为 typeof null 也会返回 'object'
 *
 * @example
 * ```ts
 * isObject({})           // true
 * isObject([])           // false
 * isObject(null)         // false
 * isObject(undefined)    // false
 * ```
 */
export function isObject(val: unknown): boolean {
  return val !== null && is(val, 'Object')
}

/**
 * 判断值是否为函数类型
 * @param val - 要检查的值
 * @returns 如果值为函数类型则返回true,否则返回false
 *
 * @example
 * ```ts
 * isFunction(function(){})     // true
 * isFunction(() => {})         // true
 * isFunction(class{})          // true
 * isFunction(123)              // false
 * ```
 */
export function isFunction(val: unknown): boolean {
  return typeof val === 'function'
}

/**
 * 判断值是否为undefined或null
 * @param val - 要检查的值
 * @returns 如果值为undefined或null则返回true,否则返回false
 *
 * @remarks
 * 此函数同时检查 undefined 和 null,因为在很多场景下它们的语义是相似的
 *
 * @example
 * ```ts
 * isUndefined(undefined)    // true
 * isUndefined(null)         // true
 * isUndefined('')           // false
 * isUndefined(0)           // false
 * ```
 */
export function isUndefined(val: unknown): boolean {
  return val === undefined || val === null
}

/**
 * 判断值是否为数字类型
 * @param val - 要检查的值
 * @returns 类型谓词,用于在 TypeScript 中进行类型收窄
 *
 * @remarks
 * 使用类型谓词(type predicate)可以让 TypeScript 在运行时收窄变量类型
 *
 * @example
 * ```ts
 * isNumber(123)        // true
 * isNumber('123')      // false
 * isNumber(NaN)        // true
 * isNumber(Infinity)   // true
 * ```
 */
export function isNumber(val: unknown): val is string {
  return is(val, 'Number')
}

/**
 * 判断值是否为字符串类型
 * @param val - 要检查的值
 * @returns 类型谓词,用于在 TypeScript 中进行类型收窄
 *
 * @example
 * ```ts
 * isString('abc')      // true
 * isString(123)        // false
 * isString('')         // true
 * isString(String(1))  // true
 * ```
 */
export function isString(val: unknown): val is string {
  return is(val, 'String')
}

/**
 * 判断值是否为布尔类型
 * @param val - 要检查的值
 * @returns 类型谓词,用于在 TypeScript 中进行类型收窄
 *
 * @example
 * ```ts
 * isBoolean(true)       // true
 * isBoolean(false)      // true
 * isBoolean(0)          // false
 * isBoolean('')         // false
 * ```
 */
export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

/**
 * 判断值是否为数组类型
 * @param val - 要检查的值
 * @returns 类型谓词,用于在 TypeScript 中进行类型收窄
 *
 * @remarks
 * 使用 Array.isArray 进行检查,这是判断数组最可靠的方法
 *
 * @example
 * ```ts
 * isArray([])           // true
 * isArray([1,2,3])      // true
 * isArray({})           // false
 * isArray(arguments)    // false
 * ```
 */
export function isArray(val: unknown): val is boolean {
  return Array.isArray(val)
}

/**
 * 判断字符串是否为外部链接(http:,https:,mailto:,tel:开头)
 * @param val - 要检查的字符串
 * @returns 如果是外部链接则返回true,否则返回false
 *
 * @remarks
 * 支持的协议:
 * - http:
 * - https:
 * - mailto:
 * - tel:
 *
 * @example
 * ```ts
 * isExternal('https://example.com')     // true
 * isExternal('mailto:test@test.com')    // true
 * isExternal('tel:123456789')           // true
 * isExternal('/path/to/file')           // false
 * ```
 */
export function isExternal(val: any) {
  return /^(https?:|mailto:|tel:)/.test(val)
}

/**
 * 判断对象是否包含指定的自有属性
 * @param rule - 要检查的对象
 * @param k - 属性名
 * @returns 如果对象包含该属性则返回true,否则返回false
 *
 * @remarks
 * 使用 Object.prototype.hasOwnProperty 检查自有属性,
 * 不会检查原型链上的属性
 *
 * @example
 * ```ts
 * const obj = { a: 1 }
 * hasProperty(obj, 'a')          // true
 * hasProperty(obj, 'toString')   // false
 * hasProperty(obj, 'b')          // false
 * ```
 */
export function hasProperty(rule: any, k: string) {
  return ({}).hasOwnProperty.call(rule, k)
}

/**
 * 判断字符串是否为有效的JSON格式
 * @param str - 要检查的字符串
 * @returns 如果是有效的JSON字符串则返回true,否则返回false
 *
 * @remarks
 * 通过尝试解析字符串来判断其是否为合法的JSON格式
 * 只有解析结果为对象类型时才返回true
 *
 * @throws 不会抛出异常,所有解析错误都会被捕获并返回false
 *
 * @example
 * ```ts
 * isJsonStringTryCatch('{"a":1}')        // true
 * isJsonStringTryCatch('[1,2,3]')        // true
 * isJsonStringTryCatch('invalid json')   // false
 * isJsonStringTryCatch('"string"')       // false
 * ```
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

/**
 * 判断值是否为空
 * @param value - 要检查的值
 * @returns 如果值为空则返回true,否则返回false
 *
 * @remarks
 * 支持检查以下类型:
 * - null/undefined
 * - 空字符串(包括只有空格的字符串)
 * - 空数组
 * - 空对象(没有自有可枚举属性)
 * - 空Map
 * - 空Set
 *
 * @example
 * ```ts
 * // null/undefined
 * isEmpty(null)         // true
 * isEmpty(undefined)    // true
 *
 * // 字符串
 * isEmpty('')          // true
 * isEmpty('  ')        // true
 * isEmpty('abc')       // false
 *
 * // 数组
 * isEmpty([])          // true
 * isEmpty([1,2])       // false
 *
 * // 对象
 * isEmpty({})          // true
 * isEmpty({a:1})       // false
 *
 * // Map/Set
 * isEmpty(new Map())   // true
 * isEmpty(new Set())   // true
 * ```
 *
 * @throws 不会抛出异常,对无效输入返回false
 */
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
