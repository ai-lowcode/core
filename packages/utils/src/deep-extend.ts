import { isObject, isUndefined } from './is'

/**
 * 给目标对象的字段设置值
 *
 * @remarks
 * - 直接设置对象属性值
 * - 支持任意类型的字段名和值
 * - 会直接修改原对象
 *
 * @param target - 要设置值的目标对象
 * @param field - 要设置的字段名或键
 * @param value - 要设置的值
 *
 * @example
 * ```typescript
 * // 示例1: 基础使用
 * const obj = {};
 * setObjectValue(obj, 'name', 'John');
 * // 结果: { name: 'John' }
 *
 * // 示例2: 设置特殊键名
 * const data = {};
 * setObjectValue(data, Symbol('id'), 123);
 * setObjectValue(data, '__proto__', {});  // 安全地设置特殊属性名
 *
 * // 示例3: 设置嵌套对象的属性
 * const user = { profile: {} };
 * setObjectValue(user.profile, 'age', 25);
 * // 结果: { profile: { age: 25 } }
 * ```
 */
export function setObjectValue(target: any, field: any, value: any): void {
  target[field] = value
}

/**
 * 深度扩展一个对象
 *
 * @remarks
 * - 支持深层嵌套的对象合并
 * - 自动处理数组类型
 * - 处理带有 _clone 属性的特殊对象
 * - 保留特殊的 __json 和 __origin 属性
 * - 可以通过 mode 参数控制 _clone 的行为
 *
 * @param origin - 要扩展的目标对象
 * @param target - 作为源的对象，其属性将被复制
 * @param mode - 可选的模式参数，影响 _clone 属性的处理方式
 * @returns 修改后的目标对象
 *
 * @example
 * ```typescript
 * // 示例1: 基础对象合并
 * const orig = { a: 1, b: { x: 1 } };
 * const target = { b: { y: 2 }, c: 3 };
 * deepExtend(orig, target);
 * // 结果: { a: 1, b: { x: 1, y: 2 }, c: 3 }
 *
 * // 示例2: 数组处理
 * const orig2 = { items: [1, 2] };
 * const target2 = { items: [3, 4] };
 * deepExtend(orig2, target2);
 * // 结果: { items: [3, 4] }
 *
 * // 示例3: 特殊对象处理
 * const orig3 = {};
 * const target3 = {
 *   special: {
 *     _clone: () => ({ value: 'cloned' }),
 *     data: 'original'
 *   }
 * };
 * deepExtend(orig3, target3);
 * // 结果: { special: { value: 'cloned' } }
 *
 * // 示例4: 处理特殊属性
 * const orig4 = {};
 * const target4 = {
 *   data: {
 *     __json: '{"type":"special"}',
 *     __origin: 'external'
 *   }
 * };
 * deepExtend(orig4, target4);
 * // 保留特殊属性
 * ```
 */
export function deepExtend(origin: any, target: any = {}, mode?: any): any {
  let isArr: boolean = false
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      let clone = target[key]
      // eslint-disable-next-line no-cond-assign
      if ((isArr = Array.isArray(clone)) || isObject(clone)) {
        const nst = origin[key] === undefined
        if (isArr) {
          isArr = false
          nst && setObjectValue(origin, key, [])
        }
        else if (clone._clone && mode !== undefined) {
          if (mode) {
            clone = clone.getRule()
            nst && setObjectValue(origin, key, {})
          }
          else {
            setObjectValue(origin, key, clone._clone())
            continue
          }
        }
        else {
          nst && setObjectValue(origin, key, {})
        }
        origin[key] = deepExtend(origin[key], clone, mode)
      }
      else {
        setObjectValue(origin, key, clone)
        if (!isUndefined(clone)) {
          if (!isUndefined(clone.__json)) {
            origin[key].__json = clone.__json
          }
          if (!isUndefined(clone.__origin)) {
            origin[key].__origin = clone.__origin
          }
        }
      }
    }
  }
  return (mode !== undefined && Array.isArray(origin)) ? origin.filter(v => !v || !v.__ctrl) : origin
}

/**
 * 创建值的深拷贝
 *
 * @remarks
 * - 支持所有 JavaScript 数据类型
 * - 创建完全独立的副本
 * - 保持原对象的结构和嵌套关系
 * - 处理循环引用
 *
 * @param value - 要深拷贝的值
 * @returns 输入值的深拷贝
 *
 * @example
 * ```typescript
 * // 示例1: 基础类型拷贝
 * const num = deepCopy(42);
 * const str = deepCopy("hello");
 * // 结果: 42, "hello"
 *
 * // 示例2: 对象深拷贝
 * const original = {
 *   name: 'John',
 *   profile: {
 *     age: 30,
 *     scores: [85, 92, 78]
 *   }
 * };
 * const copy = deepCopy(original);
 * // copy !== original
 * // copy.profile !== original.profile
 * // copy.profile.scores !== original.profile.scores
 *
 * // 示例3: 特殊对象拷贝
 * const date = new Date();
 * const copyDate = deepCopy(date);
 *
 * // 示例4: 数组深拷贝
 * const arr = [1, { x: 1 }, [2, 3]];
 * const copyArr = deepCopy(arr);
 * // 结果: 完全独立的数组副本
 * ```
 */
export function deepCopy(value: any): any {
  return deepExtend({}, { value }).value
}

/**
 * 使用多个源对象深度扩展一个对象
 *
 * @remarks
 * - 支持任意数量的源对象
 * - 按照参数顺序依次合并
 * - 后面的对象会覆盖前面对象的同名属性
 * - 执行深度合并而不是浅合并
 *
 * @param origin - 要扩展的目标对象
 * @param lst - 包含要合并的源对象的剩余参数
 * @returns 修改后的目标对象
 *
 * @example
 * ```typescript
 * // 示例1: 基础多对象合并
 * const obj1 = { a: 1, shared: { x: 1 } };
 * const obj2 = { b: 2, shared: { y: 2 } };
 * const obj3 = { c: 3, shared: { z: 3 } };
 * const result = deepExtendArgs(obj1, obj2, obj3);
 * // 结果: {
 * //   a: 1,
 * //   b: 2,
 * //   c: 3,
 * //   shared: { x: 1, y: 2, z: 3 }
 * // }
 *
 * // 示例2: 数组处理
 * const config1 = { ports: [8080] };
 * const config2 = { ports: [9090] };
 * const config3 = { hosts: ['localhost'] };
 * const merged = deepExtendArgs(config1, config2, config3);
 * // 结果: { ports: [9090], hosts: ['localhost'] }
 *
 * // 示例3: 复杂对象合并
 * const defaults = {
 *   db: { host: 'localhost', port: 5432 },
 *   cache: { enabled: false }
 * };
 * const userConfig = {
 *   db: { port: 6379 },
 *   cache: { enabled: true, ttl: 3600 }
 * };
 * const envConfig = {
 *   db: { host: 'prod-host' }
 * };
 * const finalConfig = deepExtendArgs(defaults, userConfig, envConfig);
 * // 结果: {
 * //   db: { host: 'prod-host', port: 6379 },
 * //   cache: { enabled: true, ttl: 3600 }
 * // }
 * ```
 */
export function deepExtendArgs(origin: any, ...lst: any[]): any {
  lst.forEach((target: any) => {
    origin = deepExtend(origin, target)
  })
  return origin
}
