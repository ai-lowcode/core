<script lang="ts" setup>
import { AlDesigner, removeAlDragBoxAndPromoteChildren } from '@ai-lowcode/designer'
import { AlHttp } from '@ai-lowcode/request'
import { convertStringsToFunctions, isJsonStringTryCatch } from '@ai-lowcode/utils'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const schema = ref()

async function handleData() {
  const { data } = await AlHttp.get(`/lowcode/pages/${route.meta?.pageId}`, {}, {})
  schema.value = isJsonStringTryCatch(data?.content) ? removeAlDragBoxAndPromoteChildren(convertStringsToFunctions(JSON.parse(data?.content))) : []
}

onMounted(() => {
  handleData()
})
</script>

<template>
  <AlDesigner class="flex-1 p-2" style="height: calc(100vh - 100px)" />
<!--  <AlRenderer v-if="schema" :schemas="schema" /> -->
</template>
