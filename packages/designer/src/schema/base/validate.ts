import { Schema } from '@/types'

export default function validate() {
  return <Array<Schema>>[
    {
      type: 'Required',
      field: '$required',
      title: '是否必填',
    },
    {
      type: 'validate',
      field: 'validate',
      title: '验证规则',
      value: [],
    },
  ]
}
