import { Schema } from '@/types'

export default function field() {
  return <Array<Schema>>[
    {
      type: 'FieldInput',
      field: 'field',
      value: '',
      title: '字段 ID',
    },
    {
      type: 'input',
      field: 'title',
      value: '',
      title: '字段名称',
    },
    {
      type: 'input',
      field: 'info',
      value: '',
      title: '提示信息',
    },
    {
      type: 'SizeInput',
      field: 'formCreateWrap>labelWidth',
      value: '',
      title: '标签的宽度',
    },
    {
      type: 'Struct',
      field: '_control',
      value: [],
      title: '联动数据',
      info: {
        type: 'tooltip',
        native: true,
        effect: 'light',
        align: 'left',
        content: `帮助文档：`,
        rawContent: true,
      },
      props: {
        defaultValue: [],
        validate(val: any) {
          if (!Array.isArray(val))
            return false
          if (!val.length)
            return true
          return !val.some(({ rule }) => {
            return !Array.isArray(rule)
          })
        },
      },
    },
  ]
}
