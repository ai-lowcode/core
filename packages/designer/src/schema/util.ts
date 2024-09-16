// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
const jsons = [
  {
    '名称': 'options',
    '说明': '提及选项列表',
    '类型': '^[array]`MentionOption[]`',
    '默认值': '[]',
    '': '',
  },
  {
    '名称': 'prefix',
    '说明': '触发字段的前缀。 字符串长度必须且只能为 1',
    '类型': '^[string] \\\\',
    '默认值': '^[array]`string[]`',
    '': '`\'@\'`',
  },
  {
    '名称': 'split',
    '说明': '用于拆分提及的字符。 字符串长度必须且只能为 1',
    '类型': '^[string]',
    '默认值': '`\' \'`',
    '': '',
  },
  {
    '名称': 'filter-option',
    '说明': '定制筛选器选项逻辑',
    '类型': '^[false] \\\\',
    '默认值': '^[Function]`(pattern: string, option: MentionOption) => boolean`',
    '': '-',
  },
  {
    '名称': 'placement',
    '说明': '设置弹出位置',
    '类型': '^[string]`\'bottom\' \\\\',
    '默认值': '\'top\'`',
    '': '`\'bottom\'`',
  },
  {
    '名称': 'show-arrow',
    '说明': '下拉菜单的内容是否有箭头',
    '类型': '^[boolean]',
    '默认值': '`false`',
    '': '',
  },
  {
    '名称': 'offset',
    '说明': '下拉面板偏移量',
    '类型': '^[number]',
    '默认值': '`0`',
    '': '',
  },
  {
    '名称': 'whole',
    '说明': '当退格键被按下做删除操作时，是否将提及部分作为整体删除',
    '类型': '^[boolean]',
    '默认值': '`false`',
    '': '',
  },
  {
    '名称': 'check-is-whole',
    '说明': '当退格键被按下做删除操作时，检查是否将提及部分作为整体删除',
    '类型': '^[Function]`(pattern: string, prefix: string) => boolean`',
    '默认值': '*',
    '': '',
  },
  {
    '名称': 'loading',
    '说明': '提及的下拉面板是否处于加载状态',
    '类型': '^[boolean]',
    '默认值': '`false`',
    '': '',
  },
  {
    '名称': 'model-value / v-model',
    '说明': '输入值',
    '类型': '^[string]',
    '默认值': '-',
    '': '',
  },
  {
    '名称': 'popper-class',
    '说明': '自定义浮层类名',
    '类型': '^[string]',
    '默认值': '*',
    '': '',
  },
  {
    '名称': 'popper-options',
    '说明': '[popper.js](https://popper.js.org/docs/v2/) 参数',
    '类型': '^[object] refer to [popper.js doc](https://popper.js.org/docs/v2/)',
    '默认值': '-',
    '': '',
  },
  {
    '名称': '[input props](./input.md#attributes)',
    '说明': '*',
    '类型': '-',
    '默认值': '*',
    '': '',
  },
]

function getJsonType(type) {
  if (type === '^[boolean]')
    return 'al-switch'
  if (type === '^[string]')
    return 'al-input'
  if (type === '^[number]')
    return 'al-input-number'
  if (type.includes('enum'))
    return 'al-select'
}

function parseMarkdownEnum(mdEnum) {
  // 移除 ^[enum] 前缀和外部反引号
  mdEnum = mdEnum.replace(/^\^?\[enum\]`?|`?$/g, '')

  // 解析枚举值，考虑转义字符
  let parts = mdEnum.split(/\s*\\\|\s*|\s*\|\s*/).map(part => part.trim().replace(/\\([|'])/g, '$1'))

  // 去掉每个部分中的单引号
  parts = parts.map(part => part.replace(/'/g, ''))
  const values = []
  const conditionalValues = {}
  parts.forEach((part) => {
    if (part.includes('(when')) {
      // 处理条件枚举
      const [value, condition] = part.split(/\s+\(when\s+/)
      const cleanValue = value.replace(/^'|'$/g, '')
      const cleanCondition = condition.replace(/\)$/, '')
      conditionalValues[cleanValue] = cleanCondition
    }
    else {
      // 处理普通枚举
      values.push(part.replace(/^'|'$/g, ''))
    }
  })

  return {
    type: 'enum',
    values,
    ...(Object.keys(conditionalValues).length > 0 && { conditionalValues }),
  }
}

const jsonList = []

function kebabToCamelCase(str) {
  // 处理空字符串或非字符串输入
  if (typeof str !== 'string' || str.length === 0) {
    return str
  }

  // 将字符串分割成单词数组
  const words = str.split(/[-_\s]+/)

  // 处理第一个单词（保持原样）
  const camelCase = words[0].toLowerCase()

  // 处理剩余的单词（首字母大写）
  return camelCase + words.slice(1).map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  ).join('')
}

jsons.map((json) => {
  const data = {
    type: 'al-form-item',
    id: kebabToCamelCase(json['名称']),
    props: {
      label: json['说明'],
    },
    children: [
      {
        type: getJsonType(json['类型']),
        id: kebabToCamelCase(json['名称']),
        field: `props.${kebabToCamelCase(json['名称'])}`,
        modelField: 'modelValue',
      },
    ],
  }
  if (json['类型'].includes('enum')) {
    // 使用 kebab-to-camel 转换的版本
    console.log(parseMarkdownEnum(json['类型']))
    const vv = []
    parseMarkdownEnum(json['类型'])?.values.map((v) => {
      vv.push({
        type: 'al-option',
        id: v,
        props: {
          label: v,
          value: v,
        },
      })
    })
    data.children[0].children = vv
  }
  jsonList.push(data)
})

console.log('jsons:::::::::::;', jsonList)
