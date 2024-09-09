<script lang="ts" setup>
// placeholder
import 'codemirror/addon/display/placeholder.js'

// language
import 'codemirror/mode/css/css.js'

// language
import 'codemirror/mode/javascript/javascript.js'

// theme
import 'codemirror/theme/dracula.css'

import Codemirror from 'codemirror-editor-vue3'

import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  name: 'AlEventEditor',
})

// 定义从父组件接收的属性
const props = defineProps({
  modelValue: String,
  option: Object,
})

const emits = defineEmits(['update:modelValue'])

const cmOptions = ref(props.option)

const cmRef = ref()

const code = computed(() => props.modelValue)

function onInput(val: string) {
  emits('update:modelValue', val)
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
    @input="onInput"
  />
</template>

<style lang="scss" scoped>
.codemirror-container.bordered {
  border: 1px solid var(--al-basic-border-color);
}
</style>
