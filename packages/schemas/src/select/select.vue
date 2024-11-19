<script lang="ts" setup>
import { AlOption, AlSelect } from '@ai-lowcode/component-adapter'
import { onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

defineOptions({
  name: 'AlSelectSchema',
})

const props = defineProps<{
  selectData: Promise<any> | any
}>()

const dataList = ref()

const attrs = useAttrs()

async function handleData(params?: any, options?: any) {
  dataList.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.selectData?.dataSource, props.selectData?.dataType, params, options, props.selectData?.modifyRequestForm)
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <AlSelect v-bind="$attrs">
    <AlOption
      v-for="item in dataList"
      :key="item[($attrs?.optionKey as string) ?? 'id']"
      :label="item[($attrs?.label as string) ?? 'name']"
      :value="item[($attrs?.value as string) ?? 'id']"
    />
  </AlSelect>
</template>
