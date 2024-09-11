<script lang="ts" setup>
import { AlButton, AlLoading, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'AlDataTable',
})

const props = defineProps<{
  dataSource: Promise<any> | any
  columnList: Promise<any> | any
  operationBtn: any
}>()

const data = ref()

const tableRef = ref()

const columns = ref()

async function handleData(params?: any, options?: any) {
  const loading = AlLoading.service({
    text: 'Loading',
    target: tableRef.value,
    background: 'rgba(0, 0, 0, 0.7)',
  })
  data.value = await props.dataSource?.(params, options)
  columns.value = await props.columnList?.()
  loading.close()
}

onMounted(async () => {
  await handleData()
})

defineExpose({
  handleData,
})
</script>

<template>
  <div ref="tableRef">
    <AlTable v-bind="$attrs" :data="data">
      <AlTableColumn v-for="(column, index) in columns" :key="index" v-bind="column" />
      <AlTableColumn fixed="right" label="操作" min-width="120">
        <template #default>
          <AlButton
            v-for="(btn, index) in operationBtn"
            :key="index"
            type="primary"
            size="small"
            v-bind="btn"
          >
            {{ btn?.title }}
          </AlButton>
        </template>
      </AlTableColumn>
    </AlTable>
  </div>
</template>
