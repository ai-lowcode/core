import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '富文本框'
const name = 'fcEditor'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-editor',
  label,
  name,
  event: ['change'],
  validate: ['string'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '富文本框',
      info: '',
      $required: false,
      props: {},
    }
  },
  props: () => {
    return <Schema[]>[{
      type: 'switch',
      field: 'disabled',
      title: '是否禁用',
    }]
  },
}
