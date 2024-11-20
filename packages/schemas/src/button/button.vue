<script lang="ts" setup>
import { AlButton } from '@zero-dim/component-adapter'

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
