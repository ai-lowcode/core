import alert from './rule/alert'
import button from './rule/button'
import card from './rule/card'
import cascader from './rule/cascader'
import checkbox from './rule/checkbox'
import col from './rule/col'
import collapse from './rule/collapse'
import collapseItem from './rule/collapseItem'
import color from './rule/color'
import date from './rule/date'
import dateRange from './rule/dateRange'
import divider from './rule/divider'
import editor from './rule/editor'
import group from './rule/group'
import html from './rule/html'
import input from './rule/input'
import number from './rule/number'
import password from './rule/password'
import radio from './rule/radio'
import rate from './rule/rate'
import row from './rule/row'
import select from './rule/select'
import slider from './rule/slider'
import space from './rule/space'
import subForm from './rule/subForm'
import _switch from './rule/switch'
import tabPane from './rule/tabPane'
import table from './rule/table'
import tableForm from './rule/tableForm'
import tableFormColumn from './rule/tableFormColumn'
import tabs from './rule/tabs'
import tag from './rule/tag'
import text from './rule/text'
import textarea from './rule/textarea'
import time from './rule/time'
import timeRange from './rule/timeRange'
import transfer from './rule/transfer'
import tree from './rule/tree'
import treeSelect from './rule/treeSelect'
import upload from './rule/upload'

import { DragRule } from '@/designer'

// 拖拽组件列表
const dragComponentList: Array<DragRule> = [
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

export default dragComponentList

/**
 * 默认拖拽组件
 * @param rule
 */
export function defaultDrag(rule: any) {
  return {
    icon: rule.field ? 'icon-input' : 'icon-cell',
    label: rule.field || rule.type,
    name: '_',
    mask: true,
    handleBtn: ['delete'],
    rule() {
      return rule
    },
    props() {
      return []
    },
  } as DragRule
}
