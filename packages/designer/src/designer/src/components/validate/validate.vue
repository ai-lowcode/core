<script>
import { deepCopy } from '@ai-lowcode/utils'
import { defineComponent } from 'vue'

import { designerForm } from '@/designer/index.ts'

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
    const types = this.designer.setupState.activeRule?._menu?.validate || []
    const attrs = {
      string: '字符串',
      array: '多选',
      number: '数字',
      integer: '整数',
      float: '小数',
      object: '合集',
      date: '日期',
      url: 'URL链接',
      email: '邮箱地址',
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
        label: '自定义',
        value: 'validator',
      })
      return opts
    }
    const opts = getOpts(types)

    return {
      formValue: {},
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
                title: '字段类型',
                props: {
                  placeholder: '请选择',
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
                title: '触发方式',
                field: 'trigger',
                value: 'change',
                options: [
                  { label: '失去焦点', value: 'blur' },
                  { label: '改变', value: 'change' },
                  { label: '提交', value: 'submit' },
                ],
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
                title: '验证方式',
                field: 'mode',
                options: [
                  { value: 'min', label: '最小值' },
                  { value: 'max', label: '最大值' },
                  { value: 'len', label: '长度' },
                  { value: 'pattern', label: '正则表达式' },
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
                        title: '正则表达式',
                      },
                    ],
                  },
                  {
                    value: 'min',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'min',
                        title: '最小值',
                      },
                    ],
                  },
                  {
                    value: 'max',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'max',
                        title: '最大值',
                      },
                    ],
                  },
                  {
                    value: 'len',
                    rule: [
                      {
                        type: 'inputNumber',
                        field: 'len',
                        title: '长度',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'input',
                title: '错误信息',
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
                          inject.api.setValue('message', inject.api.form.mode !== 'required' ? '请输入正确的{title}' : '请输入{title}', { title })
                        }
                      },
                    },
                    children: ['自动获取'],
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
