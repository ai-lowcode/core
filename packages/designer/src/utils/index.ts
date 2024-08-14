import { isObject, isString, lower, parseFn } from '@ai-lowcode/utils'

export * from './rule.ts'
export * from './form-template.ts'
export * from './to-json.ts'

export function addAutoKeyMap(cm: any) {
  cm.addKeyMap({
    'name': 'autoParentheses',
    '\'(\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('()', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
  cm.addKeyMap({
    'name': 'autoBraces',
    '\'{\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('{}', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
  cm.addKeyMap({
    'name': 'autoBrackets',
    '\'[\'': (cm: any) => {
      const cur = cm.getCursor()
      cm.replaceRange('[]', cur, cur, '+insert')
      cm.doc.setCursor({ line: cur.line, ch: cur.ch + 1 })
    },
  })
}

export function upper(str: any) {
  return str.replace(str[0], str[0].toLocaleUpperCase())
}

export const deepParseFn = function (target: any) {
  if (target && typeof target === 'object') {
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        const data = target[key]
        if (Array.isArray(data) || isObject(data)) {
          deepParseFn(data)
        }
        if (isString(data)) {
          target[key] = parseFn(data)
        }
      }
    }
  }
  return target
}

export function propFieldDeepFn(field: any, call: any, activeRule: any) {
  if (field[10] !== '>') {
    field = field.replace('formCreate', '')
    if (!field)
      return
    field = lower(field)
  }
  else {
    field = field.replace('formCreate>', '')
  }
  const split = field.split('>')
  const lastField = split.pop()
  let source = activeRule
  split.forEach((id: any, idx: any) => {
    if (!idx) {
      id = lower(id)
    }
    if (!source[id]) {
      source[id] = {}
    }
    source = source[id]
  })
  call({ source, field: lastField })
}
