<script lang="ts" setup>
import {
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlIcon,
  AlMessageBox,
  Bell,
  Expand,
  Fold,
  FullScreen,
  Search,
  Tools,
} from '@ai-lowcode/element-plus'

import { Icon } from '@iconify/vue'

import { ref, toRefs } from 'vue'

import setting from '@/layout/common/setting/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

const emits = defineEmits(['changeCollapse'])

const userStore = useUserStore()

const appStore = useAppStore()

const { appSettingConfig, changeAppSettingConfig } = toRefs(appStore)

const settingRef = ref()

function showSetting() {
  settingRef.value.showSetting()
}

async function handleLogout() {
  await AlMessageBox.confirm(
    '退出登录当前账户?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '加载中...'
          await userStore.logout()
          instance.confirmButtonLoading = false
          done()
        }
        else {
          done()
        }
      },
    },
  )
}
</script>

<template>
  <div class="h-[50px] w-full border-b-[0.5px] bg-basic-color border-b-basic-color border-basic-color flex justify-between items-center">
    <AlIcon class="cursor-pointer h-full w-[40px] hover:bg-gray-100 hover:bg-hover-color duration-300" @click="changeAppSettingConfig('isCollapse', !appSettingConfig.isCollapse)">
      <Expand v-if="appSettingConfig.isCollapse" />
      <Fold v-else />
    </AlIcon>
    <div class="mr-2 flex h-full items-center">
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100 hover:bg-hover-color">
        <Search />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100 hover:bg-hover-color">
        <FullScreen />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100 hover:bg-hover-color">
        <Bell />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100 hover:bg-hover-color">
        <Icon icon="ri:translate" />
      </AlIcon>
      <AlDropdown trigger="click" class="px-2 h-full duration-300 hover:bg-gray-100 hover:bg-hover-color">
        <div class="flex justify-center items-center">
          <img src="https://avatars.githubusercontent.com/u/44761321" class="w-[25px] h-[25px] rounded-full" alt="头像">
          <div class="ml-2">
            Axelu
          </div>
        </div>
        <template #dropdown>
          <AlDropdownMenu>
            <AlDropdownItem>
              <Icon icon="icon-park-solid:setting" class="mr-1" />
              账户设置
            </AlDropdownItem>
            <AlDropdownItem @click="handleLogout">
              <Icon icon="ri:logout-circle-r-line" class="mr-1" />
              退出系统
            </AlDropdownItem>
          </AlDropdownMenu>
        </template>
      </AlDropdown>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100 hover:bg-hover-color" @click="showSetting">
        <Tools />
      </AlIcon>
    </div>
    <setting ref="settingRef" />
  </div>
</template>
