import { localeProps } from '../../utils'

const label = '选项卡'
const name = 'elTabPane'

export default {
  label,
  name,
  inside: true,
  drag: true,
  dragBtn: false,
  mask: false,
  rule({ t }: any) {
    return {
      type: name,
      props: { label: t('com.elTabPane.name') },
      children: [],
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{ type: 'input', field: 'label' }, {
      type: 'switch',
      field: 'disabled',
    }, { type: 'input', field: 'name' }, {
      type: 'switch',
      field: 'lazy',
    }])
  },
}
