<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { AlIcon, AlSubMenu } from '@zero-dim/component-adapter'
import { MenuMeta } from '@zero-dim/request'

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
