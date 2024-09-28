<script lang="ts" setup>
import { AlWatermark } from '@ai-lowcode/element-plus'
import { reactive } from 'vue'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})
</script>

<template>
  <AlWatermark :font="font" :content="['AiLowCode']" class="h-full">
    <router-view />
  </AlWatermark>
</template>
