import { uniqueId } from '@ai-lowcode/utils'

import { Schema } from '@/types'

export function removeAlDragBoxAndPromoteChildren(nodes: Array<any>): Array<any> {
  return nodes?.flatMap((node: any) => {
    // 检查是否需要删除 AlDragBox 或 AlVueDragAble 且 id 不为 'page' 的节点
    if (
      node.type === 'AlDragBox'
      || (node.type === 'AlVueDragAble' && node.id !== 'page')
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

export function createDragBoxTemplate(schema?: Schema, props?: Record<string, any>) {
  return {
    type: 'AlDragBox',
    id: `__${uniqueId()}`,
    props,
    children: schema
      ? [
          schema,
        ]
      : [],
  }
}

function promoteChildrenAndRemoveNodes(node) {
  // 检查当前节点是否符合需要删除的条件
  const shouldRemoveNode
      = node.type === 'AlDragBox'
      || (node.type === 'AlVueDragAble' && node.id !== 'page')

  if (shouldRemoveNode) {
    // 确保 node.parent 存在并且有 children 属性
    if (node.parent && Array.isArray(node.parent.children)) {
      // 将当前节点从父节点的 children 中移除，并将其子节点提升到父节点
      node.parent.children = node.parent.children.filter(child => child !== node).concat(node.children || [])
    }
    return null // 返回 null 表示要移除这个节点
  }

  // 如果有子节点，递归处理它们
  if (node.children && Array.isArray(node.children)) {
    node.children = node.children
      .map((child) => {
        child.parent = node // 记录父节点，方便后续处理
        return promoteChildrenAndRemoveNodes(child)
      })
      .filter(child => child !== null) // 过滤掉被删除的节点
  }

  return node
}

// 对整个 JSON 结构进行处理
export function processTree(tree) {
  return tree.map(root => promoteChildrenAndRemoveNodes(root)).filter(node => node !== null)
}
