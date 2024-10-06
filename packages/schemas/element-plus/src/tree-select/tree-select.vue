<script lang="ts" setup>
import { AlTreeSelect } from '@ai-lowcode/element-plus'
import { onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

defineOptions({
  name: 'AlTreeSelectSchema',
})

const props = defineProps<{
  treeSelectData: Promise<any> | any
}>()

const dataList = ref()

const attrs = useAttrs()

async function handleData(params?: any, options?: any) {
  dataList.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.treeSelectData?.dataSource, props.treeSelectData?.dataType, params, options, props.treeSelectData?.modifyRequestForm)
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <AlTreeSelect v-bind="$attrs" :data="dataList" />
</template>
