import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '评分'
const name = 'rate'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-rate',
  label,
  name,
  event: ['change'],
  validate: ['number'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.rate.name'),
      info: '',
      $required: false,
      props: {},
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      { type: 'inputNumber', field: 'max', props: { min: 0 } },
      {
        type: 'switch',
        field: 'disabled',
      },
      { type: 'switch', field: 'allowHalf' },
      {
        type: 'ColorInput',
        field: 'voidColor',
      },
      { type: 'ColorInput', field: 'disabledVoidColor' },
      {
        type: 'input',
        field: 'voidIconClass',
      },
      { type: 'input', field: 'disabledVoidIconClass' },
      {
        type: 'switch',
        field: 'showScore',
      },
      { type: 'ColorInput', field: 'textColor' },
      {
        type: 'input',
        field: 'scoreTemplate',
      },
    ])
  },
}
