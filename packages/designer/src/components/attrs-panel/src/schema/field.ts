import type { Schema } from '@zero-dim/core'

export function FieldAttrsSchema(changeFieldData: Function) {
  return <Array<Schema>>[
    {
      type: 'al-form',
      id: 'al-form',
      field: 'field',
      modelField: 'modelValue',
      props: {
        labelWidth: 100,
        labelPosition: 'top',
        size: 'small',
      },
      children: [
        {
          type: 'al-form-item',
          id: 'id',
          props: {
            label: '字段id',
          },
          children: [
            {
              type: 'al-input',
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
          type: 'al-form-item',
          id: 'name',
          props: {
            label: '字段标识',
          },
          children: [
            {
              type: 'al-input',
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
          type: 'al-form-item',
          id: 'label',
          props: {
            label: '字段标题',
          },
          children: [
            {
              type: 'al-input',
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
        {
          type: 'al-form-item',
          id: 'field',
          props: {
            label: 'v-model 绑定字段',
          },
          children: [
            {
              type: 'al-input',
              id: 'field',
              field: 'field.field',
              modelField: 'modelValue',
              events: {
                onBlur: changeFieldData,
              },
            },
          ],
        },
      ],
    },
  ]
}
