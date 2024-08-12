export default function validate({ t }: any) {
  return [
    {
      type: 'Required',
      field: '$required',
      title: t('validate.required'),
    },
    {
      type: 'validate',
      field: 'validate',
      title: t('validate.rule'),
      value: [],
    },
  ]
}
