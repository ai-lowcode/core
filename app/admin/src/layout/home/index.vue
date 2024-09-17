<script lang="ts" setup>
import { toRefs } from 'vue'

import Footer from '@/layout/common/footer/index.vue'
import Logo from '@/layout/common/logo/index.vue'
import MenuLeft from '@/layout/common/menu-left/index.vue'
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
    <div v-if="appSettingConfig.menuMode === 'left'" class="sidebar-container">
      <Logo v-if="appSettingConfig.logo" />
      <MenuLeft />
    </div>
    <div class="w-full flex flex-col main-container" :style="appSettingConfig.menuMode === 'top' ? 'margin-left: 0px' : ''">
      <NavBar />
      <TagBar v-if="!appSettingConfig.hideTag" />
      <div class="flex-1 w-full h-full">
        <router-view />
      </div>
      <Footer v-if="!appSettingConfig.hideFooter" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 左侧菜单样式
.layout-left {
  &.hideSidebar {
    .sidebar-container {
      width: 210px !important;
    }

    .main-container {
      margin-left: 210px
    }
  }

  .sidebar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 50px;
    overflow: hidden;
    background-color: var(--al-menu-bg-color);
    border-right: 1px solid var(--al-basic-border-color);
    transition: width 0.28s;

    .el-menu {
      border: none;

      .el-menu-item.is-active {
        background-color: var(--al-menu-active-bg-color);
      }
    }
  }

  .main-container {
    position: relative;
    height: 100%;
    margin-left: 50px;
    overflow-y: auto;
    transition: margin-left 0.28s;

    .fixed-header {
      position: sticky;
      top: 0;
      z-index: 9;
      transition: width 0.28s;
    }
  }
}
</style>
