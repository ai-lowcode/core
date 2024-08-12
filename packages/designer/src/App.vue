<script lang="ts" setup>
import { ref } from 'vue'

import { AlDesigner } from '@/designer'

const config = ref({
  fieldReadonly: false,
  showSaveBtn: true,
})

const handle = ref([
  {
    label: '中英切换',
    handle: () => {
    },
  },
])
</script>

<template>
  <div style="height: calc(100vh - 20px);">
    <AlDesigner :config="config" :handle="handle" :locale="null" />
  </div>
</template>
