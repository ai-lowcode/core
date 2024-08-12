<script lang="ts" setup name="FetchConfig">
import { AlBadge, AlButton, AlContainer, AlDialog, AlTabPane, AlTabs } from '@ai-lowcode/element-plus'
import { deepCopy, isEmpty } from '@ai-lowcode/utils'

import { computed, inject, onMounted, ref, watch } from 'vue'

import errorMessage from '../utils/message'

// import FnEditor from './FnEditor.vue'

const props = defineProps<{
  modelValue: [object, string]
  to: string
}>()

const emits = defineEmits(['update:modelValue'])
const designer = inject<any>('designer', null)
const t = computed(() => designer.setupState.t)

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

function makeRule(t: any) {
  return [
    {
      type: 'input',
      field: 'action',
      title: t('fetch.action'),
      value: '',
      props: { size: 'default' },
      validate: [{ required: true, message: t('fetch.actionRequired'), trigger: 'blur' }],
    },
    {
      type: 'radio',
      field: 'method',
      title: t('fetch.method'),
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
      title: t('fetch.headers'),
      value: {},
      props: {
        column: [{ label: t('props.key'), key: 'label' }, { label: t('props.value'), key: 'value' }],
        valueType: 'object',
        size: 'default',
      },
    },
    {
      type: 'TableOptions',
      field: 'data',
      title: t('fetch.data'),
      value: {},
      props: {
        column: [{ label: t('props.key'), key: 'label' }, { label: t('props.value'), key: 'value' }],
        valueType: 'object',
        size: 'default',
      },
    },
  ]
}

function active() {
  const formData = value.value
  form.value.rule = formData.type === 'static' ? [] : makeRule(t.value)
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
    errorMessage(err[Object.keys(err)[0]][0].message)
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
        {{ t('struct.title') }}
      </AlButton>
    </AlBadge>
    <AlDialog
      v-model="visible" class="_fd-gfc-dialog" :title="t('fetch.optionsType.fetch')" destroy-on-close
      :close-on-click-modal="false"
      append-to-body
      width="980px"
    >
      <AlContainer class="_fd-gfc-con" style="height: 450px;">
        <AlTabs model-value="first" class="_fc-tabs" style="width: 100%">
          <AlTabPane :label="t('fetch.config')" name="first">
            <DragForm
              v-model:api="form.api" v-model="form.formData" :rule="form.rule"
              :option="form.options"
            />
          </AlTabPane>
          <AlTabPane lazy :label="t('fetch.parse')" name="second">
            <FnEditor
              ref="parseRef" v-model="form.parse" style="height: 415px;"
              name="parse"
              :args="[{ name: 'res', info: t('fetch.response') }]"
            />
          </AlTabPane>
          <AlTabPane lazy :label="t('fetch.onError')" name="third">
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
            {{ t('props.cancel') }}
          </AlButton>
          <AlButton type="primary" size="default" color="#2f73ff" @click="save">
            {{
              t('props.ok')
            }}
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
