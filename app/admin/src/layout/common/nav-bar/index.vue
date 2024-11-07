<script lang="ts" setup>
import {
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlIcon,
  AlMessageBox,
  Expand,
  Fold,
} from '@ai-lowcode/element-plus'

import { Icon } from '@iconify/vue'

import { ref, toRefs } from 'vue'

import Logo from '@/layout/common/logo/index.vue'
import MenuTop from '@/layout/common/menu-top/index.vue'
import setting from '@/layout/common/setting/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useFullscreen } from '@/utils/full-screen'

const emits = defineEmits(['changeCollapse'])

const userStore = useUserStore()

const appStore = useAppStore()

const { appSettingConfig, changeAppSettingConfig } = toRefs(appStore)

const { userInfo } = toRefs(userStore)

const settingRef = ref()

const fullScreen = useFullscreen()

const rightOperationConfig = [
  {
    icon: 'ic:round-search',
    type: 'button',
    click: () => {},
  },
  {
    icon: 'ic:baseline-fullscreen',
    type: 'button',
    click: () => {
      fullScreen.toggle()
    },
  },
  {
    icon: 'ph:bell',
    type: 'button',
    click: () => {},
  },
  {
    icon: 'ri:translate',
    type: 'button',
    click: () => {},
  },
  {
    icon: 'uil:setting',
    type: 'user',
    click: () => {},
  },
  {
    icon: 'uil:setting',
    type: 'button',
    click: showSetting,
  },
]

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
  <div
    class="h-[50px] flex-shrink-0 overflow-hidden w-full border-b-[0.5px] border-b-basic-color border-basic-color flex justify-between items-center" :class="{
      'bg-basic-color': appSettingConfig.menuMode === 'left',
      'bg-menu-color': appSettingConfig.menuMode === 'top',
    }"
  >
    <div v-if="appSettingConfig.menuMode === 'top'" class="flex items-center">
      <Logo v-if="appSettingConfig.logo" class="w-[100px] h-[50px]" />
      <MenuTop />
    </div>
    <AlIcon v-if="appSettingConfig.menuMode === 'left'" class="cursor-pointer h-full w-[40px] hover:bg-gray-100 hover:bg-hover-color duration-300" @click="changeAppSettingConfig('isCollapse', !appSettingConfig.isCollapse)">
      <Expand v-if="appSettingConfig.isCollapse" />
      <Fold v-else />
    </AlIcon>
    <div class="mr-2 flex h-full items-center">
      <template v-for="(operation, index) in rightOperationConfig" :key="index">
        <AlIcon
          v-if="operation.type === 'button'" class="cursor-pointer h-full w-[40px] duration-300 " :class="{
            'hover:bg-hover-color': appSettingConfig.menuMode === 'left',
            'hover:bg-active-color': appSettingConfig.menuMode === 'top',
          }" @click="operation.click()"
        >
          <Icon :icon="operation?.icon" />
        </AlIcon>
        <AlDropdown
          v-if="operation.type === 'user'" trigger="click" class="px-2 h-full duration-300" :class="{
            'hover:bg-hover-color': appSettingConfig.menuMode === 'left',
            'hover:bg-active-color': appSettingConfig.menuMode === 'top',
          }"
        >
          <div class="flex justify-center items-center">
            <img src="https://avatars.githubusercontent.com/u/44761321" class="w-[25px] h-[25px] rounded-full" alt="头像">
            <div class="ml-2">
              {{ userInfo?.nickname }}
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
      </template>
    </div>
    <setting ref="settingRef" />
  </div>
</template>
