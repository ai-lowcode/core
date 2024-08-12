import { localeOptions, localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '分割线'
const name = 'elDivider'

export default <DragRule>{
  menu: 'aide',
  icon: 'icon-divider',
  label,
  name,
  rule({ t }: any) {
    return {
      type: name,
      props: {},
      children: [t('com.elDivider.name')],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'input',
      field: 'formCreateChild',
    }, {
      type: 'select',
      field: 'contentPosition',
      options: localeOptions(t, [{ label: 'left', value: 'left' }, { label: 'right', value: 'right' }, {
        label: 'center',
        value: 'center',
      }]),
    }])
  },
}
