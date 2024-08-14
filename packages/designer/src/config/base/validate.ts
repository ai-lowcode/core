export default function validate() {
  return [
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
