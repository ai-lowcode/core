import { uniqueId } from '@ai-lowcode/utils'

import { DragRule } from '@/designer'
import { makeTreeOptions, makeTreeOptionsRule } from '@/utils'

const label = '树形选择'
const name = 'elTreeSelect'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-tree-select',
  label,
  name,
  event: ['change', 'visibleChange', 'removeTag', 'clear', 'blur', 'focus'],
  validate: ['string', 'number', 'array'],
  rule() {
    return {
      type: name,
      field: uniqueId(),
      title: '树形选择',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {
        nodeKey: 'value',
        showCheckbox: true,
        data: makeTreeOptions('选项', { label: 'label', value: 'value' }, 3),
      },
    }
  },
  watch: {
    multiple({ rule }: any) {
      rule.key = uniqueId()
    },
  },
  props() {
    return [
      makeTreeOptionsRule({ to: 'props.data', label: 'label', value: 'value' }),
      { type: 'switch', field: 'multiple', title: '是否多选' },
      {
        type: 'switch',
        field: 'disabled',
        title: '是否禁用',
      },
      { type: 'switch', field: 'clearable', title: '是否可以清空选项' },
      {
        type: 'switch',
        field: 'collapseTags',
        title: '多选时是否将选中值按文字的形式展示',
      },
      {
        type: 'inputNumber',
        field: 'multipleLimit',
        title: '多选时用户最多可以选择的项目数，为 0 则不限制',
        props: { min: 0 },
      },
      { type: 'input', field: 'placeholder', title: '占位符' },
      {
        type: 'TableOptions',
        field: 'props',
        title: '配置选项',
        props: {
          column: [{ label: '键名', key: 'label' }, { label: '值', key: 'value' }],
          valueType: 'object',
        },
      },
      {
        type: 'switch',
        field: 'renderAfterExpand',
        title: '是否在第一次展开某个树节点后才渲染其子节点',
        value: true,
      },
      {
        type: 'switch',
        field: 'defaultExpandAll',
        title: '是否默认展开所有节点',
      },
      {
        type: 'switch',
        field: 'expandOnClickNode',
        title: '是否在点击节点的时候展开或者收缩节点',
        value: true,
      },
      {
        type: 'switch',
        field: 'checkOnClickNode',
        title: '是否在点击节点的时候选中节点',
      },
      {
        type: 'input',
        field: 'nodeKey',
        title: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      },
    ]
  },
}
