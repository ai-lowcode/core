<script lang="ts" setup>
import { AlRadio, AlRadioGroup } from '@ai-lowcode/element-plus'
import { computed } from 'vue'

defineOptions({
  name: 'AlRadioSelect',
})

const props = defineProps<{
  modelValue: any
  radioList?: Array<any>
}>()

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emits('update:modelValue', newValue)
  },
})
</script>

<template>
  <AlRadioGroup v-model="value" v-bind="$attrs">
    <AlRadio v-for="(radio, index) in radioList" :key="index" v-bind="radio">
      {{ radio?.title }}
    </AlRadio>
  </AlRadioGroup>
</template>
