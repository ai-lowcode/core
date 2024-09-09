import type { Schema } from '@ai-lowcode/core'

import { FetchEffectOption } from './basic.ts'

import { Api, VNodeRule } from '@/types'

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
  col?: boolean | any & {
    show?: boolean
  }
  row?: boolean | any & {
    show?: boolean
  }
  info?: boolean | VNodeRule & {
    show?: boolean
    native?: boolean
    icon?: string
    align?: 'left' | 'right'
    info?: string
  }
  wrap?: boolean | (VNodeRule & any & { show?: boolean })
  form?: any
  submitBtn?: boolean | any & {
    click?: Function
    innerText?: string
    show?: boolean
  }
  resetBtn?: boolean | any & {
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
