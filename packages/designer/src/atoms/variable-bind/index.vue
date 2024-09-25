<script lang="ts" setup>
import { AlButton, AlInput } from '@ai-lowcode/element-plus'
import { ref } from 'vue'

defineOptions({
  name: 'AlVariableBindAtom',
})

const props = defineProps<{
  confirmChange: Function
  cancelChange: Function
  exposeApi: any
  modelValue: any
}>()

const emits = defineEmits(['update:modelValue', 'change'])

const variableBind = ref()

function handleSave() {
  emits('update:modelValue', variableBind)
  props?.confirmChange?.()
  emits('change')
}

function cancel() {
  props?.cancelChange?.()
}
</script>

<template>
  <div>
    <AlInput v-model="variableBind" size="small" />
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
