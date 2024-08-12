<script lang="ts" setup name="SizeInput">
import { AlButton, AlDropdown, AlDropdownItem, AlDropdownMenu, AlInputNumber } from '@ai-lowcode/element-plus'
import { onMounted, ref, watch } from 'vue'

import { isNull } from '@/utils'

const props = defineProps({
  modelValue: String,
  size: String,
  unit: {
    type: Array,
    default: () => ['auto', 'px', '%', 'vh', 'vw', 'em', 'rem'],
  },
  defaultUnit: {
    type: String,
    default: 'px',
  },
})

const emits = defineEmits(['update:modelValue', 'change'])

const idx = ref(1)
const num = ref<any>(0)
const oldValue = ref(props.modelValue || '')

watch(() => props.modelValue, () => {
  parseValue()
})

onMounted(() => {
  parseValue()
})

function parseValue() {
  if (props.modelValue !== 'auto') {
    idx.value = Math.max(props.unit.indexOf(props.defaultUnit), 0)
    props.unit.forEach((v: any, i: any) => {
      if ((props.modelValue || '').includes(v)) {
        idx.value = i
      }
    })
    num.value = isNull(props.modelValue) ? null : Number.parseFloat(String(props.modelValue || 0))
  }
  else {
    idx.value = 0
    num.value = 0
  }
}

function submit() {
  oldValue.value = !isNull(num.value) ? `${num.value}${props.unit[idx.value]}` : ''
  emits('update:modelValue', oldValue.value)
  emits('change', oldValue.value)
}

function changeType(idxs: any) {
  if (idxs !== undefined) {
    if (idx.value === idxs) {
      return
    }
    idx.value = idxs
  }
  else {
    idx.value++
    if (idx.value > 4) {
      idx.value = 0
    }
  }
  if (props.unit[idx.value] === 'auto') {
    oldValue.value = 'auto'
    emits('update:modelValue', 'auto')
    emits('change', 'auto')
  }
  else {
    submit()
  }
}
</script>

<template>
  <div class="_fd-size-input">
    <template v-if="unit[idx] === 'auto'">
      <AlButton :size="size" style="width: 150px;" @click="changeType()">
        {{ unit[idx] }}
      </AlButton>
    </template>
    <template v-else>
      <AlInputNumber v-model="num" :size="size" controls-position="right" @change="submit" />
      <AlDropdown trigger="click" size="small">
        <AlButton :size="size">
          {{ unit[idx] }}
        </AlButton>
        <template #dropdown>
          <AlDropdownMenu>
            <AlDropdownItem v-for="(name, idx) in unit" :key="name" @click="changeType(idx)">
              <div>{{ name }}</div>
            </AlDropdownItem>
          </AlDropdownMenu>
        </template>
      </AlDropdown>
    </template>
  </div>
</template>

<style>
._fd-size-input {
    display: flex;
    align-items: center;
}

._fd-size-input .el-input-number--small {
    width: 122px;
}

._fd-size-input .el-button {
    width: 25px;
    padding: 5px;
    margin-left: 3px;
    font-size: 14px;
}
</style>
