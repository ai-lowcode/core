<script lang="ts" setup>
import { AlIcon, AlSubMenu } from '@ai-lowcode/component-adapter'
import { MenuMeta } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'

import MenuItem from './menu-item.vue'

defineOptions({
  name: 'SubMenu',
})

defineProps<{
  menuList: Array<MenuMeta>
}>()
</script>

<template>
  <template v-for="(menu, index) in menuList" :key="index">
    <AlSubMenu v-if="menu.children && menu.children.length" :index="String(menu?.id)">
      <template #title>
        <div class="mr-0">
          <AlIcon>
            <Icon :icon="menu?.menuIcon" />
          </AlIcon>
          <span>{{ menu?.menuName }}</span>
        </div>
      </template>
      <SubMenu v-if="menu.children && menu.children.length" :menu-list="menu.children" />
    </AlSubMenu>
    <MenuItem v-else :menu="menu" />
  </template>
</template>
