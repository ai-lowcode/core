<script lang="ts" setup>
import { AlButton, AlLoading, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'
import { AlHttp, RequestOptionsType } from '@ai-lowcode/request'
import { isJsonStringTryCatch } from '@ai-lowcode/utils'
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

async function dataRequestStrategy(newValue: any, type: string, params?: any, options?: RequestOptionsType, modifyRequestForm?: any) {
  return ({
    staticData: () => {
      return isJsonStringTryCatch(newValue) ? JSON.parse(newValue) : undefined
    },
    dataSource: () => {},
    modifyApi: async () => {
      if (modifyRequestForm.url) {
        console.log(params, options)
        const { data } = await (AlHttp as any)?.[modifyRequestForm.method]?.(modifyRequestForm.url, {
          ...modifyRequestForm.params,
          ...params,
        }, {
          header: modifyRequestForm.header,
          ...options,
        })
        return data.items
      }
    },
  } as any)[type]?.()
}

async function handleData(params?: any, options?: any) {
  const loading = AlLoading.service({
    text: 'Loading',
    target: tableRef.value,
    background: 'rgba(0, 0, 0, 0.7)',
  })
  data.value = await dataRequestStrategy(props.dataSource?.dataSource, props.dataSource?.dataType, params, options, props.dataSource?.modifyRequestForm)
  columns.value = await dataRequestStrategy(props.columnList?.dataSource, props.columnList?.dataType, params, options, props.columnList?.modifyRequestForm)
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
