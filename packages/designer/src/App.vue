<script lang="ts" setup>
import { ref } from 'vue'

import { AlDesigner } from '@/designer'

const config = ref({
  fieldReadonly: false,
  showSaveBtn: true,
  showFormConfig: true,
})
</script>

<template>
  <div style="height: calc(100vh - 20px);">
    <AlDesigner :config="config" />
  </div>
</template>
