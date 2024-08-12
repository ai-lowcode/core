import { uniqueId } from '@ai-lowcode/utils'

import { localeOptions, localeProps } from '../../utils'

import { DragRule } from '@/designer'

const label = '上传'
const name = 'upload'

export default <DragRule>{
  menu: 'main',
  icon: 'icon-upload',
  label,
  name,
  event: ['change', 'remove'],
  validate: ['array'],
  rule({ t }: any) {
    return {
      type: name,
      field: uniqueId(),
      title: t('com.upload.name'),
      info: '',
      $required: false,
      props: {
        action: '/',
        onSuccess(res: any, file: any) { file.url = res.data.url },
      },
    }
  },
  props(_: any, { t }: any) {
    return localeProps(t, `${name}.props`, [{
      type: 'switch',
      field: 'disabled',
    }, {
      type: 'select',
      field: 'listType',
      value: 'text',
      options: localeOptions(t, [{ label: 'text', value: 'text' }, {
        label: 'picture',
        value: 'picture',
      }, {
        label: 'picture-card',
        value: 'picture-card',
      }]),
    }, { type: 'switch', field: 'multiple' }, {
      type: 'input',
      field: 'action',
    }, {
      type: 'FnEditor',
      field: 'onSuccess',
      info: t('com.upload.info'),
      props: {
        args: ['res', 'file'],
        name: 'onSuccess',
        button: true,
      },
    }, {
      type: 'TableOptions',
      field: 'headers',
      props: {
        column: [{ label: t('props.key'), key: 'label' }, { label: t('props.value'), key: 'value' }],
        valueType: 'object',
      },
    }, {
      type: 'TableOptions',
      field: 'data',
      props: {
        column: [{ label: t('props.key'), key: 'label' }, { label: t('props.value'), key: 'value' }],
        valueType: 'object',
      },
    }, { type: 'input', field: 'name' }, {
      type: 'switch',
      field: 'withCredentials',
    }, { type: 'input', field: 'accept' }, {
      type: 'switch',
      field: 'autoUpload',
      value: true,
    }, {
      type: 'inputNumber',
      field: 'limit',
      props: { min: 0 },
    }])
  },
}
