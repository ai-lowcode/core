import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'

const label = '富文本框'
const name = 'fcEditor'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-editor',
  label,
  name,
  event: ['change'],
  validate: ['string'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '富文本框',
      info: '',
      $required: false,
      props: {},
    }
  },
  props() {
    return [{
      type: 'switch',
      field: 'disabled',
      title: '是否禁用',
    }]
  },
}
