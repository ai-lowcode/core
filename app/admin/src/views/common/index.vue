<script lang="ts" setup>
import { AlRenderer } from '@ai-lowcode/core'
import { AlDesigner, removeAlDragBoxAndPromoteChildren } from '@ai-lowcode/designer'
import { AlHttp } from '@ai-lowcode/request'
import { convertStringsToFunctions, isJsonStringTryCatch } from '@ai-lowcode/utils'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const schema = ref()

async function handleData() {
  const { data } = await AlHttp.get(`/lowcode/pages/${route.meta?.pageId}`, {}, {})
  schema.value = isJsonStringTryCatch(data?.content) ? removeAlDragBoxAndPromoteChildren(convertStringsToFunctions(JSON.parse(data?.content))) : []
}

watch(() => route.meta?.pageId, (newValue) => {
  handleData()
}, { deep: true })

onMounted(() => {
  handleData()
})
</script>

<template>
  <AlDesigner v-if="route.path === '/about'" class="flex-1 p-2" style="height: calc(100vh - 100px)" />
  <AlRenderer v-if="route.meta?.pageId && schema" :schemas="schema" />
</template>
