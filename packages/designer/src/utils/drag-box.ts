import { Schema } from '@/types'

export function removeAlDragBoxAndPromoteChildren(nodes: Array<Schema>) {
  return nodes.flatMap((node: Schema) => {
    if (node.type === 'AlDragBox') {
      // 递归处理 AlDragBox 的子节点，并将它们提升
      return removeAlDragBoxAndPromoteChildren(node.children as Array<Schema>)
    }
    else if (node.children && node.children.length > 0) {
      // 如果节点不是 AlDragBox，但有子节点，递归处理子节点
      node.children = removeAlDragBoxAndPromoteChildren(node.children as Array<Schema>)
    }
    // 返回当前节点
    return node
  })
}

export function createDragBoxTemplate(schema?: Schema, full?: boolean) {
  return {
    type: 'AlDragBox',
    props: full ? { class: 'h-full' } : {},
    children: schema
      ? [
          schema,
        ]
      : [],
  }
}
