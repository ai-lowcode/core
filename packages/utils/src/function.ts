/**
 * 将字符串中包含run(的异步函数进行转换
 * @param functionString
 */
export function convertToExecutableFunction(functionString: string): Function {
  // 正则表达式匹配函数声明和参数
  const functionRegex = /(?:async\s+)?run\s*\(([\s\S]*?)\)\s*\{([\s\S]*)\}/
  const match = functionString.match(functionRegex)

  if (!match) {
    throw new Error('Invalid function string')
  }

  const [, paramsString, functionBody] = match

  // 提取参数
  const params = paramsString.split(',').map(param => param.trim())

  // 创建新的函数体，包装异步函数（如果需要）
  const newFunctionBody = functionString.startsWith('async')
    ? `return async function run(${paramsString}) {${functionBody}};`
    : `return function run(${paramsString}) {${functionBody}};`

  // 创建函数
  const createRunFunction = new Function(...params, newFunctionBody)

  // 创建新函数
  return createRunFunction()
}

/**
 * 将对象中包含run(的字符串转换成函数
 * @param input
 */
export function convertStringsToFunctions(input: any | Function): any {
  if (typeof input === 'string' && input?.includes('run(')) {
    return convertToExecutableFunction(input)
  }
  else if (Array.isArray(input)) {
    return input.map(item => convertStringsToFunctions(item))
  }
  else if (typeof input === 'object' && input !== null) {
    const result: any = {}
    for (const [key, value] of Object.entries(input)) {
      result[key] = convertStringsToFunctions(value)
    }
    return result
  }
  return input
}

/**
 * 将对象中的函数转换成字符串
 * @param input
 */
export function convertFunctionsToStrings(input: any | Function): any {
  if (typeof input === 'function') {
    return input.toString()
  }
  else if (Array.isArray(input)) {
    return input.map(item => convertFunctionsToStrings(item))
  }
  else if (typeof input === 'object' && input !== null) {
    const result: any = {}
    for (const [key, value] of Object.entries(input)) {
      result[key] = convertFunctionsToStrings(value)
    }
    return result
  }
  return input
}
