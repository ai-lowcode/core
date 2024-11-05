/**
 * 将树形结构数据转换为扁平数组
 *
 * @remarks
 * - 会移除原始数据中的 children 字段
 * - 保留节点的所有其他属性
 * - 深度优先遍历,子节点在父节点之前
 *
 * @param tree - 树形结构数据,每个节点可以包含 children 属性
 * @returns 扁平化后的节点数组,不包含 children 字段
 *
 * @typeParam T - 节点的类型
 *
 * @example
 * ```ts
 * // 基础示例
 * const tree = [
 *   {
 *     id: 1,
 *     name: '父节点1',
 *     children: [
 *       { id: 2, name: '子节点1' },
 *       { id: 3, name: '子节点2' }
 *     ]
 *   },
 *   {
 *     id: 4,
 *     name: '父节点2',
 *     children: [
 *       { id: 5, name: '子节点3' }
 *     ]
 *   }
 * ]
 *
 * const array = treeToArray(tree)
 * // 输出结果:
 * // [
 * //   { id: 2, name: '子节点1' },
 * //   { id: 3, name: '子节点2' },
 * //   { id: 1, name: '父节点1' },
 * //   { id: 5, name: '子节点3' },
 * //   { id: 4, name: '父节点2' }
 * // ]
 *
 * // 复杂属性示例
 * const complexTree = [
 *   {
 *     id: 1,
 *     data: { value: 100 },
 *     children: [
 *       {
 *         id: 2,
 *         data: { value: 200 }
 *       }
 *     ]
 *   }
 * ]
 *
 * const result = treeToArray(complexTree)
 * // 输出结果保留了复杂属性:
 * // [
 * //   { id: 2, data: { value: 200 } },
 * //   { id: 1, data: { value: 100 } }
 * // ]
 * ```
 *
 * @throws 如果输入的树结构包含循环引用,可能会导致栈溢出
 */
export function treeToArray<T>(tree: Array<any>): Array<T> {
  let res: Array<T> = []
  for (const item of tree) {
    const { children, ...i } = item
    if (children && children.length) {
      res = res.concat(treeToArray(children))
    }
    res.push(i)
  }
  return res
}
