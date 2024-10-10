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
 * 根据path路径生成对象
 * @param formData
 * @param path
 */
export function generateObjectFromPath(formData: any, path: string) {
  const pathParts = path.split('.')
  let currentObj = formData

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i]
    const isArrayIndex = /\[\d+\]/.test(part)

    if (isArrayIndex) {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      const arrayIndex = Number.parseInt(part.match(/\d+/)[0])
      const arrayName = part.split('[')[0]

      // 确保数组存在
      if (!Array.isArray(currentObj[arrayName])) {
        currentObj[arrayName] = []
      }

      // 确保数组的特定索引存在
      if (currentObj?.[arrayName]?.[arrayIndex] === undefined) {
        currentObj[arrayName][arrayIndex] = undefined // 设置为 undefined
      }

      currentObj = currentObj[arrayName][arrayIndex] // 移动到数组元素
    }
    else {
      if (currentObj === undefined)
        currentObj = {}
      // 确保对象的属性存在
      if (currentObj[part] === undefined) {
        currentObj[part] = undefined // 设置为 undefined
      }

      currentObj = currentObj?.[part] // 移动到下一个对象
    }
  }

  // 最后一个部分设置为 undefined
  if (currentObj !== undefined) {
    currentObj = undefined // 将最后一个部分设置为 undefined
  }
}

/**
 * 根据path路径获取变量值
 * @param obj
 * @param path
 */
export function getValueFromPath(obj: any, path: string) {
  const pathParts = path.split('.')

  return pathParts.reduce((currentObj, part) => {
    const arrayIndexMatch = part.match(/(\w+)\[(\d+)\]/)

    // 如果当前部分是数组索引
    if (arrayIndexMatch) {
      const arrayName = arrayIndexMatch[1]
      const index = Number.parseInt(arrayIndexMatch[2], 10)

      // 确保数组存在并返回指定索引的值
      if (currentObj[arrayName] && Array.isArray(currentObj[arrayName])) {
        return currentObj[arrayName][index]
      }

      return undefined // 如果数组不存在或索引不合法
    }

    // 返回当前对象的属性值
    return currentObj ? currentObj[part] : undefined
  }, obj)
}

/**
 * 根据path路径设置值
 * @param obj
 * @param path
 * @param value
 */
export function setValueAtPath(obj: any, path: string, value: any = undefined) {
  const pathParts = path.split('.')
  const lastPart = pathParts.pop() // 获取最后一个部分
  let currentObj = obj

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i]
    const isArrayIndex = /\[\d+\]/.test(part)

    if (isArrayIndex) {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      const arrayIndex = Number.parseInt(part.match(/\d+/)[0])
      const arrayName = part.split('[')[0]

      // 确保数组存在
      if (!Array.isArray(currentObj[arrayName])) {
        currentObj[arrayName] = []
      }

      // 确保数组的特定索引存在
      if (!currentObj[arrayName][arrayIndex]) {
        currentObj[arrayName][arrayIndex] = {}
      }

      currentObj = currentObj[arrayName][arrayIndex] // 移动到数组元素
    }
    else {
      // 确保对象的属性存在
      if (!currentObj[part]) {
        currentObj[part] = {}
      }

      currentObj = currentObj[part] // 移动到下一个对象
    }
  }

  // 如果传入的值为 undefined
  if (value === undefined) {
    // 如果之前存在值，则不更新
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    if (currentObj[lastPart] !== undefined) {
      return // 不做任何更新
    }
  }

  // 直接赋值
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  currentObj[lastPart] = value
}

/**
 * 定义一个函数，如果路径存在，直接返回该值；如果不存在，则创建路径并返回新创建的值
 * @param formData
 * @param path
 * @param value
 */
export function accessOrSetNestedValue(formData: any, path: string, value = undefined) {
  // 创建 formData 的深拷贝
  const newFormData = JSON.parse(JSON.stringify(formData))

  const keys = path.split('.')
  let current = newFormData
  let parent = null
  let lastKey = null

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const match = key.match(/^(.+)\[(\d+)\]$/)

    if (match) {
      // 处理数组
      const arrayKey = match[1]
      const index = Number.parseInt(match[2])

      if (!current[arrayKey]) {
        current[arrayKey] = []
      }

      parent = current[arrayKey]
      lastKey = index

      if (i === keys.length - 1) {
        current[arrayKey][index] = value
      }
      else {
        if (!current[arrayKey][index]) {
          current[arrayKey][index] = {}
        }
        current = current[arrayKey][index]
      }
    }
    else {
      // 处理普通对象
      parent = current
      lastKey = key

      if (i === keys.length - 1) {
        current[key] = value
      }
      else {
        if (!current[key] || typeof current[key] !== 'object') {
          current[key] = {}
        }
        current = current[key]
      }
    }
  }

  // 获取设置的值
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const setValue = parent[lastKey]

  return { formData: newFormData, value: setValue }
}
