<script lang="ts" setup>
import { AlButton } from '@ai-lowcode/element-plus'

defineOptions({
  name: 'AlActionBar',
})

defineProps<{
  leftOperationList?: Array<any>
  rightOperationList?: Array<any>
}>()
</script>

<template>
  <div class="flex justify-between items-center w-full" v-bind="$attrs">
    <div class="flex items-center">
      <AlButton v-for="(button, index) in leftOperationList" :key="index" v-bind="button">
        {{ button?.title }}
      </AlButton>
    </div>
    <div class="flex items-center">
      <AlButton v-for="(button, index) in rightOperationList" :key="index" v-bind="button">
        {{ button?.title }}
      </AlButton>
    </div>
  </div>
</template>
