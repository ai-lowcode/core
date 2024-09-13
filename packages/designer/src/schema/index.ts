import { ActionBarSchema } from '@/schema/element-plus/action-bar'
import { ButtonSchema } from '@/schema/element-plus/button/schema.ts'
import { ColorPickerSchema } from '@/schema/element-plus/color-picker'
import { DialogSchema } from '@/schema/element-plus/dialog'
import { FormItemSchema, FormSchema } from '@/schema/element-plus/form'
import { InputSchema } from '@/schema/element-plus/input/index.ts'
import { PaginationSchema } from '@/schema/element-plus/pagination'
import { QueryBarSchema } from '@/schema/element-plus/query-bar'
import { TableSchema } from '@/schema/element-plus/table'
import { TextSchema } from '@/schema/element-plus/text'
import { CompSchema } from '@/types'

// eslint-disable-next-line import/order
import './util.ts'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  InputSchema,
  ButtonSchema,
  FormSchema,
  FormItemSchema,
  TableSchema,
  TextSchema,
  PaginationSchema,
  DialogSchema,
  ColorPickerSchema,
  ActionBarSchema,
  QueryBarSchema,
]

export default componentSchemaList
