<script>
import { deepCopy } from '@ai-lowcode/utils'
import { defineComponent } from 'vue'

import { localeOptions } from '../utils'
import { designerForm } from '../utils/form'

export default defineComponent({
  name: 'Validate',
  inject: ['designer'],
  props: {
    modelValue: Array,
  },
  components: {
    DragForm: designerForm.$form(),
  },
  data() {
    const t = this.designer.setupState.t
    const types = this.designer.setupState.activeRule?._menu?.validate || []
    const attrs = {
      string: t('validate.types.string'),
      array: t('validate.types.array'),
      number: t('validate.types.number'),
      integer: t('validate.types.integer'),
      float: t('validate.types.float'),
      object: t('validate.types.object'),
      date: t('validate.types.date'),
      url: t('validate.types.url'),
      email: t('validate.types.email'),
    }

    const getOpts = (lst) => {
      const opts = []
      lst && lst.forEach((k) => {
        opts.push({
          label: attrs[k],
          value: k,
        })
      })
      opts.push({
        label: t('props.custom'),
        value: 'validator',
      })
      return opts
    }
    const opts = getOpts(types)

    return {
      formValue: {},
      t,
      option: {
        form: {
          labelPosition: 'top',
          size: 'small',
          labelWidth: '90px',
        },
        submitBtn: false,
        appendValue: true,
        formData: this.parseValue(this.modelValue),
      },
      rule: [
        {
          type: 'group',
          field: 'validate',
          props: {
            expand: 1,
            sortBtn: false,
            defaultValue: { type: opts[0].value },
            rule: [
              {
                type: opts.length === 1 ? 'hidden' : 'select',
                field: 'type',
                value: '',
                title: t('validate.type'),
                props: {
                  placeholder: t('validate.typePlaceholder'),
                },
                control: [
                  {
                    value: ['url', 'date', 'email', 'object', 'validator'],
                    condition: 'notIn',
                    rule: ['mode', 'min', 'max', 'len', 'pattern'],
                  },
                  {
                    value: 'validator',
                    rule: ['validator'],
                  },
                ],
                options: opts,
              },
              {
                type: 'select',
                title: t('validate.trigger'),
                field: 'trigger',
                value: 'change',
                options: localeOptions(t, [
                  { label: 'blur', value: 'blur' },
                  { label: 'change', value: 'change' },
                  { label: 'submit', value: 'submit' },
                ]),
              },
              {
                type: 'FnEditor',
                field: 'validator',
                value: '',
                props: {
                  name: 'validator',
                  args: ['rule', 'value', 'callback'],
                  button: true,
                },
                style: 'height:300px;',
              },
              {
                type: 'select',
                title: t('validate.mode'),
                field: 'mode',
                options: [
                  { value: 'min', label: t('validate.modes.min') },
                  { value: 'max', label: t('validate.modes.max') },
                  { value: 'len', label: t('validate.modes.len') },
                  { value: 'pattern', label: t('validate.modes.pattern') },
                ],
                value: 'min',
                control: [
                  {
                    value: 'pattern',
                    rule: [
                      {
                        type: 'input',
                        field: 'pattern',
                        props: {
                          size: 'small',
                        },
                        title: t('validate.modes.pattern'),
                      },
                    ],
                  },
                  {
                    value: 'min',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'min',
                        title: t('validate.modes.min'),
                      },
                    ],
                  },
                  {
                    value: 'max',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'max',
                        title: t('validate.modes.max'),
                      },
                    ],
                  },
                  {
                    value: 'len',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'len',
                        title: t('validate.modes.len'),
                      },
                    ],
                  },
                ],
              },
              {
                type: 'input',
                title: t('validate.message'),
                field: 'message',
                value: '',
                children: [
                  {
                    type: 'span',
                    slot: 'append',
                    inject: true,
                    class: 'append-msg',
                    on: {
                      click: (inject) => {
                        const title = this.designer.setupState.activeRule.title
                        if (this.designer.setupState.activeRule) {
                          inject.api.setValue('message', t(inject.api.form.mode !== 'required' ? 'validate.autoMode' : 'validate.autoRequired', { title }))
                        }
                      },
                    },
                    children: [t('validate.auto')],
                  },
                ],
              },
            ],
          },
          value: [],
        },
      ],
    }
  },
  watch: {
    modelValue(n) {
      this.formValue = this.parseValue(n)
    },
  },
  methods: {
    onInput(field, value) {
      const validate = deepCopy(value)
      const modelValue = [];
      (validate || []).forEach((v) => {
        if (!v || !Object.keys(v).length) {
          return false
        }
        if (v.type === 'validator' && !v.validator) {
          return
        }
        const tmp = { ...v }
        if (!v.validator) {
          delete tmp.validator
        }
        modelValue.push(tmp)
      })
      this.$emit('update:modelValue', modelValue)
    },
    parseValue(n) {
      const val = {
        validate: n ? [...n] : [],
        type: n.length ? (n[0].type || 'string') : undefined,
      }
      val.validate.forEach((v) => {
        if (!v.mode) {
          Object.keys(v).forEach((k) => {
            if (!['message', 'type', 'trigger', 'mode'].includes(k)) {
              v.mode = k
            }
          })
        }
      })

      return val
    },
  },
})
</script>

<template>
  <DragForm
    class="_fd-validate" :rule="rule" :option="option" :model-value="formValue"
    @change="onInput"
  />
</template>

<style>
._fd-validate .append-msg {
    cursor: pointer;
}

._fd-validate .el-input-group__append {
    padding: 0 10px;
}
</style>
