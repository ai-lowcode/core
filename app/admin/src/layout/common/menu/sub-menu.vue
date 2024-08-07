<script lang="ts" setup>
import { AlIcon, AlSubMenu } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'

import MenuItem from '@/layout/common/menu/menu-item.vue'

defineProps<{
  menuInfo: Array<MenuType>
}>()
</script>

<template>
  <template v-for="(menu, index) in menuInfo" :key="index">
    <AlSubMenu v-if="menu.children && menu.children.length" :index="String(menu?.id)">
      <template #title>
        <AlIcon>
          <Icon :icon="menu?.meta?.icon" />
        </AlIcon>
        <span>{{ menu?.name }}</span>
      </template>
      <SubMenu v-if="menu.children && menu.children.length" :menu-info="menu.children" />
    </AlSubMenu>
    <MenuItem v-else :menu="menu" />
  </template>
</template>
