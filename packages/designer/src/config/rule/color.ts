import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

const label = '颜色选择器'
const name = 'colorPicker'

export default {
  menu: 'main',
  icon: 'icon-color',
  label,
  name,
  event: ['change', 'activeChange', 'focus', 'blur'],
  validate: ['string'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.colorPicker.name'),
      info: '',
      $required: false,
      props: {},
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      {
        type: 'switch',
        field: 'disabled',
      },
      {
        type: 'switch',
        field: 'showAlpha',
      },
      {
        type: 'select',
        field: 'colorFormat',
        options: [{ label: 'hsl', value: 'hsl' }, { label: 'hsv', value: 'hsv' }, {
          label: 'hex',
          value: 'hex',
        }, { label: 'rgb', value: 'rgb' }],
      },
      {
        type: 'tableOptions',
        field: 'predefine',
        props: {
          column: [{ label: t('props.value'), key: 'value' }],
          valueType: 'string',
        },
      },
    ])
  },
}
