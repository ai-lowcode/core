<script lang="ts" setup>
import { AlButton } from '@ai-lowcode/element-plus'

defineOptions({
  name: 'AlButtonSchema',
})

defineProps<{
  content: string
}>()
</script>

<template>
  <AlButton v-bind="$attrs">
    {{ content }}
  </AlButton>
</template>
