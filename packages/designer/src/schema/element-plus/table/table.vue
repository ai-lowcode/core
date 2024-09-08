<script lang="ts" setup>
import { AlTable, AlTableColumn } from '@ai-lowcode/element-plus'

defineOptions({
  name: 'AlDataTable',
})

defineProps<{
  modelValue: any
  columnList: Array<any>
}>()

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<template>
  <AlTable :data="tableData" v-bind="$attrs">
    <AlTableColumn v-for="(column, index) in columnList" :key="index" v-bind="column" />
  </AlTable>
</template>
