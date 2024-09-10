<script lang="ts" setup>
import { AlRadioButton, AlRadioGroup } from '@ai-lowcode/element-plus'
import { ref, watch } from 'vue'

import { AlCodeEditorAtom } from '@/atoms'

defineOptions({
  name: 'AlDataSourceAtom',
})

const emits = defineEmits(['update:modelValue'])

const dataSource = ref()

watch(() => dataSource.value, (newValue) => {
  emits('update:modelValue', () => {
    return JSON.parse(newValue)
  })
})

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
  </div>
</template>
