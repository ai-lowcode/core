<script lang="ts" setup>
import { AlButton, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'
import { ref, watchEffect } from 'vue'

defineOptions({
  name: 'AlDataTable',
})

const props = defineProps<{
  dataSource: Promise<any> | any
  columnList: Promise<any> | any
}>()

const data = ref()

const columns = ref()

watchEffect(async () => {
  data.value = await props.dataSource?.()
  columns.value = await props.columnList?.()
})
</script>

<template>
  <AlTable v-bind="$attrs" :data="data">
    <AlTableColumn v-for="(column, index) in columns" :key="index" v-bind="column" />
    <AlTableColumn fixed="right" label="操作" min-width="120">
      <template>
        <AlButton
          link
          type="primary"
          size="small"
        >
          删除
        </AlButton>
      </template>
    </AlTableColumn>
  </AlTable>
</template>
