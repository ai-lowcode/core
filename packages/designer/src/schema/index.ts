import { ButtonSchema } from '@/schema/element-plus/button/schema.ts'
import { FormItemSchema } from '@/schema/element-plus/form/form-item-schema.ts'
import { FormSchema } from '@/schema/element-plus/form/form-schema.ts'
import { InputSchema } from '@/schema/element-plus/input/index.ts'
import { TextSchema } from '@/schema/element-plus/text'
import { CompSchema } from '@/types'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  InputSchema,
  ButtonSchema,
  FormSchema,
  FormItemSchema,
  TextSchema,
]

export default componentSchemaList
