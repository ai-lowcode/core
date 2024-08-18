import { ButtonProps, ColProps, FormItemProps, FormProps, RowProps } from 'element-plus'

import { FetchEffectOption } from './basic.ts'

import { Api, Schema, VNodeRule } from '@/core'

export interface Option {
  global?: {
    '*': VNodeRule
    [componentName: string]: VNodeRule
  }
  injectEvent?: object
  preview?: boolean
  forceCoverValue?: object
  formData?: object
  el?: Element
  onSubmit?: (formData: object, api: Api) => void
  beforeFetch?: (config: FetchEffectOption, form: {
    api: Api
    rule: Schema
  }) => void
  mounted?: (api: Api) => void
  reload?: (api: Api) => void
  col?: boolean | ColProps & {
    show?: boolean
  }
  row?: boolean | RowProps & {
    show?: boolean
  }
  info?: boolean | VNodeRule & {
    show?: boolean
    native?: boolean
    icon?: string
    align?: 'left' | 'right'
    info?: string
  }
  wrap?: boolean | (VNodeRule & FormItemProps & { show?: boolean })
  form?: FormProps
  submitBtn?: boolean | ButtonProps & {
    click?: Function
    innerText?: string
    show?: boolean
  }
  resetBtn?: boolean | ButtonProps & {
    click?: Function
    innerText?: string
    show?: boolean
  }
  title?: boolean | VNodeRule & {
    show?: boolean
    native?: boolean
    title: string
  }
}
