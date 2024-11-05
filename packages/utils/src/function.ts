/**
 * 将字符串转换为可执行函数
 *
 * @remarks
 * - 支持普通函数和异步函数的转换
 * - 自动识别函数是否为异步函数（通过检查字符串是否以 'async' 开头）
 * - 转换后的函数保持原有的参数和函数体不变
 * - 使用 new Function 实现，注意相关的安全风险
 *
 * @param functionString - 包含函数定义的字符串，必须包含 'run(' 并且符合标准的函数语法
 * @returns 返回一个可执行的函数实例
 *
 * @throws {Error} 当函数字符串格式不正确时，抛出 'Invalid function string' 错误
 *
 * @example
 * ```typescript
 * // 示例1: 基础函数转换
 * const fnStr = 'run(a, b) { return a + b; }';
 * const fn = convertToExecutableFunction(fnStr);
 * console.log(fn(1, 2)); // 输出: 3
 *
 * // 示例2: 异步函数转换
 * const asyncFnStr = 'async run(x) { return await Promise.resolve(x * 2); }';
 * const asyncFn = convertToExecutableFunction(asyncFnStr);
 * const result = await asyncFn(5); // 输出: 10
 *
 * // 示例3: 复杂函数转换
 * const complexFnStr = `
 *   run(arr, multiplier) {
 *     return arr
 *       .filter(x => x > 0)
 *       .map(x => x * multiplier);
 *   }
 * `;
 * const complexFn = convertToExecutableFunction(complexFnStr);
 * console.log(complexFn([1, -2, 3], 2)); // 输出: [2, 6]
 *
 * // 示例4: 带闭包的函数转换
 * const closureFnStr = `
 *   run(x) {
 *     const helper = (y) => y * 2;
 *     return helper(x);
 *   }
 * `;
 * const closureFn = convertToExecutableFunction(closureFnStr);
 * console.log(closureFn(5)); // 输出: 10
 * ```
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
 * 递归将对象中的函数字符串转换为可执行函数
 *
 * @remarks
 * - 支持深层嵌套的对象和数组结构
 * - 只转换包含 'run(' 的字符串
 * - 保持其他类型的值不变
 * - 支持异步函数的转换
 *
 * @param input - 输入值，可以是函数字符串、对象、数组或其他任何类型
 * @returns 转换后的结果，保持原始数据结构不变
 *
 * @example
 * ```typescript
 * // 示例1: 基础对象转换
 * const input = {
 *   add: 'run(a, b) { return a + b; }',
 *   multiply: 'run(x, y) { return x * y; }',
 *   constant: 42
 * };
 * const result = convertStringsToFunctions(input);
 * console.log(result.add(2, 3));      // 输出: 5
 * console.log(result.multiply(4, 5));  // 输出: 20
 * console.log(result.constant);        // 输出: 42
 *
 * // 示例2: 嵌套对象转换
 * const nestedInput = {
 *   math: {
 *     add: 'run(a, b) { return a + b; }',
 *     utils: {
 *       square: 'run(x) { return x * x; }'
 *     }
 *   },
 *   data: [
 *     'run(x) { return x + 1; }',
 *     'run(x) { return x * 2; }'
 *   ]
 * };
 * const nestedResult = convertStringsToFunctions(nestedInput);
 * console.log(nestedResult.math.add(2, 3));        // 输出: 5
 * console.log(nestedResult.math.utils.square(4));  // 输出: 16
 * console.log(nestedResult.data[0](5));           // 输出: 6
 *
 * // 示例3: 异步函数对象转换
 * const asyncInput = {
 *   fetch: 'async run(url) { return await fetch(url); }',
 *   process: 'async run(data) { return await Promise.resolve(data * 2); }'
 * };
 * const asyncResult = convertStringsToFunctions(asyncInput);
 * // 使用转换后的异步函数
 * const data = await asyncResult.process(10); // 输出: 20
 * ```
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
 * 递归将对象中的函数转换为字符串
 *
 * @remarks
 * - 保持函数的完整定义，包括参数和函数体
 * - 支持普通函数、异步函数和箭头函数的转换
 * - 保持非函数类型的值不变
 * - 适用于需要序列化包含函数的对象场景，如：
 *   - 存储到数据库
 *   - 通过网络传输
 *   - LocalStorage 存储
 *   - 配置文件保存
 *
 * @param input - 输入值，可以是函数、对象、数组或其他任何类型
 * @returns 转换后的结果，所有函数都被转换为字符串
 *
 * @example
 * ```typescript
 * // 示例1: 基础函数转换
 * const input = {
 *   add: function(a, b) { return a + b; },
 *   multiply: (x, y) => x * y,
 *   constant: 42
 * };
 * const result = convertFunctionsToStrings(input);
 * console.log(result);
 * // 输出:
 * // {
 * //   add: "function(a, b) { return a + b; }",
 * //   multiply: "(x, y) => x * y",
 * //   constant: 42
 * // }
 *
 * // 示例2: 异步函数和嵌套对象转换
 * const complexInput = {
 *   async: async function(x) {
 *     return await Promise.resolve(x);
 *   },
 *   nested: {
 *     helper: (x) => x * 2,
 *     data: [
 *       function(y) { return y + 1; }
 *     ]
 *   }
 * };
 * const complexResult = convertFunctionsToStrings(complexInput);
 *
 * // 示例3: 类方法转换
 * class Calculator {
 *   add(a, b) { return a + b; }
 *   multiply(x, y) { return x * y; }
 * }
 * const calc = new Calculator();
 * const methodsResult = convertFunctionsToStrings({
 *   calculator: calc
 * });
 * ```
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
