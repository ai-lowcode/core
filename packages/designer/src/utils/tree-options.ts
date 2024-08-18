export function upper(str: any) {
  return str.replace(str[0], str[0].toLocaleUpperCase())
}

export function makeTreeOptions(pre: any, config: any, level: any, data: any = []) {
  if (!config.id) {
    config.id = 1
  }
  level && level--
  for (let i = 0; i < 3; i++) {
    const item: any = {
      [config.label]: pre + level * 10 + i,
      [config.value]: `${config.id++}`,
    }
    if (level) {
      makeTreeOptions(pre, config, level, item.children = [])
    }
    data.push(item)
  }
  return data
}

export function makeTreeOptionsRule({ to, label, value }: any) {
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
          type: 'TreeOptions',
          field: `formCreate${upper(to).replace('.', '>')}`,
          props: {
            columns: {
              label,
              value,
            },
            keyValue: label,
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
