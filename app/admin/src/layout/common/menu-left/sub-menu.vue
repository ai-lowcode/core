<script lang="ts" setup>
import { AlIcon, AlSubMenu } from '@ai-lowcode/element-plus'
import { MenuType } from '@ai-lowcode/request'
import { Icon } from '@iconify/vue'

import { toRefs } from 'vue'

import MenuItem from './menu-item.vue'

import { useAppStore } from '@/store/modules/app'

defineOptions({
  name: 'SubMenu',
})

defineProps<{
  menuList: Array<MenuType>
  firstLevel?: boolean
}>()

const appStore = useAppStore()

const { appSettingConfig } = toRefs(appStore)
</script>

<template>
  <template v-for="(menu, index) in menuList" :key="index">
    <AlSubMenu v-if="menu.children && menu.children.length" :index="String(menu?.id)">
      <template #title>
        <div class="mr-8">
          <AlIcon>
            <Icon :icon="menu?.meta?.icon" />
          </AlIcon>
          <span v-if="!firstLevel || !appSettingConfig.isCollapse">{{ menu?.name }}</span>
        </div>
      </template>
      <SubMenu v-if="menu.children && menu.children.length" :menu-list="menu.children" />
    </AlSubMenu>
    <MenuItem v-else :menu="menu" />
  </template>
</template>
