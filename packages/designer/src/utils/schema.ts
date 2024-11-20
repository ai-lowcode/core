import { Schema } from '@zero-dim/core'

export function getSchemaInstanceName(selectComponent: Schema) {
  return `${selectComponent?.name}_${selectComponent?.id}`
}
