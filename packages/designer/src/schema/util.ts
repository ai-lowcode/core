// eslint-disable-next-line ts/ban-ts-comment
// @ts-nocheck
const jsons = [
  {
    属性名: 'data',
    说明: '展示数据',
    类型: 'array',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'empty-text',
    说明: '内容为空的时候展示的文本',
    类型: 'string',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'node-key',
    说明: '每个树节点用来作为唯一标识的属性，整棵树应该是唯一的',
    类型: 'string',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'props',
    说明: '配置选项，具体看下表',
    类型: 'object',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'render-after-expand',
    说明: '是否在第一次展开某个树节点后才渲染其子节点',
    类型: 'boolean',
    可选值: '—',
    默认值: 'true',
  },
  {
    属性名: 'load',
    说明: '加载子树数据的方法，仅当 lazy 属性为true 时生效',
    类型: 'function(node, resolve, reject)',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'render-content',
    说明: '树节点的内容区的渲染 Function',
    类型: 'Function(h, `{ node, data, store }`)',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'highlight-current',
    说明: '是否高亮当前选中节点，默认值是 false。',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'default-expand-all',
    说明: '是否默认展开所有节点',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'expand-on-click-node',
    说明: '是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。',
    类型: 'boolean',
    可选值: '—',
    默认值: 'true',
  },
  {
    属性名: 'check-on-click-node',
    说明: '是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'auto-expand-parent',
    说明: '展开子节点的时候是否自动展开父节点',
    类型: 'boolean',
    可选值: '—',
    默认值: 'true',
  },
  {
    属性名: 'default-expanded-keys',
    说明: '默认展开的节点的 key 的数组',
    类型: 'array',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'show-checkbox',
    说明: '节点是否可被选择',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'check-strictly',
    说明: '在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'default-checked-keys',
    说明: '默认勾选的节点的 key 的数组',
    类型: 'array',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'current-node-key',
    说明: '当前选中的节点',
    类型: 'string / number',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'filter-node-method',
    说明: '对树节点进行筛选时执行的方法， 返回 `false` 则表示这个节点会被隐藏',
    类型: 'Function(value, data, node)',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'accordion',
    说明: '是否每次只打开一个同级树节点展开',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'indent',
    说明: '相邻级节点间的水平缩进，单位为像素',
    类型: 'number',
    可选值: '—',
    默认值: '18',
  },
  {
    属性名: 'icon',
    说明: '自定义树节点图标组件',
    类型: '`string \\| Component`',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'lazy',
    说明: '是否懒加载子节点，需与 load 方法结合使用',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'draggable',
    说明: '是否开启拖拽节点功能',
    类型: 'boolean',
    可选值: '—',
    默认值: 'false',
  },
  {
    属性名: 'allow-drag',
    说明: '判断节点能否被拖拽 如果返回 `false` ，节点不能被拖动',
    类型: 'Function(node)',
    可选值: '—',
    默认值: '—',
  },
  {
    属性名: 'allow-drop',
    说明: '拖拽时判定目标节点能否成为拖动目标位置。 如果返回 `false` ，拖动节点不能被拖放到目标节点。 `type` 参数有三种情况：\'prev\'、\'inner\' 和 \'next\'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后',
    类型: 'Function(draggingNode, dropNode, type)',
    可选值: '—',
    默认值: '—',
  },
]

function getJsonType(type) {
  if (type.includes('boolean'))
    return 'al-switch'
  if (type.includes('string'))
    return 'al-input'
  if (type.includes('number'))
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
    id: kebabToCamelCase(json['属性名']),
    props: {
      label: json['说明'],
    },
    children: [
      {
        type: getJsonType(json['类型']),
        id: kebabToCamelCase(json['属性名']),
        field: `props.${kebabToCamelCase(json['属性名'])}`,
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
