import { ActionBarSchema } from '@/schema/element-plus/action-bar'
import { ButtonSchema } from '@/schema/element-plus/button/schema.ts'
import { ColorPickerSchema } from '@/schema/element-plus/color-picker'
import { DialogSchema } from '@/schema/element-plus/dialog'
import { FormItemSchema, FormSchema } from '@/schema/element-plus/form'
import { InputSchema } from '@/schema/element-plus/input/index.ts'
import { PaginationSchema } from '@/schema/element-plus/pagination'
import { QueryBarSchema } from '@/schema/element-plus/query-bar'
import { TableSchema } from '@/schema/element-plus/table'
import { TextSchema } from '@/schema/element-plus/text'
import { CompSchema } from '@/types'

// 拖拽组件列表
const componentSchemaList: Array<CompSchema> = [
  InputSchema,
  ButtonSchema,
  FormSchema,
  FormItemSchema,
  TableSchema,
  TextSchema,
  PaginationSchema,
  DialogSchema,
  ColorPickerSchema,
  ActionBarSchema,
  QueryBarSchema,
]

const jsons = [
  {
    属性名: 'disabled',
    说明: '是否禁用',
    类型: '^[boolean]',
    默认值: 'false',
  },
  {
    属性名: 'size',
    说明: '尺寸',
    类型: '^[enum]`\'large\' \\| \'default\' \\| \'small\'`',
    默认值: '—',
  },
  {
    属性名: 'show-alpha',
    说明: '是否支持透明度选择',
    类型: '^[boolean]',
    默认值: 'false',
  },
  {
    属性名: 'color-format',
    说明: '写入 v-model 的颜色的格式',
    类型: '^[enum]`\'hsl\' \\| \'hsv\' \\| \'hex\' \\| \'rgb\' \\| \'hex\' (when show-alpha is false) \\| \'rgb\' (when show-alpha is true)`',
    默认值: '—',
  },
  {
    属性名: 'popper-class',
    说明: 'ColorPicker 下拉框的类名',
    类型: '^[string]',
    默认值: '—',
  },
  {
    属性名: 'predefine',
    说明: '预定义颜色',
    类型: '^[object]`string[]`',
    默认值: '—',
  },
  {
    属性名: 'validate-event',
    说明: '输入时是否触发表单的校验',
    类型: '^[boolean]',
    默认值: 'true',
  },
  {
    属性名: 'tabindex',
    说明: 'ColorPicker 的 tabindex',
    类型: '^[string] / ^[number]',
    默认值: '0',
  },
  {
    属性名: 'label ^(a11y) ^(deprecated)',
    说明: 'ColorPicker 的 aria-label',
    类型: '^[string]',
    默认值: '—',
  },
  {
    属性名: 'aria-label ^(a11y) ^(2.7.2)',
    说明: 'ColorPicker 的 aria-label',
    类型: '^[string]',
    默认值: '—',
  },
  {
    属性名: 'id',
    说明: 'ColorPicker 的 id',
    类型: '^[string]',
    默认值: '—',
  },
  {
    属性名: 'teleported ^(2.7.2)',
    说明: '是否将 popover 的下拉列表渲染至 body 下',
    类型: '^[boolean]',
    默认值: 'true',
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

export default componentSchemaList
