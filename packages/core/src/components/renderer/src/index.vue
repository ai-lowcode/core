<script lang="ts" setup>
import { AlNode } from '@/components/node'

defineProps<{
  schemas: Array<any>
}>()
</script>

<template>
  <div>
    <AlNode v-for="(schema, index) in schemas" :key="index" :component-schema="schema" />
  </div>
</template>
