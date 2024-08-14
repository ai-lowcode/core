<script lang="ts" setup name="FcRow">
import { AlCol } from '@ai-lowcode/element-plus'
</script>

<template>
  <AlCol :span="24">
    <div class="_fd-row el-row" :class="{ '_fc-child-empty': !$slots.default }" v-bind="$attrs">
      <slot name="default" />
    </div>
  </AlCol>
</template>

<style>
._fd-row {
    width: 100%;
}
</style>
