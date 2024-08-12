import { uniqueId } from '@ai-lowcode/utils'

import { localeOptions, localeProps, makeTreeOptions, makeTreeOptionsRule } from '../../utils/index'

import { DragRule } from '@/designer'

const label = '级联选择器'
const name = 'cascader'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-cascader',
  label,
  name,
  event: ['change', 'expandChange', 'blur', 'focus', 'visibleChange', 'removeTag'],
  validate: ['string', 'number', 'array'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.cascader.name'),
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {
        options: makeTreeOptions(t('props.option'), { label: 'label', value: 'value' }, 3),
      },
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [
      makeTreeOptionsRule({ t, to: 'props.options' }),
      ...[

        {
          type: 'switch',
          field: 'disabled',
        },
        {
          type: 'switch',
          field: 'clearable',
        },
        {
          type: 'input',
          field: 'placeholder',
        },
        {
          type: 'Object',
          field: 'props',
          props: {
            rule: localeProps(t, `${name}.propsOpt`, [{
              type: 'switch',
              field: 'multiple',
            }, {
              type: 'select',
              field: 'expandTrigger',
              options: localeOptions(t, [{ label: 'click', value: 'click' }, {
                label: 'hover',
                value: 'hover',
              }]),
            }, {
              type: 'switch',
              field: 'checkStrictly',
            }, {
              type: 'switch',
              field: 'emitPath',
              value: true,
            }, {
              type: 'input',
              field: 'value',
              value: 'value',
            }, {
              type: 'input',
              field: 'label',
              value: 'label',
            }, {
              type: 'input',
              field: 'children',
              value: 'children',
            }, {
              type: 'input',
              field: 'disabled',
              value: 'disabled',
            }, { type: 'input', field: 'leaf' }]),
          },
        },
        {
          type: 'switch',
          field: 'showAllLevels',
          value: true,
        },
        {
          type: 'switch',
          field: 'collapseTags',
        },
        {
          type: 'switch',
          field: 'collapseTagsTooltip',
        },
        {
          type: 'input',
          field: 'separator',
        },
        {
          type: 'switch',
          field: 'filterable',
        },
        {
          type: 'select',
          field: 'tagType',
          options: [
            { label: 'success', value: 'success' },
            { label: 'info', value: 'info' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ],
        },
      ],
    ])
  },
}
