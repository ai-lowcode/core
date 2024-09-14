<script lang="ts" setup>
import { AlButton, AlForm, AlFormItem, AlInput, AlRadioButton, AlRadioGroup } from '@ai-lowcode/element-plus'
import { onMounted, ref } from 'vue'

import { AlCodeEditorAtom } from '@/atoms'

defineOptions({
  name: 'AlDataSourceAtom',
})

const props = defineProps<{
  confirmChange: Function
  cancelChange: Function
  exposeApi: any
  modelValue: any
}>()

const emits = defineEmits(['update:modelValue'])

const requestRef = ref()

const dataSource = ref()

// 编辑器选项
const editorOptions = ref({
  mode: 'application/javascript',
  theme: 'default', // 主题
  matchBrackets: true, // 括号匹配
  autoCloseBrackets: true, // 自动补齐
  styleActiveLine: true, // line选择是是否高亮
  lineNumbers: true, // 是否显示行数
  lineWrapping: true, // 是否自动换行
  readOnly: false,
  matchTags: { bothTags: true }, // 将突出显示光标周围的标签
  lint: true,
  foldGutter: true, // 可将对象折叠，与下面的gutters一起使用
  gutters: ['CodeMirror-foldgutter'],
  hintOptions: {
    completeSingle: false,
  }, // 提示配置
})

const dataType = ref('staticData')

const modifyRequestForm = ref({
  name: '',
  url: '',
  method: 'get',
  header: {},
  params: {},
})

function handleSave() {
  emits('update:modelValue', {
    dataSource: dataSource.value,
    dataType: dataType.value,
    modifyRequestForm: modifyRequestForm.value,
  })
  props?.confirmChange?.()
}

function cancel() {
  props?.cancelChange?.()
}

onMounted(() => {
  dataType.value = props.modelValue?.dataType
  dataSource.value = props.modelValue?.dataSource
  modifyRequestForm.value = props.modelValue?.modifyRequestForm
})
</script>

<template>
  <div class="flex flex-col">
    <AlRadioGroup v-model="dataType" class="mb-4">
      <AlRadioButton label="静态数据" value="staticData" />
      <AlRadioButton label="数据源" value="dataSource" />
      <AlRadioButton label="自定义接口" value="modifyApi" />
    </AlRadioGroup>
    <AlCodeEditorAtom
      v-if="dataType === 'staticData'"
      v-model="dataSource"
      style="height: calc(100vh - 290px)"
      :option="editorOptions"
    />
    <div v-if="dataType === 'modifyApi'">
      <AlForm
        ref="requestRef"
        style="max-width: 600px"
        :model="modifyRequestForm"
        status-icon
        label-width="auto"
        class="demo-ruleForm"
      >
        <AlFormItem label="名称" prop="name" required>
          <AlInput v-model="modifyRequestForm.name" type="text" autocomplete="off" />
        </AlFormItem>
        <AlFormItem label="请求地址" prop="url" required>
          <AlInput v-model="modifyRequestForm.url" type="text" autocomplete="off" />
        </AlFormItem>
        <AlFormItem label="请求方法" prop="method" required>
          <AlRadioGroup v-model="modifyRequestForm.method">
            <AlRadioButton label="GET" value="get" />
            <AlRadioButton label="POST" value="post" />
            <AlRadioButton label="PUT" value="put" />
            <AlRadioButton label="DELETE" value="delete" />
          </AlRadioGroup>
        </AlFormItem>
        <AlFormItem label="请求头" prop="header">
          <AlInput v-model="modifyRequestForm.header" type="text" autocomplete="off" />
        </AlFormItem>
        <AlFormItem label="请求参数" prop="params">
          <AlInput v-model="modifyRequestForm.params" type="text" autocomplete="off" />
        </AlFormItem>
      </AlForm>
    </div>
    <div class="flex justify-end mt-4">
      <AlButton @click="cancel">
        取消
      </AlButton>
      <AlButton type="primary" @click="handleSave">
        确定
      </AlButton>
    </div>
  </div>
</template>
