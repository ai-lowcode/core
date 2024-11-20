import '@zero-dim/styles/tailwindCss'

import { ActionBarSchema, AlActionBar } from './action-bar'
import { AutocompleteSchema } from './autocomplete'
import { AlButtonSchema, ButtonSchema } from './button'
import { AlCascaderSchema, CascaderSchema } from './cascader'
import { ColorPickerSchema } from './color-picker'
import { DatePickerSchema } from './date-picker'
import { DialogSchema } from './dialog'
import { DivSchema } from './div'
import { FormItemSchema, FormSchema } from './form'
import { AlIconSelect, IconSelectSchema } from './icon-select'
import { InputSchema } from './input'
import { InputNumberSchema } from './input-number'
import { MentionSchema } from './mention'
import { PaginationSchema } from './pagination'
import { AlQueryBar, QueryBarSchema } from './query-bar'
import { AlRadioSchema, RadioSchema } from './radio'
import { RateSchema } from './rate'
import { AlSegmentedSchema, SegmentedSchema } from './segmented'
import { AlSelectSchema, SelectSchema } from './select'
import { SliderSchema } from './slider'
import { SwitchSchema } from './switch'
import { AlDataTable, TableSchema } from './table'
import { AlTabsSchema, TabsSchema } from './tabs'
import { TextSchema } from './text'
import { TimePickerSchema } from './time-picker'
import { TimeSelectSchema } from './time-select'
import { TransferSchema } from './transfer'
import { AlTreePanel, TreePanelSchema } from './tree'
import { AlTreeSelectSchema, TreeSelectSchema } from './tree-select'
import { UploadSchema } from './upload'

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
  SegmentedSchema,
  TreePanelSchema,
  TabsSchema,
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
  AlSegmentedSchema,
  AlTreePanel,
  AlTabsSchema,
}

export * from './types'

export default componentSchemaList
