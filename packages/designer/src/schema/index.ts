import { ButtonSchema } from '@/schema/element-plus/button/schema.ts'
import { FormItemSchema, FormSchema } from '@/schema/element-plus/form'
import { InputSchema } from '@/schema/element-plus/input/index.ts'
import { PaginationSchema } from '@/schema/element-plus/pagination'
import { TableSchema } from '@/schema/element-plus/table'
import { TextSchema } from '@/schema/element-plus/text'
import { CompSchema } from '@/types'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  InputSchema,
  ButtonSchema,
  FormSchema,
  FormItemSchema,
  TableSchema,
  TextSchema,
  PaginationSchema,
]

export default componentSchemaList
