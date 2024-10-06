<script lang="ts" setup>
import { AlButton, AlInput, AlTree } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

defineOptions({
  name: 'AlTreePanel',
})

const props = defineProps<{
  treeSelectData: Promise<any> | any
  rightOperationList?: Array<any>
}>()

const dataList = ref()

const attrs = useAttrs()

async function handleData(params?: any, options?: any) {
  dataList.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.treeSelectData?.dataSource, props.treeSelectData?.dataType, params, options, props.treeSelectData?.modifyRequestForm)
}

async function loadData(...args: any) {
  const AsyncFunction = Object.getPrototypeOf(async () => {
  }).constructor
  const { AlHttp } = await import('@ai-lowcode/request')
  new AsyncFunction(attrs?.loadData).bind({
    ...props,
    attrs,
    args,
    api: {
      AlHttp,
    },
  })()
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <div class="flex flex-col" :style="$attrs?.style">
    <div class="flex flex-row justify-between mb-2">
      <AlInput size="small" class="mr-2">
        <template #append>
          <AlButton size="small" bg text>
            <Icon icon="ic:baseline-search" />
          </AlButton>
        </template>
      </AlInput>
      <div class="flex items-center">
        <AlButton v-for="(btn, index) in rightOperationList" :key="index" size="small" bg circle v-bind="btn" />
      </div>
    </div>
    <AlTree
      v-bind="{
        ...$attrs,
        style: {},
      }" :data="dataList" :load="loadData"
    />
  </div>
</template>
