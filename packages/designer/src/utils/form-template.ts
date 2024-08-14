export function formTemplate(json: any, options: any) {
  return `<template>
  <form-create
    v-model="formData"
    v-model:api="fapi"
    :rule="rule"
    :option="option"
    @submit="onSubmit"
  ></form-create>
</template>

<script>
import formCreate from "@form-create/element-ui";

export default {
  components: {
    formCreate: formCreate.$form()
  },
  data () {
    const option = formCreate.parseJson('${options.replaceAll('\\', '\\\\').replaceAll('\'', '\\')}');
    return {
      formData: {},
      fapi: null,
      rule: formCreate.parseJson('${json.replaceAll('\\', '\\\\').replaceAll('\'', '\\')}'),
      option: option
    }
  },
  methods: {
    onSubmit (formData) {
      //todo 提交表单
    }
  }
}
<\/script>`
}
