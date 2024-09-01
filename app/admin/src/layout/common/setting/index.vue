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
import { ref } from 'vue'

const settingVisible = ref(false)

const configFormData = ref({
  globalStyle: '',
  themeColor: 'bg-white',
  menuMode: '',
  tagStyle: '',
  grayMode: false,
  weaknessMode: false,
  hideTag: false,
  hideFooter: false,
  logo: false,
  keepAlive: false,
})

const settingConfig: any = [
  {
    title: '整体风格',
    slug: 'globalStyle',
    type: 'radio',
    value: [
      {
        icon: 'solar:sun-bold',
        title: '浅色',
        slug: 'sun',
      },
      {
        icon: 'ph:moon-fill',
        title: '深色',
        slug: 'moon',
      },
      {
        icon: 'mingcute:computer-line',
        title: '自动',
        slug: 'computer',
      },
    ],
  },
  {
    title: '主题色',
    slug: 'themeColor',
    type: 'color',
    value: ['bg-white', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600', 'bg-orange-600', 'bg-pink-600'],
  },
  {
    title: '导航模式',
    slug: 'menuMode',
    type: 'menu',
  },
  {
    title: '页签风格',
    slug: 'tagStyle',
    type: 'radio',
    value: [
      {
        icon: 'solar:sun-bold',
        title: '灵动',
        slug: 'dynamic',
      },
      {
        icon: 'ph:moon-fill',
        title: '卡片',
        slug: 'card',
      },
      {
        icon: 'mingcute:computer-line',
        title: '谷歌',
        slug: 'google',
      },
    ],
  },
  {
    title: '界面显示',
    slug: 'display',
    type: 'display',
    value: [
      {
        title: '灰色模式',
        slug: 'grayMode',
      },
      {
        title: '色弱模式',
        slug: 'weaknessMode',
      },
      {
        title: '隐藏标签页',
        slug: 'hideTag',
      },
      {
        title: '隐藏页脚',
        slug: 'hideFooter',
      },
      {
        title: 'Logo',
        slug: 'logo',
      },
      {
        title: '页签持久化',
        slug: 'keepAlive',
      },
    ],
  },
]

function showSetting() {
  settingVisible.value = true
}

function changeFormDataValue(key: string, value: any) {
  configFormData.value[key] = value
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
      <AlRadioGroup v-if="config.type === 'radio'" v-model="configFormData[config.slug]">
        <AlRadioButton v-for="(item, configIndex) in config.value" :key="configIndex" :value="item.slug">
          <div class="flex justify-center items-center">
            <AlIcon class="mr-1">
              <Icon :icon="item.icon" />
            </AlIcon>
            <span>{{ item.title }}</span>
          </div>
        </AlRadioButton>
      </AlRadioGroup>
      <div v-if="config.type === 'color'">
        <div class="flex items-center">
          <div
            v-for="(color, configIndex) in config.value" :key="configIndex" :class="[configFormData[config.slug] === color ? `border-2 border-black ${color}` : color]" class="w-[25px] border border-solid border-basic-color cursor-pointer mr-2 h-[25px] rounded-md" @click="changeFormDataValue(config.slug, color)"
          />
          <AlColorPicker v-model="configFormData[config.slug]" show-alpha @change="$event => changeFormDataValue(config.slug, $event)" />
        </div>
      </div>
      <div v-if="config.type === 'display'">
        <div v-for="(item, configIndex) in config.value" :key="configIndex" class="flex items-center justify-between mb-1">
          <div class="text-sm">
            {{ item.title }}
          </div>
          <AlSwitch v-model="configFormData[item.slug]" @change="changeFormDataValue(item.slug, $event)" />
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
