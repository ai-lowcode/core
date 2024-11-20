<script lang="ts" setup>
import { AlRenderer } from '@zero-dim/core'
import { removeAlDragBoxAndPromoteChildren } from '@zero-dim/designer'
import { lowCodePageApi } from '@zero-dim/request'
import { convertStringsToFunctions, isJsonStringTryCatch } from '@zero-dim/utils'
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
