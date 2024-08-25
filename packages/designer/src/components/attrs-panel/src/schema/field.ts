import { Schema } from '@/types'

export const FieldAttrsSchema = <Array<Schema>>[
  {
    type: 'el-form',
    id: 'el-form',
    field: 'field',
    modelField: 'modelValue',
    props: {
      labelWidth: 100,
      labelPosition: 'top',
      size: 'small',
    },
    children: [
      {
        type: 'el-form-item',
        id: 'id',
        props: {
          label: '字段id',
        },
        children: [
          {
            type: 'el-input',
            id: 'id',
            field: 'field.id',
            modelField: 'modelValue',
            props: {
              readonly: true,
              disabled: true,
            },
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'name',
        props: {
          label: '字段标识',
        },
        children: [
          {
            type: 'el-input',
            id: 'name',
            field: 'field.name',
            modelField: 'modelValue',
            props: {
              readonly: true,
              disabled: true,
            },
          },
        ],
      },
      {
        type: 'el-form-item',
        id: 'label',
        props: {
          label: '字段标题',
        },
        children: [
          {
            type: 'el-input',
            id: 'label',
            field: 'field.label',
            modelField: 'modelValue',
            props: {
              readonly: true,
              disabled: true,
            },
          },
        ],
      },
    ],
  },
]
