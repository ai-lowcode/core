import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

const label = '滑块'
const name = 'slider'

export default {
  menu: 'main',
  icon: 'icon-slider',
  label,
  name,
  event: ['change', 'input'],
  validate: ['number', 'array'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.slider.name'),
      info: '',
      $required: false,
      props: {},
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{ type: 'switch', field: 'disabled' }, {
      type: 'switch',
      field: 'range',
    }, {
      type: 'inputNumber',
      field: 'min',
      props: { min: 0 },
    }, {
      type: 'inputNumber',
      field: 'max',
      props: { min: 0 },
    }, {
      type: 'inputNumber',
      field: 'step',
      props: { min: 0 },
    }, { type: 'switch', field: 'showInput' }, {
      type: 'switch',
      field: 'showInputControls',
      value: true,
    }, { type: 'switch', field: 'showStops' }, {
      type: 'switch',
      field: 'vertical',
    }, {
      type: 'input',
      field: 'height',
    }])
  },
}
