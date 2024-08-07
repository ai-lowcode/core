<script lang="ts" setup>
import {
  AlMenu,
} from '@ai-lowcode/element-plus'

import { onMounted } from 'vue'

import SubMenu from '@/layout/common/menu/sub-menu.vue'
import useUserStore from '@/store/modules/user'

defineProps<{
  isCollapse: boolean
}>()

const userStore = useUserStore()

function handleOpen(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  console.log(key, keyPath)
}

onMounted(() => {
  console.log(userStore.menuInfo)
})
</script>

<template>
  <AlMenu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <SubMenu :menu-info="userStore.menuInfo" />
  </AlMenu>
</template>
