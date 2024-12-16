<script lang="ts" setup>
import { Icon } from '@iconify/vue'

import { ElButton } from 'element-plus'

import { useSlots } from 'vue'

import { AlIcon } from '@/icon'

defineProps<{
  icon?: string
}>()

const slots = useSlots()

// 获取默认插槽内容
const defaultSlot = slots.default ? slots.default()[0].children : null
</script>

<template>
  <ElButton v-bind="$attrs">
    <AlIcon v-if="icon" :class="defaultSlot ? 'mr-1' : ''">
      <Icon :icon="icon" />
    </AlIcon>
    <slot />
  </ElButton>
</template>
