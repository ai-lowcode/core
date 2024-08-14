<script lang="ts" setup name="FetchConfig">
import { AlBadge, AlButton, AlContainer, AlDialog, AlMessage, AlTabPane, AlTabs } from '@ai-lowcode/element-plus'
import { deepCopy, isEmpty } from '@ai-lowcode/utils'

import { computed, onMounted, ref, watch } from 'vue'

import FnEditor from './fn-editor.vue'

import { designerForm } from '@/designer'

const props = defineProps<{
  modelValue: [object, string]
  to: string
}>()

const emits = defineEmits(['update:modelValue'])

const DragFormView = designerForm.$form()

const parseRef = ref()
const errorRef = ref()
const visible = ref(false)
const value = ref(deepCopy(props.modelValue || {}))
const form = ref<any>({
  api: {},
  formData: {},
  rule: [],
  options: {
    form: {
      labelWidth: '90px',
      size: 'default',
    },
    submitBtn: false,
    resetBtn: false,
  },
})

function makeRule() {
  return [
    {
      type: 'input',
      field: 'action',
      title: '请求链接',
      value: '',
      props: { size: 'default' },
      validate: [{ required: true, message: '请输入正确的链接', trigger: 'blur' }],
    },
    {
      type: 'radio',
      field: 'method',
      title: '请求方式',
      value: 'GET',
      props: {
        size: 'default',
      },
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
      ],
      $required: true,
    },
    {
      type: 'TableOptions',
      field: 'headers',
      title: '请求头部',
      value: {},
      props: {
        column: [{ label: '键名', key: 'label' }, { label: '值', key: 'value' }],
        valueType: 'object',
        size: 'default',
      },
    },
    {
      type: 'TableOptions',
      field: 'data',
      title: '附带数据',
      value: {},
      props: {
        column: [{ label: '键名', key: 'label' }, { label: '值', key: 'value' }],
        valueType: 'object',
        size: 'default',
      },
    },
  ]
}

function active() {
  const formData = value.value
  form.value.rule = formData.type === 'static' ? [] : makeRule()
  form.value.formData = { ...formData }
  form.value.label = formData.label
  form.value.type = formData.type
  form.value.data = formData.data
  form.value.parse = formData.parse || ''
  form.value.onError = formData.onError || ''
}

function save() {
  form.value.api.validate().then(() => {
    const formData = { ...form.value.formData }
    if ((parseRef.value && !parseRef.value.save()) || (errorRef.value && !errorRef.value.save())) {
      return
    }
    formData.parse = form.value.parse
    formData.onError = form.value.onError
    formData.label = form.value.label
    formData.type = form.value.type
    formData.to = props.to || 'options'
    emits('update:modelValue', formData)
    visible.value = false
  }).catch((err: any) => {
    console.error(err)
    AlMessage.error(err[Object.keys(err)[0]][0].message)
  })
}

const configured = computed(() => !isEmpty(props.modelValue))

watch(() => visible, (v) => {
  if (v) {
    value.value = deepCopy(props.modelValue || {})
  }
})

onMounted(() => {
  active()
})
</script>

<template>
  <div class="_fd-gfc">
    <AlBadge type="warning" is-dot :hidden="!configured">
      <AlButton size="small" @click="visible = true">
        编辑数据
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" class="_fd-gfc-dialog" title="远程数据" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <AlContainer class="_fd-gfc-con" style="height: 450px;">
        <AlTabs model-value="first" class="_fc-tabs" style="width: 100%">
          <AlTabPane label="请求配置" name="first">
            <DragFormView
              v-model:api="form.api" v-model="form.formData" :rule="form.rule"
              :option="form.options"
            />
          </AlTabPane>
          <AlTabPane lazy label="数据处理" name="second">
            <FnEditor
              ref="parseRef" v-model="form.parse" style="height: 415px;"
              name="parse"
              :args="[{ name: 'res', info: '接口返回的数据' }]"
            />
          </AlTabPane>
          <AlTabPane lazy label="错误处理" name="third">
            <FnEditor
              ref="errorRef" v-model="form.onError" style="height: 415px;"
              name="onError"
              :args="['e']"
            />
          </AlTabPane>
        </AlTabs>
      </AlContainer>
      <template #footer>
        <div>
          <AlButton size="default" @click="visible = false">
            取消
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="save">
            确定
          </AlButton>
        </div>
      </template>
    </AlDialog>
  </div>
</template>

<style>
._fd-gfc, ._fd-gfc .el-badge {
    width: 100%;
}

._fd-gfc .el-button {
    width: 100%;
    font-weight: 400;
    color: #2E73FF;
    border-color: #2E73FF;
}

._fd-gfc-dialog .el-tabs__header {
    margin-bottom: 0;
}

._fd-gfc-dialog .form-create {
    margin-top: 15px;
}

._fd-gfc-con .CodeMirror {
    width: 100%;
    height: 100%;
}

._fd-gfc-con .CodeMirror-wrap pre.CodeMirror-line {
    padding-left: 20px;
}
</style>
