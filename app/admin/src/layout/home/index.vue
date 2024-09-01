<script lang="ts" setup>
import { toRefs } from 'vue'

import Logo from '@/layout/common/logo/index.vue'
import Menu from '@/layout/common/menu/index.vue'
import NavBar from '@/layout/common/nav-bar/index.vue'
import TagBar from '@/layout/common/tag-bar/index.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { isCollapse } = toRefs(appStore)
</script>

<template>
  <div
    class="flex h-full layout-left" :class="{
      openSidebar: isCollapse,
      hideSidebar: !isCollapse,
    }"
  >
    <div class="sidebar-container">
      <Logo />
      <Menu />
    </div>
    <div class="w-full flex flex-col main-container">
      <NavBar />
      <TagBar />
      <router-view />
    </div>
  </div>
</template>
