import type { Schema } from '@ai-lowcode/core'
import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema } from '@/types'

const label = '上传'
const name = 'upload'
const icon = 'fluent:button-16-regular'

export const UploadSchema = <CompSchema>{
  menu: 'main',
  icon,
  label,
  name,
  schema: () => {
    return <Schema>{
      type: 'al-upload',
      id: `__${uniqueId()}`,
      icon,
      label,
      name,
    }
  },
  // 插槽
  slots: () => {},
  // 事件
  events: () => {},
  // 属性
  props: () => {
    return <Schema[]>[
      {
        type: 'al-form',
        id: 'al-form',
        field: 'props',
        modelField: 'modelValue',
        props: {
          labelWidth: 100,
          labelPosition: 'top',
          size: 'small',
        },
        children: [
          {
            type: 'al-form-item',
            id: 'action',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'action',
                field: 'props.action',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'headers',
            props: {},
            children: [
              {
                id: 'headers',
                field: 'props.headers',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'method',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'method',
                field: 'props.method',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'multiple',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'multiple',
                field: 'props.multiple',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'data',
            props: {},
            children: [
              {
                id: 'data',
                field: 'props.data',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'name',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'name',
                field: 'props.name',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'withCredentials',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'withCredentials',
                field: 'props.withCredentials',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'showFileList',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'showFileList',
                field: 'props.showFileList',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'drag',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'drag',
                field: 'props.drag',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'accept',
            props: {},
            children: [
              {
                type: 'al-input',
                id: 'accept',
                field: 'props.accept',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'crossorigin',
            props: {},
            children: [
              {
                type: 'al-select',
                id: 'crossorigin',
                field: 'props.crossorigin',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: '',
                    props: {
                      label: '',
                      value: '',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'anonymous',
                    props: {
                      label: 'anonymous',
                      value: 'anonymous',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'use-credentials',
                    props: {
                      label: 'use-credentials',
                      value: 'use-credentials',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onPreview',
            props: {},
            children: [
              {
                id: 'onPreview',
                field: 'props.onPreview',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onRemove',
            props: {},
            children: [
              {
                id: 'onRemove',
                field: 'props.onRemove',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onSuccess',
            props: {},
            children: [
              {
                id: 'onSuccess',
                field: 'props.onSuccess',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onError',
            props: {},
            children: [
              {
                id: 'onError',
                field: 'props.onError',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onProgress',
            props: {},
            children: [
              {
                id: 'onProgress',
                field: 'props.onProgress',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onChange',
            props: {},
            children: [
              {
                id: 'onChange',
                field: 'props.onChange',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'onExceed',
            props: {},
            children: [
              {
                id: 'onExceed',
                field: 'props.onExceed',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'beforeUpload',
            props: {},
            children: [
              {
                id: 'beforeUpload',
                field: 'props.beforeUpload',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'beforeRemove',
            props: {},
            children: [
              {
                id: 'beforeRemove',
                field: 'props.beforeRemove',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'fileList/VModel:fileList',
            props: {},
            children: [
              {
                id: 'fileList/VModel:fileList',
                field: 'props.fileList/VModel:fileList',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'listType',
            props: {},
            children: [
              {
                type: 'al-select',
                id: 'listType',
                field: 'props.listType',
                modelField: 'modelValue',
                children: [
                  {
                    type: 'al-option',
                    id: 'text',
                    props: {
                      label: 'text',
                      value: 'text',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'picture',
                    props: {
                      label: 'picture',
                      value: 'picture',
                    },
                  },
                  {
                    type: 'al-option',
                    id: 'picture-card',
                    props: {
                      label: 'picture-card',
                      value: 'picture-card',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'autoUpload',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'autoUpload',
                field: 'props.autoUpload',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'httpRequest',
            props: {},
            children: [
              {
                id: 'httpRequest',
                field: 'props.httpRequest',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'disabled',
            props: {},
            children: [
              {
                type: 'al-switch',
                id: 'disabled',
                field: 'props.disabled',
                modelField: 'modelValue',
              },
            ],
          },
          {
            type: 'al-form-item',
            id: 'limit',
            props: {},
            children: [
              {
                type: 'al-input-number',
                id: 'limit',
                field: 'props.limit',
                modelField: 'modelValue',
              },
            ],
          },
        ],
      },
    ]
  },
}
