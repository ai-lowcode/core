<script lang="ts" setup>
import { AlMessage } from '@ai-lowcode/element-plus'
import Codemirror from 'codemirror-editor-vue3'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  name: 'AlCodeEditorAtom',
})

// 定义从父组件接收的属性
const props = defineProps({
  modelValue: String,
  option: Object,
})

const emits = defineEmits(['update:modelValue', 'change'])

const cmOptions = ref(props.option ?? {
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

const cmRef = ref()

const code = computed(() => props.modelValue)

function onInput(val: any) {
  emits('update:modelValue', val.getValue())
  emits('change')
  AlMessage.success('已保存')
}

watch(() => props.option, (newValue) => {
  cmOptions.value = newValue
  cmRef.value?.refresh()
})

onMounted(() => {
  cmRef.value?.refresh()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})
</script>

<template>
  <Codemirror
    ref="cmRef"
    v-model:value="code"
    :options="cmOptions"
    border
    @blur="onInput"
  />
</template>

<style lang="scss" scoped>
.codemirror-container.bordered {
  border: 1px solid var(--al-basic-border-color);
}
</style>
