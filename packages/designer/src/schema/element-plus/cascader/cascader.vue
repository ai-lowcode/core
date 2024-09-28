<script lang="ts" setup>
import { AlCascader } from '@ai-lowcode/element-plus'
import { onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

defineOptions({
  name: 'AlCascaderSchema',
})

const props = defineProps<{
  cascaderData: Promise<any> | any
}>()

const dataList = ref()

const attrs = useAttrs()

async function handleData(params?: any, options?: any) {
  dataList.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.cascaderData?.dataSource, props.cascaderData?.dataType, params, options, props.cascaderData?.modifyRequestForm)
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <AlCascader v-bind="$attrs" :options="dataList" />
</template>
