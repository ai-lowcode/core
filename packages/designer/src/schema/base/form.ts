import { Schema } from '@/types'

export default function form() {
  return <Array<Schema>>[
    {
      type: 'input',
      field: '>formName',
      value: '',
      title: '表单名称',
    },
    {
      type: 'radio',
      field: 'labelPosition',
      value: 'left',
      title: '标签的位置',
      options: [
        { value: 'left', label: '左对齐' },
        { value: 'right', label: '右对齐' },
        { value: 'top', label: '顶部' },
      ],
    },
    {
      type: 'radio',
      field: 'size',
      value: 'small',
      title: '表单的尺寸',
      options: [
        { value: 'large', label: '大' },
        { value: 'default', label: '默认' },
        { value: 'small', label: '小' },
      ],
    },
    {
      type: 'input',
      field: 'labelSuffix',
      value: '',
      title: '标签的后缀',
      style: {
        width: '150px',
      },
    },
    {
      type: 'SizeInput',
      field: 'labelWidth',
      value: '125px',
      title: '标签的宽度',
    },
    {
      type: 'switch',
      field: 'hideRequiredAsterisk',
      value: false,
      title: '隐藏必填字段的标签旁边的红色星号',
    },
    {
      type: 'switch',
      field: 'showMessage',
      value: true,
      title: '显示校验错误信息',
    },
    {
      type: 'switch',
      field: 'inlineMessage',
      value: false,
      title: '以行内形式展示校验信息',
    },
    {
      type: 'switch',
      field: '_submitBtn>show',
      value: true,
      title: '是否显示表单提交按钮',
    },
    {
      type: 'switch',
      field: '_resetBtn>show',
      value: false,
      title: '是否显示表单重置按钮',
    },
    {
      type: 'FnConfig',
      field: '>_event',
      info: {
        type: 'tooltip',
        native: true,
        effect: 'light',
        align: 'left',
        content: `帮助文档：<a target="_blank" href="https://form-create.com/v3/guide/global-event">https://form-create.com/v3/guide/global-event</a>`,
        rawContent: true,
      },
      value: {},
      col: { show: true },
      props: {
        eventConfig: [
          {
            name: 'onSubmit',
            args: ['formData', 'api'],
          },
          {
            name: 'onCreated',
            args: ['api'],
          },
          {
            name: 'onMounted',
            args: ['api'],
          },
          {
            name: 'onChange',
            args: ['field', 'value', 'options'],
          },
          {
            name: 'beforeFetch',
            args: ['config', 'data'],
          },
        ],
      },
      title: '表单事件',
    },
  ]
}
