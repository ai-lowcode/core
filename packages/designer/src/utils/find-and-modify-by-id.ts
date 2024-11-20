import type { Schema } from '@zero-dim/core'
import { uniqueId } from '@zero-dim/utils'

/**
 * 根据targetId搜索nodes的节点，修改targetId节点的值
 * @param nodes
 * @param targetId
 * @param callback
 */
export function findAndModifyById(nodes: any, targetId: any, callback: any) {
  // 遍历所有节点
  return nodes.map((node: any) => {
    // 创建当前节点的浅拷贝
    const newNode = { ...node }

    // 如果当前节点的 id 匹配目标 id，则调用回调函数进行修改
    if (newNode.id === targetId) {
      callback(newNode)
    }

    // 如果当前节点有子节点，递归处理子节点
    if (newNode.children && newNode.children.length > 0 && typeof newNode.children[0] !== 'string') {
      newNode.children = findAndModifyById(newNode.children, targetId, callback)
    }

    return newNode
  })
}

/**
 * 根据targetId删除节点
 * @param nodes
 * @param targetId
 */
export function removeNodeById(nodes: Schema[], targetId: string) {
  // 遍历每个节点
  return nodes.filter((node) => {
    if (node.id === targetId) {
      // 如果当前节点的 id 与目标 id 匹配，则过滤掉这个节点（删除它）
      return false
    }
    // 如果当前节点有 children 属性，递归地检查并删除子节点
    if (node.children) {
      node.children = removeNodeById(node?.children as Schema[], targetId)
    }
    // 保留当前节点
    return true
  })
}

/**
 * 根据targetId搜索到对于数据，然后修改改数据父亲节点内容
 * @param treeArray
 * @param targetId
 * @param callback
 */
export function findAndModifyParentById(treeArray: Schema[], targetId: string, callback: Function) {
  // Helper function to recursively search the tree
  function searchAndModify(node: Schema, parent: any = null) {
    if (node.id === targetId) {
      if (parent && parent.type === 'AlVueDragAble') {
        // 使用回调函数修改父级的 children
        parent.children = callback(parent.children)
      }
      return true // Stop further recursion once the target is found
    }

    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        if (searchAndModify(child, node)) {
          return true // Stop recursion if the target is found
        }
      }
    }

    return false // Continue searching
  }

  // Iterate through the tree array
  for (const node of treeArray) {
    searchAndModify(node)
  }

  // Return the modified array
  return treeArray
}

/**
 * 递归更新 id
 * @param node
 */
export function recursiveUpdateIds(node: Schema) {
  // Update the id
  node.id = `__${uniqueId()}`
  node.field = `__${uniqueId()}`

  // Recursively update children if they exist
  if (node.children && Array.isArray(node.children)) {
    node.children = node.children.map((child: Schema) => recursiveUpdateIds(child))
  }

  return node
}

/**
 * 将fromId下面 children 为oldIndex索引的数据移动到toId下面 children 为newIndex的位置
 * @param nodes
 * @param fromId
 * @param toId
 * @param oldIndex
 * @param newIndex
 */
export function swapChildrenPositions(
  nodes: Schema[],
  fromId: string,
  toId: string,
  oldIndex: number,
  newIndex: number,
): Schema[] {
  // Helper function to find a node by ID and return its parent and index
  function findNodeAndParent(
    nodes: Schema[],
    targetId: string,
  ): { parent: Schema | null, index: number, node: Schema | null } | null {
    for (const [index, node] of nodes.entries()) {
      if (node.id === targetId) {
        return { parent: null, index, node }
      }
      if (node.children) {
        const result = findNodeAndParent(node.children as Schema[], targetId)
        if (result) {
          return {
            parent: node,
            index: result.index,
            node: result.node,
          }
        }
      }
    }
    return null
  }

  const fromResult = findNodeAndParent(nodes, fromId)
  const toResult = findNodeAndParent(nodes, toId)

  if (!fromResult || !toResult || !fromResult.node || !toResult.node) {
    throw new Error('Node not found')
  }

  // Get the node to be moved
  const [movedNode] = (fromResult.node.children as any)?.splice(oldIndex, 1)

  // Remove the old node's children array if it's empty
  if (fromResult.node.children!.length === 0) {
    fromResult.node.children = []
  }

  // Insert the node at the new location
  if (!toResult.node.children) {
    toResult.node.children = []
  }
  (toResult.node.children as any)?.splice(newIndex, 0, movedNode)

  return nodes
}
