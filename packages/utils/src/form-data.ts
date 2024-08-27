/**
 * 定义函数将字符串路径转换为嵌套对象
 * @param obj
 * @param keys
 */
export function setNestedObjectValue(obj: any, keys: string[]) {
  let current = obj

  keys?.forEach((key, index) => {
    if (index === keys.length - 1) {
      // 最后一层赋值为空对象
      current[key] = current[key] ?? undefined
    }
    else {
      // 如果当前层不存在这个 key，则创建一个空对象
      if (!current[key]) {
        current[key] = {}
      }
      current = current[key] // 进入下一层
    }
  })
}

/**
 * 定义一个函数，既能访问也能修改嵌套对象中的值
 * @param obj
 * @param keys
 * @param newValue
 */
export function accessOrSetNestedValue(obj: any, keys: string[], newValue = undefined) {
  let current = obj
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) {
      return undefined // 如果路径不存在，则返回 undefined
    }
    current = current[keys[i]]
  }

  const lastKey = keys[keys.length - 1]

  if (newValue !== undefined) {
    // 如果提供了 newValue，则进行赋值操作
    current[lastKey] = newValue
  }

  // 返回最终的值（可能是新值或旧值）
  return current[lastKey]
}
