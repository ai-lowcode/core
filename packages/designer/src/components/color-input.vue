<script lang="ts" setup name="ColorInput">
import { AlColorPicker, AlInput } from '@ai-lowcode/element-plus'
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps<{
  modelValue: any
}>()

const emits = defineEmits(['update:modelValue', 'change'])

const value = computed({
  get: () => props.modelValue,
  set: newValue => emits('update:modelValue', newValue),
})
</script>

<template>
  <div class="_fd-color-input">
    <AlInput v-model="value" clearable>
      <template #append>
        <AlColorPicker v-model="value" show-alpha color-format="hex" />
      </template>
    </AlInput>
  </div>
</template>

<style>
._fd-color-input {
    width: 150px;
}

._fd-color-input .el-input .el-color-picker {
    margin: 0;
}

._fd-color-input .el-input .el-input-group__append {
    width: 24px;
    padding: 0;
}

._fd-color-input .el-input .el-color-picker__trigger {
    border-left: 0 none;
    border-radius: 0 3px 3px 0;
}
</style>
