<script lang="ts" setup>
import {
  AlMenu,
} from '@ai-lowcode/component-adapter'

import SubMenu from './sub-menu.vue'

import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

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
