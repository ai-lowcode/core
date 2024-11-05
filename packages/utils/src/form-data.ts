/**
 * 根据字符串路径设置嵌套对象的值
 *
 * @remarks
 * - 按数组顺序逐层创建对象属性
 * - 如果路径中的属性不存在，会自动创建空对象
 * - 最后一级属性会被设置为 undefined
 * - 不会覆盖已存在的值
 *
 * @param formData - 要操作的目标对象，通常是一个表单数据对象
 * @param keys - 表示路径的字符串数组，每个元素代表一层属性名
 *
 * @example
 * ```typescript
 * // 示例1: 基础用法
 * const formData = {};
 * setNestedObjectValue(formData, ['user', 'address', 'city']);
 * // 结果: { user: { address: { city: undefined } } }
 *
 * // 示例2: 处理已存在的属性
 * const data = { user: { name: 'John' } };
 * setNestedObjectValue(data, ['user', 'address', 'street']);
 * // 结果: {
 * //   user: {
 * //     name: 'John',
 * //     address: { street: undefined }
 * //   }
 * // }
 *
 * // 示例3: 多层嵌套
 * const config = {};
 * setNestedObjectValue(config, ['database', 'connection', 'settings', 'timeout']);
 * // 结果: {
 * //   database: {
 * //     connection: {
 * //       settings: {
 * //         timeout: undefined
 * //       }
 * //     }
 * //   }
 * // }
 * ```
 */
export function setNestedObjectValue(formData: any, keys: string[]) {
  let current = formData

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
 * 根据点分隔的路径字符串生成嵌套对象
 *
 * @remarks
 * - 支持普通对象路径: 'user.profile.name'
 * - 支持数组索引路径: 'users[0].name'
 * - 自动创建数组和对象结构
 * - 路径不存在时会自动创建
 * - 保护已有的数据结构
 *
 * @param formData - 要操作的目标对象
 * @param path - 点分隔的路径字符串，可以包含数组索引，如 'user.addresses[0].street'
 *
 * @example
 * ```typescript
 * // 示例1: 基础对象路径
 * const data = {};
 * generateObjectFromPath(data, 'user.profile.name');
 * // 结果: { user: { profile: { name: undefined } } }
 *
 * // 示例2: 包含数组的路径
 * const formData = {};
 * generateObjectFromPath(formData, 'users[0].addresses[1].street');
 * // 结果: {
 * //   users: [{
 * //     addresses: [
 * //       undefined,
 * //       { street: undefined }
 * //     ]
 * //   }]
 * // }
 *
 * // 示例3: 混合路径
 * const config = {};
 * generateObjectFromPath(config, 'app.settings[0].database.connections[2].timeout');
 * // 结果: {
 * //   app: {
 * //     settings: [{
 * //       database: {
 * //         connections: [
 * //           undefined,
 * //           undefined,
 * //           { timeout: undefined }
 * //         ]
 * //       }
 * //     }]
 * //   }
 * // }
 * ```
 */
export function generateObjectFromPath(formData: any, path: string) {
  const pathParts = path.split('.')
  let currentObj = formData

  for (let i = 0; i < pathParts.length; i++) {
    const part: any = pathParts[i]
    const isArrayIndex = /\[\d+\]/.test(part)

    if (isArrayIndex) {
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
    currentObj = undefined
  }
}

/**
 * 根据路径获取对象中的值
 *
 * @remarks
 * - 支持深层对象访问
 * - 支持数组索引访问
 * - 路径不存在时返回 undefined
 * - 自动处理空值情况
 *
 * @param obj - 要获取值的源对象
 * @param path - 点分隔的路径字符串，支持数组索引，如 'user.addresses[0].street'
 * @returns 路径对应的值，如果路径不存在则返回 undefined
 *
 * @example
 * ```typescript
 * // 示例1: 基础对象访问
 * const data = {
 *   user: {
 *     profile: {
 *       name: 'John Doe'
 *     }
 *   }
 * };
 * const name = getValueFromPath(data, 'user.profile.name');
 * // 返回: 'John Doe'
 *
 * // 示例2: 数组访问
 * const users = {
 *   groups: [{
 *     members: ['Alice', 'Bob', 'Charlie']
 *   }]
 * };
 * const member = getValueFromPath(users, 'groups[0].members[1]');
 * // 返回: 'Bob'
 *
 * // 示例3: 处理不存在的路径
 * const result = getValueFromPath(data, 'user.nonexistent.field');
 * // 返回: undefined
 *
 * // 示例4: 复杂嵌套结构
 * const complex = {
 *   organization: {
 *     departments: [
 *       { name: 'IT', employees: [{ id: 1, name: 'John' }] }
 *     ]
 *   }
 * };
 * const employee = getValueFromPath(complex, 'organization.departments[0].employees[0].name');
 * // 返回: 'John'
 * ```
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
 * 根据路径设置对象中的值
 *
 * @remarks
 * - 支持设置深层对象属性
 * - 支持数组索引设置
 * - 自动创建不存在的路径
 * - 保护已有值不被 undefined 覆盖
 * - 支持任意类型的值设置
 *
 * @param obj - 要设置值的目标对象
 * @param path - 点分隔的路径字符串，支持数组索引，如 'user.addresses[0].street'
 * @param value - 要设置的值，默认为 undefined
 *
 * @example
 * ```typescript
 * // 示例1: 基础属性设置
 * const user = {};
 * setValueAtPath(user, 'profile.name', 'John Doe');
 * // 结果: { profile: { name: 'John Doe' } }
 *
 * // 示例2: 数组操作
 * const org = {};
 * setValueAtPath(org, 'departments[0].name', 'IT');
 * setValueAtPath(org, 'departments[0].employees[0]', { id: 1, name: 'Alice' });
 * // 结果: {
 * //   departments: [{
 * //     name: 'IT',
 * //     employees: [{ id: 1, name: 'Alice' }]
 * //   }]
 * // }
 *
 * // 示例3: 保护已有值
 * const data = { user: { name: 'John' } };
 * setValueAtPath(data, 'user.name', undefined);
 * // 结果: { user: { name: 'John' } } // 已有值不会被 undefined 覆盖
 *
 * // 示例4: 复杂嵌套设置
 * const config = {};
 * setValueAtPath(config, 'database.connections[0].settings.timeout', 1000);
 * // 结果: {
 * //   database: {
 * //     connections: [{
 * //       settings: {
 * //         timeout: 1000
 * //       }
 * //     }]
 * //   }
 * // }
 * ```
 */
export function setValueAtPath(obj: any, path: string, value: any = undefined) {
  const pathParts = path.split('.')
  const lastPart: any = pathParts.pop() // 获取最后一个部分
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
    if (currentObj[lastPart] !== undefined) {
      return // 不做任何更新
    }
  }

  // 直接赋值
  currentObj[lastPart] = value
}

/**
 * 访问或设置嵌套对象的值
 *
 * @remarks
 * - 创建源对象的深拷贝进行操作
 * - 支持深层路径访问和设置
 * - 支持数组索引操作
 * - 自动创建不存在的路径
 * - 返回更新后的对象和设置的值
 *
 * @param formData - 要操作的源对象
 * @param path - 点分隔的路径字符串，支持数组索引，如 'user.addresses[0].street'
 * @param value - 要设置的值，默认为 undefined
 * @returns {{ formData: object, value: any }} 包含更新后的表单数据和设置的值的对象
 *
 * @example
 * ```typescript
 * // 示例1: 基础对象操作
 * const user = { profile: { name: 'John' } };
 * const result1 = accessOrSetNestedValue(user, 'profile.age', 25);
 * // 返回: {
 * //   formData: { profile: { name: 'John', age: 25 } },
 * //   value: 25
 * // }
 *
 * // 示例2: 数组操作
 * const org = { departments: [] };
 * const result2 = accessOrSetNestedValue(org, 'departments[0].name', 'IT');
 * // 返回: {
 * //   formData: { departments: [{ name: 'IT' }] },
 * //   value: 'IT'
 * // }
 *
 * // 示例3: 复杂嵌套结构
 * const data = {
 *   users: [{
 *     profile: { address: {} }
 *   }]
 * };
 * const result3 = accessOrSetNestedValue(
 *   data,
 *   'users[0].profile.address.street',
 *   '123 Main St'
 * );
 * // 返回: {
 * //   formData: {
 * //     users: [{
 * //       profile: {
 * //         address: {
 * //           street: '123 Main St'
 * //         }
 * //       }
 * //     }]
 * //   },
 * //   value: '123 Main St'
 * // }
 *
 * // 示例4: 访问现有值
 * const config = {
 *   settings: {
 *     theme: 'dark'
 *   }
 * };
 * const result4 = accessOrSetNestedValue(config, 'settings.theme');
 * // 返回: {
 * //   formData: { settings: { theme: 'dark' } },
 * //   value: 'dark'
 * // }
 * ```
 */
export function accessOrSetNestedValue(formData: any, path: string, value = undefined) {
  // 创建 formData 的深拷贝
  const newFormData = JSON.parse(JSON.stringify(formData))

  const keys = path.split('.')
  let current = newFormData
  let parent: any = null
  let lastKey: any = null

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
  const setValue = parent[lastKey]

  return { formData: newFormData, value: setValue }
}
