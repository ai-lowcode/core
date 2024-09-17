<script lang="ts" setup>
import { AlTreeSelect } from '@ai-lowcode/element-plus'
import { AlHttp, RequestOptionsType } from '@ai-lowcode/request'
import { isJsonStringTryCatch } from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'AlTreeSelectSchema',
})

const props = defineProps<{
  treeSelectData: Promise<any> | any
}>()

const dataList = ref()

async function dataRequestStrategy(newValue: any, type: string, params?: any, options?: RequestOptionsType, modifyRequestForm?: any) {
  return ({
    staticData: () => {
      return isJsonStringTryCatch(newValue) ? JSON.parse(newValue) : undefined
    },
    dataSource: () => {},
    modifyApi: async () => {
      if (modifyRequestForm.url) {
        const res = await (AlHttp as any)?.[modifyRequestForm.method]?.(modifyRequestForm.url, {
          ...modifyRequestForm.params,
          ...params,
        }, {
          header: modifyRequestForm.header,
          ...options,
        })
        const handleData = new Function(modifyRequestForm.handleData).bind(res)
        return modifyRequestForm.handleData ? handleData() : res.data
      }
    },
  } as any)[type]?.()
}

async function handleData(params?: any, options?: any) {
  dataList.value = await dataRequestStrategy(props.treeSelectData?.dataSource, props.treeSelectData?.dataType, params, options, props.treeSelectData?.modifyRequestForm)
}

onMounted(async () => {
  await handleData()
})
</script>

<template>
  <AlTreeSelect v-bind="$attrs" :data="dataList" />
</template>
