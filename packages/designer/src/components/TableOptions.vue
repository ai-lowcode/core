<script lang="ts" setup name="TableOptions">
import { AlButton, AlInput, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'
import { deepCopy } from '@ai-lowcode/utils'
import { computed, inject, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: [Array<any>, object]
  column: any
  valueType: string
  max: number
  size: string
}>()

const emits = defineEmits(['update:modelValue', 'change'])

const value = ref(tidyModelValue())

const designer = inject<any>('designer', null)

const t = computed(() => designer.setupState.t)

watch(() => props.modelValue, () => {
  value.value = tidyModelValue()
})

function tidyModelValue() {
  const modelValue = props.modelValue
  if (props.valueType === 'string') {
    return (modelValue || []).map((value) => {
      return { value: `${value}` }
    })
  }
  else if (props.valueType === 'object') {
    return Object.keys((modelValue || {})).map((label: any) => {
      return { label, value: modelValue[label] }
    })
  }
  else {
    return [...modelValue || []].map((v) => {
      return deepCopy(v)
    })
  }
}

function tidyValue() {
  if (props.valueType === 'object') {
    const obj: any = {}
    value.value.forEach((v) => {
      if (v.label && v.value) {
        obj[v.label] = v.value
      }
    })
    return obj
  }
  else {
    return value.value.map((v) => {
      if (props.valueType === 'string') {
        return v.value
      }
      return { ...v }
    })
  }
}

function onInput(item: any) {
  if (props.column.length === 1 && !item[props.column[0].key]) {
    return
  }
  const flag = props.column.every((v: any) => {
    if (v.required === false) {
      return true
    }
    if (['object', 'string'].includes(props.valueType)) {
      return item[v.key] !== undefined && item[v.key] !== '' && item[v.key] !== null
    }
    return item[v.key] !== undefined
  })
  if (flag) {
    input()
  }
}

function input() {
  const value = tidyValue()
  emits('update:modelValue', value)
  emits('change', value)
}

function add() {
  value.value.push(props.column.reduce((initial: any, v: any) => {
    initial[v.key] = ''
    return initial
  }, {}))
}

function del(idx: any) {
  value.value.splice(idx, 1)
  input()
}
</script>

<template>
  <div class="_td-table-opt">
    <AlTable
      :data="value"
      border
      :size="size || 'small'"
      style="width: 100%"
    >
      <template v-for="(col, idx) in column" :key="col.label + idx">
        <AlTableColumn :label="col.label">
          <template #default="scope">
            <AlInput
              :size="size || 'small'" :model-value="scope.row[col.key] || ''"
              @update:model-value="(n) => (scope.row[col.key] = n)"
              @blur="onInput(scope.row)"
            />
          </template>
        </AlTableColumn>
      </template>
      <AlTableColumn width="70" align="center" fixed="right" :label="t('tableOptions.handle')">
        <template #default="scope">
          <i class="fc-icon icon-delete" @click="del(scope.$index)" />
        </template>
      </AlTableColumn>
    </AlTable>
    <div class="_td-table-opt-handle">
      <AlButton v-if="!max || max > value.length" link type="primary" @click="add">
        <i class="fc-icon icon-add" /> {{ t('tableOptions.add') }}
      </AlButton>
    </div>
  </div>
</template>

<style scoped>
._td-table-opt {
    width: 100%;
}

._td-table-opt-handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 5px;
}
</style>
