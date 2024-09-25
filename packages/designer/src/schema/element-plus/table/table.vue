<script lang="ts" setup>
import { AlButton, AlLoading, AlTable, AlTableColumn } from '@ai-lowcode/element-plus'
import { AlHttp, RequestOptionsType } from '@ai-lowcode/request'
import { isJsonStringTryCatch } from '@ai-lowcode/utils'
import { computed, onMounted, ref, useAttrs } from 'vue'

import { getExposeApi } from '@/utils'

defineOptions({
  name: 'AlDataTable',
})

const props = defineProps<{
  dataSource: Promise<any> | any
  columnList: Promise<any> | any
  columnRule: Array<any>
  operationBtn: any
}>()

const data = ref()

const tableRef = ref()

const columns = ref()

const attrs = useAttrs()

const operationColumn = computed(() => columns.value?.find((item: any) => item.prop === '__operation'))

async function dataRequestStrategy(newValue: any, type: string, params?: any, options?: RequestOptionsType, modifyRequestForm?: any) {
  return ({
    staticData: () => {
      return isJsonStringTryCatch(newValue) ? JSON.parse(newValue) : undefined
    },
    dataSource: () => {},
    modifyApi: async () => {
      const api = await getExposeApi()
      if (modifyRequestForm.url) {
        const res = await (AlHttp as any)?.[modifyRequestForm.method]?.(modifyRequestForm.url, {
          ...modifyRequestForm.params,
          ...params,
        }, {
          header: modifyRequestForm.header,
          ...options,
        })
        const handleData = new Function(modifyRequestForm.handleData).bind({
          data: res,
          ...props,
          attrs,
          ...api,
        })
        return modifyRequestForm.handleData ? handleData() : res.data
      }
    },
  } as any)[type]?.()
}

async function handleData(params?: any, options?: any) {
  const loading = AlLoading.service({
    text: '加载中',
    target: tableRef.value?.$el,
  })
  data.value = await dataRequestStrategy(props.dataSource?.dataSource, props.dataSource?.dataType, params, options, props.dataSource?.modifyRequestForm)
  columns.value = await dataRequestStrategy(props.columnList?.dataSource, props.columnList?.dataType, params, options, props.columnList?.modifyRequestForm)
  loading.close()
}

async function operationClick(btn: any, data: any) {
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
  const api = await getExposeApi()
  new AsyncFunction(btn.props?.onClick).bind({
    ...props,
    attrs,
    btn,
    data,
    ...api,
  })()
}

onMounted(async () => {
  await handleData()
})

defineExpose({
  handleData,
  el: tableRef,
})
</script>

<template>
  <AlTable ref="tableRef" v-bind="$attrs" :data="data">
    <AlTableColumn v-for="(column, index) in columns?.filter((item: any) => item.prop !== '__operation')" :key="index" v-bind="column" />
    <AlTableColumn v-if="operationColumn" fixed="right" label="操作" min-width="120" v-bind="operationColumn">
      <template #default="data">
        <AlButton
          v-for="(btn, index) in operationBtn"
          :key="index"
          type="primary"
          size="small"
          v-bind="btn"
          @click="operationClick(btn, data)"
        >
          {{ btn?.title }}
        </AlButton>
      </template>
    </AlTableColumn>
  </AlTable>
</template>
