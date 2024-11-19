<script lang="ts" setup>
import {
  AlMenu,
  AlScrollbar,
} from '@ai-lowcode/component-adapter'

import { toRefs } from 'vue'

import { useRoute } from 'vue-router'

import SubMenu from './sub-menu.vue'

import { useAppStore } from '@/store/modules/app'

import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const appStore = useAppStore()

const route = useRoute()

const { appSettingConfig } = toRefs(appStore)

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
</script>

<template>
  <AlScrollbar :style="`height: calc(100vh - ${appSettingConfig.logo ? '46px' : '0px'})`">
    <AlMenu
      :default-active="String(route.name)"
      :collapse="appSettingConfig.isCollapse"
      :collapse-transition="false"
      @open="handleOpen"
      @close="handleClose"
    >
      <SubMenu :first-level="true" :menu-list="userStore.menuInfo" />
    </AlMenu>
  </AlScrollbar>
</template>
