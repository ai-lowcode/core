<script lang="ts" setup>
import { ref, useAttrs, watch } from 'vue'

import { componentStrategy, getBindMapping, getModelValue } from '@/common/strategy.ts'

const props = defineProps<{
  modelValue: boolean
  componentConfig: any
}>()

const emits = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const value = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  value.value = newValue
})

function onUpdate(val: any) {
  value.value = val
  emits('update:modelValue', val)
}

const attrsValue = ref({
  ...attrs,
  ...getModelValue(value, onUpdate, props.componentConfig),
  ...getBindMapping(attrs, props.componentConfig),
})

const comp = componentStrategy(props.componentConfig)
</script>

<template>
  <component
    :is="comp" v-bind="attrsValue"
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name v-bind="slotData || {}" />
    </template>
  </component>
</template>
