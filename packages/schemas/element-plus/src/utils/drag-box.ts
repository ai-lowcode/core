/**
 * 删除类型为AlDragBox，AlVueDragAble的盒子，且不改变数据结构
 * @param nodes
 */
export function removeAlDragBoxAndPromoteChildren(nodes: Array<any>): Array<any> {
  return nodes?.flatMap((node: any) => {
    // 检查是否需要删除 AlDragBox 或 AlVueDragAble 且 id 不为 'page' 的节点
    if (
      node.type === 'AlDragBox'
      || (node.type === 'AlVueDragAble')
    ) {
      // 递归处理需要删除节点的子节点，并将它们提升
      return removeAlDragBoxAndPromoteChildren(node.children as Array<any>)
    }
    else if (node.children && node.children.length > 0) {
      // 如果节点有子节点，递归处理子节点
      node.children = removeAlDragBoxAndPromoteChildren(node.children as Array<any>)
    }
    // 返回当前节点
    return node
  })
}
