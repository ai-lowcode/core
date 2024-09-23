<script lang="ts" setup>
import { AlButton, AlForm, AlFormItem, AlInput, AlRadioButton, AlRadioGroup } from '@ai-lowcode/element-plus'
import { onMounted, ref } from 'vue'

import { AlCodeEditorAtom } from '@/atoms'
import AlObjectAtom from '@/atoms/object/index.vue'

defineOptions({
  name: 'AlDataSourceAtom',
})

const props = defineProps<{
  confirmChange: Function
  cancelChange: Function
  exposeApi: any
  modelValue: any
}>()

const emits = defineEmits(['update:modelValue', 'change'])

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
  header: [],
  params: [],
  handleData: '',
})

function handleSave() {
  emits('update:modelValue', {
    dataSource: dataSource.value,
    dataType: dataType.value,
    modifyRequestForm: modifyRequestForm.value,
  })
  props?.confirmChange?.()
  emits('change')
}

function cancel() {
  props?.cancelChange?.()
}

onMounted(() => {
  props.modelValue?.dataType && (dataType.value = props.modelValue?.dataType)
  props.modelValue?.dataSource && (dataSource.value = props.modelValue?.dataSource)
  props.modelValue?.modifyRequestForm && (modifyRequestForm.value = props.modelValue?.modifyRequestForm)
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
          <AlObjectAtom v-model="modifyRequestForm.header" />
        </AlFormItem>
        <AlFormItem label="请求参数" prop="params">
          <AlObjectAtom v-model="modifyRequestForm.params" />
        </AlFormItem>
        <AlFormItem label="请求结果处理" prop="params">
          <AlCodeEditorAtom
            v-model="modifyRequestForm.handleData"
            style="height: 200px"
            :option="editorOptions"
          />
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
