import { Schema } from '@/types'

export const FieldAttrsSchema = <Array<Schema>>[
  {
    type: 'el-form',
    id: 'el-form',
    props: {
      label: '是否禁用',
      labelWidth: 100,
    },
    children: [
      {
        type: 'el-form-item',
        id: 'disabled',
        props: {
          label: '字段 ID',
        },
        children: [
          {
            type: 'FieldInput',
            field: 'field',
            value: '',
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'readonly',
        props: {
          label: '字段名称',
        },
        children: [
          {
            type: 'el-input',
            field: 'title',
            value: '',
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'maxlength',
        props: {
          label: '提示信息',
        },
        children: [
          {
            type: 'el-input',
            field: 'info',
            value: '',
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'minlength',
        props: {
          label: '标签的宽度',
        },
        children: [
          {
            type: 'SizeInput',
            field: 'formCreateWrap>labelWidth',
            value: '',
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'placeholder',
        props: {
          label: '联动数据',
        },
        children: [
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
        ],
      },
    ],
  },
]
