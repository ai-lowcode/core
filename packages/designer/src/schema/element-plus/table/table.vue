<script lang="ts" setup>
import { AlButton, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'

defineOptions({
  name: 'AlDataTable',
})

defineProps<{
  dataSource: any
  columnList: any
}>()
</script>

<template>
  <AlTable v-bind="$attrs" :data="dataSource?.()">
    <AlTableColumn v-for="(column, index) in columnList?.()" :key="index" v-bind="column" />
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
