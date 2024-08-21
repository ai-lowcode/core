import { upper } from '@/utils'

export function makeOptionsRule(to: any) {
  const options = [
    { label: '静态数据', value: 2 },
    { label: '远程数据', value: 1 },
  ]

  const control = [
    {
      value: 1,
      rule: [
        {
          type: 'FetchConfig',
          field: 'formCreateEffect>fetch',
          props: {
            to,
          },
        },
      ],
    },
    {
      value: 2,
      rule: [
        {
          type: 'TableOptions',
          field: `formCreate${upper(to).replace('.', '>')}`,
          props: {
            keyValue: 'label',
          },
        },
      ],
    },
  ]

  return {
    type: 'radio',
    title: '选项数据',
    field: '_optionType',
    value: 2,
    options,
    props: {
      type: 'button',
    },
    control,
  }
}
