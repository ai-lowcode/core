import { uniqueId } from '@ai-lowcode/utils'

import { localeProps } from '../../utils'

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
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.fcEditor.name'),
      info: '',
      $required: false,
      props: {},
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'switch',
      field: 'disabled',
    }])
  },
}
