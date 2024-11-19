<script lang="ts" setup>
import { AlButton, AlLoading, AlTable, AlTableColumn } from '@ai-lowcode/component-adapter'
import { AlRenderer } from '@ai-lowcode/core'
import { computed, onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

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

async function handleData(params?: any, options?: any) {
  const loading = AlLoading.service({
    text: '加载中',
    target: tableRef.value?.$el,
  })
  data.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.dataSource?.dataSource, props.dataSource?.dataType, params, options, props.dataSource?.modifyRequestForm)
  columns.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.columnList?.dataSource, props.columnList?.dataType, params, options, props.columnList?.modifyRequestForm)
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

function handleSchemaFunction(component, scope) {
  return new Function(component).apply(scope)
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
    <AlTableColumn v-for="(column, index) in columns?.filter((item: any) => item.prop !== '__operation')" :key="index" v-bind="column">
      <template #default="scope">
        <AlRenderer v-if="column?.component" class="inline" :schemas="handleSchemaFunction(column?.component, scope)" />
      </template>
    </AlTableColumn>
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
