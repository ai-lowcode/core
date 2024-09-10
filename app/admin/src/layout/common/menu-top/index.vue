<script lang="ts" setup>
import {
  AlMenu,
} from '@ai-lowcode/element-plus'

import SubMenu from './sub-menu.vue'

import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const appStore = useAppStore()

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
</script>

<template>
  <AlMenu
    default-active="2"
    mode="horizontal"
    :collapse="false"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <SubMenu :menu-list="userStore.menuInfo" />
  </AlMenu>
</template>
