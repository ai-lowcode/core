<script lang="ts" setup name="Required">
import { AlInput, AlSwitch } from '@ai-lowcode/element-plus'
import { isString } from '@ai-lowcode/utils'
import { computed, inject, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits(['update:modelValue'])

const flag = isString(props.modelValue)

const designer = inject<any>('designer', null)

const t = computed(() => designer.setupState.t)

const required = ref(props.modelValue === undefined ? false : (flag ? true : !!props.modelValue))

const requiredMsg = ref(flag ? props.modelValue : '')

watch(() => props.modelValue, (n) => {
  const flag = isString(n)
  required.value = n === undefined ? false : (flag ? true : !!n)
  requiredMsg.value = flag ? n : ''
})

watch(() => required, () => {
  update()
})
watch(() => requiredMsg, () => {
  update()
})
function update() {
  let val
  if (required.value === false) {
    val = false
  }
  else {
    val = requiredMsg.value || true
  }
  emits('update:modelValue', val)
}
</script>

<template>
  <div class="_fd-required">
    <AlSwitch v-model="required" />
    <AlInput v-if="required" v-model="requiredMsg" :placeholder="t('validate.requiredPlaceholder')" />
  </div>
</template>

<style>
._fd-required {
    display: flex;
    align-items: center;
    width: 100%;
}

._fd-required .el-input {
    margin-left: 15px;
}

._fd-required .el-switch {
    height: 28px;
}
</style>
