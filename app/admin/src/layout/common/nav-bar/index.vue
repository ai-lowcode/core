<script lang="ts" setup>
import {
  AlDropdown,
  AlDropdownItem,
  AlDropdownMenu,
  AlIcon,
  Bell,
  Expand,
  Fold,
  FullScreen,
  Search,
  Tools,
} from '@ai-lowcode/element-plus'

import { Icon } from '@iconify/vue'

import { ref } from 'vue'

import setting from '@/layout/common/setting/index.vue'

defineProps<{
  isCollapse: boolean
}>()

const emits = defineEmits(['changeCollapse'])

const settingRef = ref()
function showSetting() {
  settingRef.value.showSetting()
}

function changeCollapse(value: boolean) {
  emits('changeCollapse', !value)
}
</script>

<template>
  <div class="h-[50px] w-full border-b border-b-gray-100 flex justify-between items-center">
    <div>
      <AlIcon class="cursor-pointer h-full w-[40px]" @click="changeCollapse(isCollapse)">
        <Expand v-if="isCollapse" />
        <Fold v-else />
      </AlIcon>
    </div>
    <div class="mr-2 flex h-full items-center">
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100">
        <Search />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100">
        <FullScreen />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100">
        <Bell />
      </AlIcon>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100">
        <Icon icon="ri:translate" />
      </AlIcon>
      <AlDropdown trigger="click" class="px-2 h-full duration-300 hover:bg-gray-100">
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
            <AlDropdownItem>
              <Icon icon="ri:logout-circle-r-line" class="mr-1" />
              退出系统
            </AlDropdownItem>
          </AlDropdownMenu>
        </template>
      </AlDropdown>
      <AlIcon class="cursor-pointer h-full w-[40px] duration-300 hover:bg-gray-100" @click="showSetting">
        <Tools />
      </AlIcon>
    </div>
    <setting ref="settingRef" />
  </div>
</template>
