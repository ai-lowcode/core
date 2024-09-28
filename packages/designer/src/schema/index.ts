import { ActionBarSchema, AlActionBar } from '@/schema/element-plus/action-bar'
import { AutocompleteSchema } from '@/schema/element-plus/autocomplete'
import { AlButtonSchema } from '@/schema/element-plus/button'
import { ButtonSchema } from '@/schema/element-plus/button/schema.ts'
import { AlCascaderSchema, CascaderSchema } from '@/schema/element-plus/cascader'
import { ColorPickerSchema } from '@/schema/element-plus/color-picker'
import { DatePickerSchema } from '@/schema/element-plus/date-picker'
import { DialogSchema } from '@/schema/element-plus/dialog'
import { DivSchema } from '@/schema/element-plus/div'
import { FormItemSchema, FormSchema } from '@/schema/element-plus/form'
import { AlIconSelect, IconSelectSchema } from '@/schema/element-plus/icon-select'
import { InputSchema } from '@/schema/element-plus/input/index.ts'
import { InputNumberSchema } from '@/schema/element-plus/input-number'
import { MentionSchema } from '@/schema/element-plus/mention'
import { PaginationSchema } from '@/schema/element-plus/pagination'
import { AlQueryBar, QueryBarSchema } from '@/schema/element-plus/query-bar'
import { AlRadioSchema, RadioSchema } from '@/schema/element-plus/radio'
import { RateSchema } from '@/schema/element-plus/rate'
import { AlSelectSchema, SelectSchema } from '@/schema/element-plus/select'
import { SliderSchema } from '@/schema/element-plus/slider'
import { SwitchSchema } from '@/schema/element-plus/switch'
import { AlDataTable, TableSchema } from '@/schema/element-plus/table'
import { TextSchema } from '@/schema/element-plus/text'
import { TimePickerSchema } from '@/schema/element-plus/time-picker'
import { TimeSelectSchema } from '@/schema/element-plus/time-select'
import { TransferSchema } from '@/schema/element-plus/transfer'
import { AlTreeSelectSchema, TreeSelectSchema } from '@/schema/element-plus/tree-select'
import { UploadSchema } from '@/schema/element-plus/upload'
import { CompSchema } from '@/types'

// eslint-disable-next-line import/order
import './util.ts'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  ActionBarSchema,
  AutocompleteSchema,
  ButtonSchema,
  CascaderSchema,
  ColorPickerSchema,
  DatePickerSchema,
  DialogSchema,
  FormSchema,
  FormItemSchema,
  InputSchema,
  InputNumberSchema,
  MentionSchema,
  PaginationSchema,
  QueryBarSchema,
  RadioSchema,
  RateSchema,
  SliderSchema,
  SwitchSchema,
  TableSchema,
  TextSchema,
  TimePickerSchema,
  TimeSelectSchema,
  TransferSchema,
  TreeSelectSchema,
  SelectSchema,
  UploadSchema,
  DivSchema,
  IconSelectSchema,
]

export const schemaComponent = {
  AlRadioSchema,
  AlButtonSchema,
  AlSelectSchema,
  AlTreeSelectSchema,
  AlQueryBar,
  AlActionBar,
  AlDataTable,
  AlIconSelect,
  AlCascaderSchema,
}

export default componentSchemaList
