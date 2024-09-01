<script lang="ts" setup>
import { AlIcon, AlSubMenu } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'

import { toRefs } from 'vue'

import MenuItem from '@/layout/common/menu/menu-item.vue'
import { useAppStore } from '@/store/modules/app'

defineProps<{
  menuInfo: Array<MenuType>
}>()

const appStore = useAppStore()

const { isCollapse } = toRefs(appStore)
</script>

<template>
  <template v-for="(menu, index) in menuInfo" :key="index">
    <AlSubMenu v-if="menu.children && menu.children.length" :index="String(menu?.id)">
      <template #title>
        <div class="mr-8">
          <AlIcon>
            <Icon :icon="menu?.meta?.icon" />
          </AlIcon>
          <span v-if="!isCollapse">{{ menu?.name }}</span>
        </div>
      </template>
      <SubMenu v-if="menu.children && menu.children.length" :is-collapse="isCollapse" :menu-info="menu.children" />
    </AlSubMenu>
    <MenuItem v-else :menu="menu" />
  </template>
</template>
