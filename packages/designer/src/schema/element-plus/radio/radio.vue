<script lang="ts" setup>
import { AlRadio, AlRadioButton, AlRadioGroup } from '@ai-lowcode/element-plus'
import { computed } from 'vue'

defineOptions({
  name: 'AlRadioSchema',
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
    <template v-for="(radio, index) in radioList" :key="index">
      <AlRadio v-if="radio.btnType === 'radio'" v-bind="radio" :value="radio?.isNumber ? Number(radio?.value) : String(radio?.value)">
        {{ radio?.title }}
      </AlRadio>
      <AlRadioButton v-else v-bind="radio" :value="radio?.isNumber ? Number(radio?.value) : String(radio?.value)" />
    </template>
  </AlRadioGroup>
</template>
