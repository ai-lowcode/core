<script lang="ts" setup>
import { AlButton } from '@ai-lowcode/element-plus'
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
    <div class="flex justify-between items-center w-full">
      <AlButton type="danger" @click="handleSave">
        移除绑定
      </AlButton>
      <div class="flex justify-end items-center">
        <AlButton @click="cancel">
          取消
        </AlButton>
        <AlButton type="primary" @click="handleSave">
          确定
        </AlButton>
      </div>
    </div>
  </div>
</template>
