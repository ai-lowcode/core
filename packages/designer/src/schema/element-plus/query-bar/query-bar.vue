<script lang="ts" setup>
import { AlButton, AlIcon } from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'

defineOptions({
  name: 'AlQueryBar',
})

defineProps<{
  searchInputList?: Array<any>
}>()
</script>

<template>
  <div class="flex justify-between items-center w-full" v-bind="$attrs">
    <div class="flex-1 flex items-center">
      <slot />
    </div>
    <div>
      <AlButton size="small" type="primary">
        <AlIcon size="16">
          <Icon icon="ic:baseline-search" />
        </AlIcon>
        <span>查询</span>
      </AlButton>
      <AlButton size="small">
        <AlIcon size="16">
          <Icon icon="bx:reset" />
        </AlIcon>
        <span>重置</span>
      </AlButton>
    </div>
  </div>
</template>
