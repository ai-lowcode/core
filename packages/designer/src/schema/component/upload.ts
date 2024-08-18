import { uniqueId } from '@ai-lowcode/utils'

import { CompSchema, Schema } from '@/types'

const label = '上传'
const name = 'upload'

export default <CompSchema>{
  menu: 'main',
  icon: 'icon-upload',
  label,
  name,
  event: ['change', 'remove'],
  validate: ['array'],
  schema: () => {
    return <Schema>{
      type: name,
      field: uniqueId(),
      title: '上传',
      info: '',
      $required: false,
      props: {
        action: '/',
        onSuccess(res: any, file: any) { file.url = res.data.url },
      },
    }
  },
  props: () => {
    return <Schema[]>[
      {
        type: 'switch',
        field: 'disabled',
        title: '显示类型',
      },
      {
        type: 'select',
        field: 'listType',
        title: '上传类型',
        value: 'text',
        options: [
          { label: '文字', value: 'text' },
          {
            label: '图片',
            value: 'picture',
          },
          {
            label: '卡片',
            value: 'picture-card',
          },
        ],
      },
      { type: 'switch', field: 'multiple', title: '是否支持多选文件' },
      {
        type: 'input',
        field: 'action',
        title: '上传的地址(必填)',
      },
      {
        type: 'FnEditor',
        field: 'onSuccess',
        title: '上传成功回调',
        info: '在onSuccess方法中将接口返回的url赋值给file.url',
        props: {
          args: ['res', 'file'],
          name: 'onSuccess',
          button: true,
        },
      },
      {
        type: 'TableOptions',
        field: 'headers',
        title: '设置上传的请求头部',
        props: {
          column: [{ label: '键名', key: 'label' }, { label: '值', key: 'value' }],
          valueType: 'object',
        },
      },
      {
        type: 'TableOptions',
        field: 'data',
        title: '上传时附带的额外参数',
        props: {
          column: [{ label: '键名', key: 'label' }, { label: '值', key: 'value' }],
          valueType: 'object',
        },
      },
      { type: 'input', field: 'name', title: '上传的文件字段名' },
      {
        type: 'switch',
        field: 'withCredentials',
        title: '支持发送 cookie 凭证信息',
      },
      { type: 'input', field: 'accept', title: '接受上传的文件类型' },
      {
        type: 'switch',
        field: 'autoUpload',
        title: '是否在选取文件后立即进行上传',
        value: true,
      },
      {
        type: 'inputNumber',
        field: 'limit',
        title: '最大允许上传个数',
        props: { min: 0 },
      },
    ]
  },
}
