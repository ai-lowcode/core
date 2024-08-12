<script lang="ts" setup>
import { AlDrawer } from '@ai-lowcode/element-plus'
import { ref } from 'vue'

const settingVisible = ref(false)

function showSetting() {
  settingVisible.value = true
}

defineExpose({
  showSetting,
})
</script>

<template>
  <AlDrawer
    v-model="settingVisible"
    title="I am the title"
    direction="rtl"
  >
    <span>Hi, there!</span>
  </AlDrawer>
</template>
