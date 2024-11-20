<script lang="ts" setup>
import { AlWatermark } from '@zero-dim/component-adapter'
import { reactive } from 'vue'

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})
</script>

<template>
  <AlWatermark :font="font" :content="['ZeroDim']" class="h-full">
    <router-view />
  </AlWatermark>
</template>
