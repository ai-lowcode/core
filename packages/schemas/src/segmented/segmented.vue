<script lang="ts" setup>
import { AlSegmented } from '@zero-dim/component-adapter'
import { onMounted, ref, useAttrs } from 'vue'

import { dataRequestStrategy } from '../common/data-request-strategy.ts'

defineOptions({
  name: 'AlSegmentedSchema',
})

const props = defineProps<{
  options: Promise<any> | any
}>()

const optionsList = ref()

const attrs = useAttrs()

async function handleData(params?: any, options?: any) {
  optionsList.value = await dataRequestStrategy({
    ...props,
    attrs,
  }, props.options?.dataSource, props.options?.dataType, params, options, props.options?.modifyRequestForm)
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <AlSegmented v-bind="$attrs" :options="optionsList" />
</template>
