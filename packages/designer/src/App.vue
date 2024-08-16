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
  <AlDesigner :config="config" />
</template>
