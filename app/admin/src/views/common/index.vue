<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { removeAlDragBoxAndPromoteChildren } from '@ai-lowcode/designer'
import { lowCodePageApi } from '@ai-lowcode/request'
import { convertStringsToFunctions, isJsonStringTryCatch } from '@ai-lowcode/utils'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const schema = ref()

async function handleData(pageId: string) {
  if (pageId) {
    const { data } = await lowCodePageApi.edit(pageId)
    schema.value = isJsonStringTryCatch(data?.pageContent) ? removeAlDragBoxAndPromoteChildren(convertStringsToFunctions(JSON.parse(data?.pageContent))) : []
  }
}

watch(() => route?.meta?.lowcodePage, (newValue) => {
  handleData(newValue as string)
}, { deep: true })

onMounted(() => {
  handleData(route?.meta?.lowcodePage as string)
})
</script>

<template>
  <AlRenderer v-if="route.meta?.lowcodePage && schema" :schemas="schema" />
</template>
