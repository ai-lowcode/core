<script lang="ts" setup>
import {
  AlButton,
  AlColorPicker,
  AlDrawer,
  AlIcon,
  AlRadioButton,
  AlRadioGroup,
  AlSwitch,
} from '@ai-lowcode/element-plus'
import { Icon } from '@iconify/vue'
import { ref, toRefs } from 'vue'

import { useAppStore } from '@/store/modules/app'

const settingVisible = ref(false)

const appStore = useAppStore()

const { appSettingConfig, settingConfig, changeAppSettingConfig } = toRefs(appStore)

function showSetting() {
  settingVisible.value = true
}

defineExpose({
  showSetting,
})
</script>

<template>
  <AlDrawer
    v-model="settingVisible"
    title="系统配置"
    direction="rtl"
    size="280px"
  >
    <div v-for="(config, index) in settingConfig" :key="index" class="mb-4 relative">
      <div class="text-black-color font-medium text-sm mb-2">
        {{ config.title }}
      </div>
      <AlRadioGroup v-if="config.type === 'radio'" v-model="appSettingConfig[config.slug]">
        <AlRadioButton v-for="(item, configIndex) in config.value" :key="configIndex" :value="item.slug">
          <div class="flex justify-center items-center">
            <AlIcon class="mr-1">
              <Icon :icon="item.icon" />
            </AlIcon>
            <span>{{ item.title }}</span>
          </div>
        </AlRadioButton>
      </AlRadioGroup>
      <div v-if="config.type === 'menu'" class="flex">
        <div class="bg-[#f0f2f5] rounded-md overflow-hidden mr-4 cursor-pointer h-[36px] w-[46px] relative shadow-md" :style="appSettingConfig[config.slug] === 'left' ? 'border: 2px solid var(--el-border-color)' : ''" @click="changeAppSettingConfig(config.slug, 'left')">
          <div class="bg-[#1b2a47] h-full w-[30%]" />
          <div class="bg-white h-[30%] absolute right-0 top-0 w-[70%] shadow-sm" />
        </div>
        <div class="bg-[#f0f2f5] rounded-md overflow-hidden mr-4 cursor-pointer h-[36px] w-[46px] relative shadow-md" :style="appSettingConfig[config.slug] === 'top' ? 'border: 2px solid var(--el-border-color)' : ''" @click="changeAppSettingConfig(config.slug, 'top')">
          <div class="bg-[#1b2a47] h-[30%] absolute right-0 top-0 w-full shadow-sm" />
        </div>
        <div class="bg-[#f0f2f5] rounded-md overflow-hidden mr-4 cursor-pointer h-[36px] w-[46px] relative shadow-md" :style="appSettingConfig[config.slug] === 'mix' ? 'border: 2px solid var(--el-border-color)' : ''" @click="changeAppSettingConfig(config.slug, 'mix')">
          <div class="bg-white h-full w-[30%]" />
          <div class="bg-[#1b2a47] h-[30%] absolute right-0 top-0 w-full shadow-sm" />
        </div>
      </div>
      <div v-if="config.type === 'color'">
        <div class="flex items-center">
          <div
            v-for="(color, configIndex) in config.value" :key="configIndex" :class="[appSettingConfig[config.slug] === color ? `border-2 border-active-color ${color}` : color]" class="w-[25px] border border-solid border-basic-color cursor-pointer mr-2 h-[25px] rounded-md" @click="changeAppSettingConfig(config.slug, color)"
          />
          <AlColorPicker v-model="appSettingConfig[config.slug]" color-format="hex" show-alpha @change="changeAppSettingConfig(config.slug, $event)" />
        </div>
      </div>
      <div v-if="config.type === 'display'">
        <div v-for="(item, configIndex) in config.value" :key="configIndex" class="flex items-center justify-between mb-1">
          <div class="text-sm">
            {{ item.title }}
          </div>
          <AlSwitch v-model="appSettingConfig[item.slug]" @change="changeAppSettingConfig(item.slug, $event)" />
        </div>
      </div>
    </div>
    <template #footer>
      <AlButton>
        清除缓存
      </AlButton>
    </template>
  </AlDrawer>
</template>
