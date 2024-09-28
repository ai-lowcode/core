<script lang="ts" setup>
import { Icon } from '@iconify/vue'

import { ElButton } from 'element-plus'

import { AlIcon } from '../icon'

defineProps<{
  icon: string
}>()
</script>

<template>
  <ElButton v-bind="$attrs">
    <AlIcon v-if="icon" class="mr-1">
      <Icon :icon="icon" />
    </AlIcon>
    <slot />
  </ElButton>
</template>
