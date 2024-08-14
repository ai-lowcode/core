import { hasProperty } from '@ai-lowcode/utils'

export const toJSON = function (val: any) {
  const type = /object ([a-zA-Z]*)/.exec(Object.prototype.toString.call(val))
  // eslint-disable-next-line ts/no-use-before-define
  if (type && _toJSON[type[1].toLowerCase()]) {
    // eslint-disable-next-line ts/no-use-before-define
    return _toJSON[type[1].toLowerCase()](val)
  }
  else {
    return val
  }
}

const _toJSON: any = {
  object(val: any) {
    const json = []
    for (const i in val) {
      if (!hasProperty(val, i))
        continue
      json.push(
                `${toJSON(i)}: ${
                    (val[i] != null) ? toJSON(val[i]) : 'null'}`,
      )
    }
    return `{\n ${json.join(',\n ')}\n}`
  },
  function(val: any) {
    val = `${val}`
    const exec = (/^ *(\w+) *\(/).exec(val)
    if (exec && exec[1] !== 'function') {
      return `function ${val}`
    }
    return val
  },
  array(val: any) {
    const json = []
    let i = 0
    for (; i < val.length; i++)
      json[i] = (val[i] != null) ? toJSON(val[i]) : 'null'
    return `[${json.join(', ')}]`
  },
  string(val: any) {
    const tmp = val.split('')
    for (let i = 0; i < tmp.length; i++) {
      let c = tmp[i];
      (c >= ' ')
        ? (c === '\\')
            ? (tmp[i] = '\\\\')
            : (c === '"') ? (tmp[i] = '\\"') : 0
        : (tmp[i]
                        = (c === '\n')
              ? '\\n'
              : (c === '\r')
                  ? '\\r'
                  : (c === '\t')
                      ? '\\t'
                      : (c === '\b')
                          ? '\\b'
                          : (c === '\f')
                              ? '\\f'
                              : (c = c.charCodeAt(), (`\\u00${(c > 15) ? 1 : 0}${c % 16}`))
          )
    }
    return `"${tmp.join('')}"`
  },
}
