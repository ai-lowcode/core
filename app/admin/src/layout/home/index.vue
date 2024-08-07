<script lang="ts" setup>
import { ref } from 'vue'

import Menu from '@/layout/common/menu/index.vue'
import NavBar from '@/layout/common/nav-bar/index.vue'

const isCollapse = ref(true)
function changeCollapse(value: boolean) {
  isCollapse.value = value
}
</script>

<template>
  <div class="flex h-full">
    <Menu :is-collapse="isCollapse" />
    <div class="w-full">
      <NavBar :is-collapse="isCollapse" @change-collapse="changeCollapse" />
      <router-view />
    </div>
  </div>
</template>
