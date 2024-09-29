import { Schema } from '@ai-lowcode/core'

export function getSchemaInstanceName(selectComponent: Schema) {
  return `${selectComponent?.name}_${selectComponent?.id}`
}
