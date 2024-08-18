import alert from '@/schema/component/alert'
import button from '@/schema/component/button'
import card from '@/schema/component/card'
import cascader from '@/schema/component/cascader'
import checkbox from '@/schema/component/checkbox'
import col from '@/schema/component/col'
import collapse from '@/schema/component/collapse'
import collapseItem from '@/schema/component/collapseItem'
import color from '@/schema/component/color'
import date from '@/schema/component/date'
import dateRange from '@/schema/component/dateRange'
import divider from '@/schema/component/divider'
import editor from '@/schema/component/editor'
import group from '@/schema/component/group'
import html from '@/schema/component/html'
import input from '@/schema/component/input'
import number from '@/schema/component/number'
import password from '@/schema/component/password'
import radio from '@/schema/component/radio'
import rate from '@/schema/component/rate'
import row from '@/schema/component/row'
import select from '@/schema/component/select'
import slider from '@/schema/component/slider'
import space from '@/schema/component/space'
import subForm from '@/schema/component/subForm'
import _switch from '@/schema/component/switch'
import tabPane from '@/schema/component/tabPane'
import table from '@/schema/component/table'
import tableForm from '@/schema/component/tableForm'
import tableFormColumn from '@/schema/component/tableFormColumn'
import tabs from '@/schema/component/tabs'
import tag from '@/schema/component/tag'
import text from '@/schema/component/text'
import textarea from '@/schema/component/textarea'
import time from '@/schema/component/time'
import timeRange from '@/schema/component/timeRange'
import transfer from '@/schema/component/transfer'
import tree from '@/schema/component/tree'
import treeSelect from '@/schema/component/treeSelect'
import upload from '@/schema/component/upload'
import { CompSchema } from '@/types'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  input,
  textarea,
  password,
  number,
  radio,
  checkbox,
  select,
  _switch,
  rate,
  time,
  timeRange,
  slider,
  date,
  dateRange,
  color,
  cascader,
  upload,
  transfer,
  tree,
  treeSelect,
  editor,
  group,
  subForm,
  tableForm,
  tableFormColumn,
  alert,
  button,
  text,
  html,
  divider,
  tag,
  row,
  table,
  tabs,
  space,
  card,
  collapse,
  col,
  tabPane,
  collapseItem,
]

export default componentSchemaList
