<script lang="ts" setup>
import { AlTabPane, AlTabs } from '@ai-lowcode/element-plus'

defineOptions({
  name: 'AlTabsSchema',
})
</script>

<template>
  <AlTabs v-model="activeName" v-bind="$attrs" @tab-click="handleClick">
    <AlTabPane label="User" name="first">
      <AlVueDragAble class="min-h-[30px] w-[200px] bg-basic-color" />
    </AlTabPane>
  </AlTabs>
</template>
