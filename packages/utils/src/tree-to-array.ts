/**
 * 树转数组
 * @return {children: array 子数组}
 * @param tree
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
