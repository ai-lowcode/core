import { uniqueId } from '@ai-lowcode/utils'

import { localeProps, makeOptionsRule, makeTreeOptions } from '../../utils/index'

import { DragRule } from '@/designer'

const label = '单选框'
const name = 'radio'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-radio',
  label,
  name,
  event: ['change'],
  validate: ['string', 'number'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.radio.name'),
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {},
      options: makeTreeOptions(t('props.option'), { label: 'label', value: 'value' }, 1),
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      makeOptionsRule(t, 'options'),
      { type: 'switch', field: 'disabled' },
      {
        type: 'switch',
        field: 'type',
        props: { activeValue: 'button', inactiveValue: 'default' },
      },
      { type: 'ColorInput', field: 'textColor' },
      {
        type: 'ColorInput',
        field: 'fill',
      },
    ])
  },
}
