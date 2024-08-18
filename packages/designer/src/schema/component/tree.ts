import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

import { makeTreeOptions, makeTreeOptionsRule } from '@/utils'

const label = '树形控件'
const name = 'tree'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-tree',
  label,
  name,
  event: ['nodeClick', 'nodeContextmenu', 'checkChange', 'check', 'currentChange', 'nodeExpand', 'nodeCollapse', 'nodeDragStart', 'nodeDragEnter', 'nodeDragLeave', 'nodeDragOver', 'nodeDragEnd', 'nodeDrop'],
  validate: ['string', 'number', 'array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '树形控件',
      info: '',
      effect: {
        fetch: '',
      },
      $required: false,
      props: {
        props: {
          label: 'label',
        },
        showCheckbox: true,
        nodeKey: 'id',
        data: makeTreeOptions('选项', { label: 'label', value: 'id' }, 3),
      },
    }
  },
  props: () => {
    return <Schema[]>[
      makeTreeOptionsRule({ to: 'props.data', label: 'label', value: 'id' }),
      { type: 'input', field: 'emptyText', title: '内容为空的时候展示的文本' },
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
        title: '是否在点击节点的时候展开或者收缩节点，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
        value: true,
      },
      {
        type: 'switch',
        field: 'checkOnClickNode',
        title: '是否在点击节点的时候选中节点',
      },
      { type: 'switch', field: 'autoExpandParent', title: '展开子节点的时候是否自动展开父节点', value: true },
      {
        type: 'switch',
        field: 'checkStrictly',
        title: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法',
      },
      { type: 'switch', field: 'accordion', title: '是否每次只打开一个同级树节点展开' },
      {
        type: 'inputNumber',
        field: 'indent',
        title: '相邻级节点间的水平缩进(px)',
      },
      {
        type: 'input',
        field: 'nodeKey',
        title: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
      },
    ]
  },
}
