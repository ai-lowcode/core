import { webStorage } from '@ai-lowcode/hooks'
import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

import { genMixColor } from '@/utils/theme/gen-color'

const globalColor = {
  'bg-white': {
    basicColor: '#ffffff',
    textColor: 'var(--al-text-color)',
  },
  'bg-blue-600': {
    basicColor: '#2563EB',
    textColor: '#fff',
  },
  'bg-green-600': {
    basicColor: '#16A34A',
    textColor: '#fff',
  },
  'bg-yellow-600': {
    basicColor: '#CA8A04',
    textColor: '#fff',
  },
  'bg-orange-600': {
    basicColor: '#EA580C',
    textColor: '#fff',
  },
  'bg-pink-600': {
    basicColor: '#DB2777',
    textColor: '#fff',
  },
}

// 设置css变量
export function setStyleProperty(propNameList: string[], value: string) {
  propNameList.map((propName) => {
    document.documentElement.style.setProperty(propName, value)
  })
}

export function setElementPlusProperty(name: string, DEFAULT: string, light: Record<number, string>, dark: Record<number, string>) {
  // elementPlus主题色更新
  setStyleProperty([`--el-color-${name}`], DEFAULT)
  setStyleProperty([`--el-color-${name}-dark-2`], dark[2])
  setStyleProperty([`--el-color-${name}-light-3`], light[3])
  setStyleProperty([`--el-color-${name}-light-5`], light[5])
  setStyleProperty([`--el-color-${name}-light-7`], light[7])
  setStyleProperty([`--el-color-${name}-light-8`], light[8])
  setStyleProperty([`--el-color-${name}-light-9`], light[9])
}

export function globalStyleStrategy(color: string, type: string) {
  const { DEFAULT, dark, light } = genMixColor(globalColor[color]?.basicColor ? globalColor[color]?.basicColor : color.length === 9 ? color.slice(0, color.length - 2) : color)
  return {
    sun: () => {
      document.documentElement.classList.remove('dark')
      // 背景色
      setStyleProperty(['--el-bg-color-overlay', '--el-bg-color', '--el-fill-color-blank', '--el-dialog-bg-color', '--al-basic-background-color'], '#ffffff')
      // 边框
      setStyleProperty(['--el-border-color', '--el-border-color-light', '--el-border-color-lighter', '--al-border-basic-color', '--al-hover-bg-color', '--al-basic-border-color'], '#dddee0')
      // 文字
      setStyleProperty(['--el-text-color-primary'], '#000000')
      // header
      setStyleProperty(['--el-collapse-header-bg-color'], '#f8f8f8')
      // 设置饿了么主题
      setElementPlusProperty('primary', DEFAULT, light, dark)
    },
    moon: () => {
      document.documentElement.classList.add('dark')
      // 背景色
      setStyleProperty(['--el-bg-color', '--el-fill-color-blank', '--el-bg-color-overlay', '--el-dialog-bg-color', '--al-basic-background-color'], '#141414')
      // 边框
      setStyleProperty(['--el-border-color', '--el-border-color-light', '--el-border-color-lighter', '--al-border-basic-color', '--al-hover-bg-color', '--al-basic-border-color'], 'hsla(0,0%,99%,.12)')
      // 文字
      setStyleProperty(['--el-text-color-primary'], '#ffffff')
      // header
      setStyleProperty(['--el-collapse-header-bg-color'], '#000000')
      // 设置饿了么主题
      setElementPlusProperty('primary', DEFAULT, dark, light)
    },
    computer: () => {
    },
  }[type]()
}

export function themeColorStrategy(color: string) {
  const globalColorSetter = (basicColor: string, textColor: string) => {
    const { DEFAULT, dark, light } = genMixColor(basicColor.length === 9 ? basicColor.slice(0, basicColor.length - 2) : basicColor)
    // 主色调
    setStyleProperty(['--al-text-active-color', '--el-color-primary', '--al-border-active-color', '--al-active-bg-color'], basicColor === '#ffffff' ? 'rgb(37 99 235)' : light[2])
    // 边框色
    setStyleProperty(['--el-button-hover-border-color', '--el-button-hover-border-color', '--al-menu-active-bg-color', '--el-menu-hover-bg-color'], light[3])
    setStyleProperty(['--el-border-color-light'], light[9])
    // 背景色
    setStyleProperty(['--al-menu-bg-color', '--el-menu-bg-color'], DEFAULT)
    // 文字颜色
    setStyleProperty(['--el-menu-text-color', '--el-menu-active-color'], textColor)
    // 设置饿了么主题
    setElementPlusProperty('primary', DEFAULT, light, dark)
  }
  const defaultColorFunc = () => {
    globalColorSetter(color, '#fff')
  }
  if (globalColor[color])
    globalColorSetter(globalColor[color].basicColor, globalColor[color].textColor)
  else
    defaultColorFunc()
}

export function displayStrategy(appSettingConfig: Record<string, any>) {
  const strategy = {
    grayMode: () => appSettingConfig.grayMode ? document.documentElement.classList.add('html-grey') : document.documentElement.classList.remove('html-grey'),
    weaknessMode: () => appSettingConfig.weaknessMode ? document.documentElement.classList.add('html-weakness') : document.documentElement.classList.remove('html-weakness'),
    hideTag: () => {},
    hideFooter: () => {},
    logo: () => {},
    keepAlive: () => {},
  }
  for (const strategyKey in strategy) {
    strategy[strategyKey]()
  }
}

export const useAppStore = defineStore('app', () => {
  const appSettingConfig = ref(webStorage.getStorageFromKey('settingConfig') ?? {
    isCollapse: true,
    globalStyle: 'sun',
    themeColor: 'bg-white',
    menuMode: '',
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
    displayStrategy(appSettingConfig.value)
    webStorage.setStorage('settingConfig', newValue)
  }, { deep: true })

  onMounted(() => {
    // 初始化全局颜色策略
    themeColorStrategy(appSettingConfig.value.themeColor)
    // 初始化全局主题策略
    globalStyleStrategy(appSettingConfig.value.themeColor, appSettingConfig.value.globalStyle)
    displayStrategy(appSettingConfig.value)
  })

  return {
    appSettingConfig,
    settingConfig,
    changeAppSettingConfig,
  }
})
