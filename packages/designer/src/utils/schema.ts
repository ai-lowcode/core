import Schema from '@/schema'

export function getSchemaInstanceName(selectComponent: Schema) {
  return `${selectComponent?.name}_${selectComponent?.id}`
}
