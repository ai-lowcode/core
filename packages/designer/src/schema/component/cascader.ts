import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

import { makeTreeOptions, makeTreeOptionsRule } from '@/utils'

const label = '级联选择器'
const name = 'cascader'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-cascader',
  label,
  name,
  event: ['change', 'expandChange', 'blur', 'focus', 'visibleChange', 'removeTag'],
  validate: ['string', 'number', 'array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '级联选择器',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {
        options: makeTreeOptions('选项', { label: 'label', value: 'value' }, 3),
      },
    }
  },
  props: () => {
    return <Schema[]>[
      makeTreeOptionsRule({ to: 'props.options' }),
      ...[
        {
          type: 'switch',
          field: 'disabled',
          title: '是否禁用',
        },
        {
          type: 'switch',
          field: 'clearable',
          title: '是否支持清空选项',
        },
        {
          type: 'input',
          field: 'placeholder',
          title: '输入框占位文本',
        },
        {
          type: 'Object',
          field: 'props',
          title: '配置选项',
          props: {
            rule: [
              {
                type: 'switch',
                field: 'multiple',
                title: '是否多选',
              },
              {
                type: 'select',
                field: 'expandTrigger',
                title: '次级菜单的展开方式',
                options: [
                  { label: '点击', value: 'click' },
                  {
                    label: '悬浮',
                    value: 'hover',
                  },
                ],
              },
              {
                type: 'switch',
                field: 'checkStrictly',
                title: '是否严格的遵守父子节点不互相关联',
              },
              {
                type: 'switch',
                field: 'emitPath',
                title: '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组',
                value: true,
              },
              {
                type: 'input',
                field: 'value',
                title: '指定选项的值为选项对象的某个属性值',
                value: 'value',
              },
              {
                type: 'input',
                field: 'label',
                title: '指定选项标签为选项对象的某个属性值',
                value: 'label',
              },
              {
                type: 'input',
                field: 'children',
                title: '指定选项的子选项为选项对象的某个属性值',
                value: 'children',
              },
              {
                type: 'input',
                field: 'disabled',
                title: '指定选项的禁用为选项对象的某个属性值',
                value: 'disabled',
              },
              { type: 'input', field: 'leaf', title: '指定选项的叶子节点的标志位为选项对象的某个属性值' },
            ],
          },
        },
        {
          type: 'switch',
          field: 'showAllLevels',
          title: '输入框中是否显示选中值的完整路径',
          value: true,
        },
        {
          type: 'switch',
          field: 'collapseTags',
          title: '多选模式下是否折叠Tag',
        },
        {
          type: 'switch',
          field: 'collapseTagsTooltip',
          title: '当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签',
        },
        {
          type: 'input',
          field: 'separator',
          title: '选项分隔符',
        },
        {
          type: 'switch',
          field: 'filterable',
          title: '该选项是否可以被搜索',
        },
        {
          type: 'select',
          field: 'tagType',
          title: '标签类型',
          options: [
            { label: 'success', value: 'success' },
            { label: 'info', value: 'info' },
            { label: 'warning', value: 'warning' },
            { label: 'danger', value: 'danger' },
          ],
        },
      ],
    ]
  },
}
