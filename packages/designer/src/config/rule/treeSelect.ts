import { uniqueId } from '@ai-lowcode/utils'

import { localeProps, makeTreeOptions, makeTreeOptionsRule } from '../../utils/index'

import { DragRule } from '@/designer'

const label = '树形选择'
const name = 'elTreeSelect'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-tree-select',
  label,
  name,
  event: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],
  validate: ['string', 'number', 'array'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.elTreeSelect.name'),
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {
        nodeKey: 'value',
        showCheckbox: true,
        data: makeTreeOptions(t('props.option'), { label: 'label', value: 'value' }, 3),
      },
    }
  },
  watch: {
    multiple({ rule }: any) {
      rule.key = uniqueId()
    },
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      makeTreeOptionsRule({ t, to: 'props.data', label: 'label', value: 'value' }),
      { type: 'switch', field: 'multiple' },
      {
        type: 'switch',
        field: 'disabled',
      },
      { type: 'switch', field: 'clearable' },
      {
        type: 'switch',
        field: 'collapseTags',
      },
      {
        type: 'inputNumber',
        field: 'multipleLimit',
        props: { min: 0 },
      },
      { type: 'input', field: 'placeholder' },
      {
        type: 'TableOptions',
        field: 'props',
        props: {
          column: [{ label: t('props.key'), key: 'label' }, { label: t('props.value'), key: 'value' }],
          valueType: 'object',
        },
      },
      {
        type: 'switch',
        field: 'renderAfterExpand',
        value: true,
      },
      {
        type: 'switch',
        field: 'defaultExpandAll',
      },
      {
        type: 'switch',
        field: 'expandOnClickNode',
        value: true,
      },
      {
        type: 'switch',
        field: 'checkOnClickNode',
      },
      {
        type: 'input',
        field: 'nodeKey',
      },
    ])
  },
}
