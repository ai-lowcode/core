// Copyright (c) Example Company. All rights reserved. Licensed under the MIT license.

/**
 * @zero-dim/utils - 前端通用工具函数库
 *
 * @remarks
 * 这是一个全面的前端工具函数库，提供了丰富的工具函数集合，包括：
 *
 * - 进度条控制 {@link nProgress} - 提供页面加载进度条功能
 * - 树结构操作 {@link treeToArray} - 树形结构与数组的相互转换
 * - 类型判断 {@link is, isObject, isFunction} - 全面的数据类型判断工具
 * - 唯一标识 {@link uniqueId} - 生成 UUID 等唯一标识
 * - 对象操作 {@link deepExtend, deepCopy} - 深拷贝、对象合并等
 * - 表单处理 {@link setNestedObjectValue, generateObjectFromPath} - 表单数据的处理工具
 * - 函数工具 {@link convertToExecutableFunction, convertStringsToFunctions} - 函数字符串转换等
 *
 * 主要特点：
 * - 完全使用 TypeScript 编写，提供完整的类型定义
 * - 全面的单元测试覆盖
 * - 零依赖，仅依赖核心的工具库
 * - 支持 Tree Shaking
 * - 支持 ESM 和 CommonJS 两种模块规范
 *
 * 安装使用:
 * ```bash
 * npm install @zero-dim/utils
 * # 或者
 * yarn add @zero-dim/utils
 * ```
 *
 * 基础使用:
 * ```typescript
 * import { isObject, deepCopy, uniqueId } from '@zero-dim/utils'
 *
 * // 类型判断
 * isObject({}) // true
 *
 * // 对象深拷贝
 * const copy = deepCopy({ a: 1, b: { c: 2 } })
 *
 * // 生成唯一ID
 * const id = uniqueId()
 * ```
 *
 * @packageDocumentation
 */

// 进度条控制
export * from './progress'

// 树结构操作
export * from './tree-to-array'

// 类型判断
export * from './is'

// 唯一标识
export * from './unique'

// 对象操作
export * from './deep-extend'

// 表单处理
export * from './form-data'

// 函数工具
export * from './function'
