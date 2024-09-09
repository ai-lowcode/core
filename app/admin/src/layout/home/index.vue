<script lang="ts" setup>
import { toRefs } from 'vue'

import Footer from '@/layout/common/footer/index.vue'
import Logo from '@/layout/common/logo/index.vue'
import Menu from '@/layout/common/menu/index.vue'
import NavBar from '@/layout/common/nav-bar/index.vue'
import TagBar from '@/layout/common/tag-bar/index.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()

const { appSettingConfig } = toRefs(appStore)
</script>

<template>
  <div
    class="flex h-full layout-left" :class="{
      openSidebar: appSettingConfig.isCollapse,
      hideSidebar: !appSettingConfig.isCollapse,
    }"
  >
    <div class="sidebar-container">
      <Logo v-if="appSettingConfig.logo" />
      <Menu />
    </div>
    <div class="w-full flex flex-col main-container">
      <NavBar />
      <TagBar v-if="!appSettingConfig.hideTag" />
      <router-view />
      <Footer v-if="!appSettingConfig.hideFooter" />
    </div>
  </div>
</template>
