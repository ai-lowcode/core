<script lang="ts" setup>
import { computed, inject, ref } from 'vue'

defineOptions({
  name: 'EntityNode',
})

const node = inject<any>('getNode')
const nodeMeta = computed(() => node())

const ports = ref(nodeMeta.value.store.data?.ports?.items)

nodeMeta.value.on('change:ports', ({ current }) => {
  ports.value = current?.items
})

function handleData() {
  console.log(nodeMeta.value?.port?.ports)
}
</script>

<template>
  <div class="w-full h-full bg-white border-2 border-solid rounded-md" @click="handleData">
    <div class="border-b border-solid border-black text-center">
      {{ nodeMeta?.store?.data?.label }}
    </div>
    <div v-for="(item, index) in ports" :key="index" class="cursor-pointer text-[12px] px-3 py-1 hover:text-active-color hover:bg-hover-color duration-300">
      {{ item?.attrs?.name }}: {{ item?.attrs?.type }}
    </div>
  </div>
</template>
