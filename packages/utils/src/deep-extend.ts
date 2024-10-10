import { isObject, isUndefined } from './is'

export function $set(target: any, field: any, value: any) {
  target[field] = value
}

export function deepExtend(origin: any, target: any = {}, mode?: any) {
  let isArr: boolean = false
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      let clone = target[key]
      // eslint-disable-next-line no-cond-assign
      if ((isArr = Array.isArray(clone)) || isObject(clone)) {
        const nst = origin[key] === undefined
        if (isArr) {
          isArr = false
          nst && $set(origin, key, [])
        }
        else if (clone._clone && mode !== undefined) {
          if (mode) {
            clone = clone.getRule()
            nst && $set(origin, key, {})
          }
          else {
            $set(origin, key, clone._clone())
            continue
          }
        }
        else {
          nst && $set(origin, key, {})
        }
        origin[key] = deepExtend(origin[key], clone, mode)
      }
      else {
        $set(origin, key, clone)
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
 * 深拷贝
 * @param value
 */
export function deepCopy(value: any) {
  return deepExtend({}, { value }).value
}

/**
 * 深拷贝
 * @param origin
 * @param lst
 */
export function deepExtendArgs(origin: any, ...lst: any) {
  lst.forEach((target: any) => {
    origin = deepExtend(origin, target)
  })
  return origin
}
