import { isString, isUndefined } from './is.ts'

const PREFIX = '[[FORM-CREATE-PREFIX-'
const SUFFIX = '-FORM-CREATE-SUFFIX]]'

const $T = '$FN:'
const $TX = '$FNX:'
const $ON = '$GLOBAL:'
const FUNCTION = 'function'

function makeFn(fn: any) {
  return (new Function(`return ${fn}`))()
}

export function parseFn(fn?: any, mode?: any) {
  if (fn && isString(fn) && fn.length > 4) {
    let v: any = fn.trim()
    let flag = false
    try {
      if (v.indexOf(SUFFIX) > 0 && v.indexOf(PREFIX) === 0) {
        v = v.replace(SUFFIX, '').replace(PREFIX, '')
        flag = true
      }
      else if (v.indexOf($T) === 0) {
        v = v.replace($T, '')
        flag = true
      }
      else if (v.indexOf($ON) === 0) {
        const name = v.replace($ON, '')
        v = (...args: any) => {
          const callback = args[0].api.getGlobalEvent(name)
          if (callback) {
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            return callback.call(this, ...args)
          }
          return undefined
        }
        v.__json = fn
        v.__inject = true
        return v
      }
      else if (v.indexOf($TX) === 0) {
        v = makeFn(`function($inject){${v.replace($TX, '')}}`)
        v.__json = fn
        v.__inject = true
        return v
      }
      else if (!mode && v.indexOf(FUNCTION) === 0 && v !== FUNCTION) {
        flag = true
      }
      if (!flag)
        return fn
      const val = makeFn((!v.includes(FUNCTION) && v.indexOf('(') !== 0) ? (`${FUNCTION} ${v}`) : v)
      val.__json = fn
      return val
    }
    catch (e) {
      // err(`解析失败:${v}\n\nerr: ${e}`)
      return undefined
    }
  }
  return fn
}

export function parseJson(json: any, mode: any) {
  return JSON.parse(json, (_k: any, v) => {
    if (isUndefined(v) || !v.indexOf)
      return v
    return parseFn(v, mode)
  })
}
