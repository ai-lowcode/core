import { Select } from '@arco-design/web-vue'
import { ElSelect } from 'element-plus'
import { NSelect } from 'naive-ui'

import { ComponentType } from '@/common/enum.ts'

export interface SelectProps {
  multiple: boolean
  disabled: boolean
  valueKey: string
  size: any
  clearable: boolean
  collapseTags: boolean
  collapseTagsTooltip: boolean
  multipleLimit: number
  name: string
  effect: string
  autocomplete: string
  placeholder: string
  filterable: boolean
  allowCreate: boolean
  filterMethod: any
  remote: boolean
  remoteMethod: any
  remoteShowSuffix: boolean
  loading: boolean
  loadingText: string
  noMatchText: string
  noDataText: string
  popperClass: string
  reserveKeyword: string
  defaultFirstOption: boolean
  teleported: boolean
  appendTo: string
  persistent: boolean
  automaticDropdown: boolean
  clearIcon: string
  fitInputWidth: boolean
  suffixIcon: string
  tagType: any
  tagEffect: any
  validateEvent: boolean
  offset: number
  showArrow: boolean
  placement: any
  fallbackPlacements: any
  maxCollapseTags: number
  popperOptions: any
  ariaLabel: string
  emptyValues: any
  valueOnClear: any
  suffixTransition: boolean
}

export const selectConfig = {
  [ComponentType.ElementPlus]: {
    modelValue: 'modelValue',
    component: ElSelect,
  },
  [ComponentType.ArcoDesign]: {
    modelValue: 'modelValue',
    component: Select,
  },
  [ComponentType.NaiveUi]: {
    modelValue: 'value',
    component: NSelect,
  },
}
