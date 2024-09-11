import { webStorage } from '@ai-lowcode/hooks'
import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

import { displayStrategy, globalStyleStrategy, themeColorStrategy } from '@/utils/theme/theme'

export const useAppStore = defineStore('app', () => {
  const appSettingConfig = ref(webStorage.getStorageFromKey('settingConfig') ?? {
    isCollapse: true,
    globalStyle: 'sun',
    themeColor: 'bg-white',
    menuMode: 'left',
    tagStyle: '',
    grayMode: false,
    weaknessMode: false,
    hideTag: false,
    hideFooter: false,
    logo: true,
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

  function changeAppSettingConfig(key: string, value: any) {
    appSettingConfig.value[key] = value
  }

  watch(() => appSettingConfig.value, (newValue) => {
    // 全局颜色策略
    themeColorStrategy(appSettingConfig.value.themeColor)
    // 全局主题策略
    globalStyleStrategy(appSettingConfig.value.themeColor, appSettingConfig.value.globalStyle)
    // 全局界面显示
    displayStrategy(appSettingConfig.value)
    webStorage.setStorage('settingConfig', newValue)
  }, { deep: true })

  onMounted(() => {
    // 初始化全局颜色策略
    themeColorStrategy(appSettingConfig.value.themeColor)
    // 初始化全局主题策略
    globalStyleStrategy(appSettingConfig.value.themeColor, appSettingConfig.value.globalStyle)
    // 全局界面显示
    displayStrategy(appSettingConfig.value)
  })

  return {
    appSettingConfig,
    settingConfig,
    changeAppSettingConfig,
  }
})
