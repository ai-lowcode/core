import { uniqueId } from '@ai-lowcode/utils'

import { localeProps, makeTreeOptions, makeTreeOptionsRule } from '../../utils'

const label = '穿梭框'
const name = 'elTransfer'

export default {
  menu: 'main',
  icon: 'icon-transfer',
  label,
  name,
  event: ['change', 'leftCheckChange', 'rightCheckChange'],
  validate: ['string', 'number', 'array'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.elTransfer.name'),
      info: '',
      $required: false,
      props: {
        data: makeTreeOptions(t('props.option'), { label: 'label', value: 'key' }, 1),
      },
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      makeTreeOptionsRule({ t, to: 'props.data', label: 'label', value: 'key' }),
      { type: 'switch', field: 'filterable' },
      {
        type: 'input',
        field: 'filterPlaceholder',
      },
      {
        type: 'select',
        field: 'targetOrder',
        info: t('com.elTransfer.targetOrderInfo'),
        options: [{ label: 'original', value: 'original' }, {
          label: 'push',
          value: 'push',
        }, { label: 'unshift', value: 'unshift' }],
      },
      {
        type: 'TableOptions',
        field: 'titles',
        props: {
          column: [{ label: t('props.value'), key: 'value' }],
          valueType: 'string',
          max: 2,
        },
      },
      {
        type: 'TableOptions',
        field: 'buttonTexts',
        props: {
          column: [{ label: t('props.value'), key: 'value' }],
          valueType: 'string',
          max: 2,
        },
      },
    ])
  },
}
