import { Schema } from '@/types'

export function removeAlDragBoxAndPromoteChildren(arr) {
  return arr.reduce((result, item) => {
    if (item.type === 'AlDragBox') {
      // 如果当前项是 AlDragBox，直接将其 children 提升到上层
      if (item.children && Array.isArray(item.children)) {
        // 将 AlDragBox 的 children 添加到父层
        return result.concat(item.children)
      }
      return result
    }
    else {
      // 如果当前项不是 AlDragBox，递归处理其 children
      if (item.children && Array.isArray(item.children)) {
        item.children = removeAlDragBoxAndPromoteChildren(item.children)
      }
      result.push(item)
      return result
    }
  }, [])
}

export function createDragBoxTemplate(schema?: Schema) {
  return {
    type: 'AlDragBox',
    inject: true,
    props: {},
    children: schema
      ? [
          schema,
        ]
      : [],
  }
}
