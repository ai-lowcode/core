// 主题配置类型定义
import { merge } from 'lodash'

export interface Theme {
  // 这里留出可拓展空间（如banner图，背景图，文案，标题等），将主题色嵌套在对象内
  colors: {
    primary?: string
    info?: string
    warning?: string
    success?: string
    danger?: string
  }
}

// 默认主题配置
export const defaultThemeConfig: Theme = {
  colors: {
    primary: '#FF6A00',
    info: '#eeeeee',
    warning: '#fbbd23',
    danger: '#f87272',
    success: '#36d399',
  },
}

// 本地缓存 key
const THEME_KEY = 'theme'

// 获取本地缓存主题
export function getTheme(): Theme {
  const theme = localStorage.getItem(THEME_KEY)
  return theme ? JSON.parse(theme) : defaultThemeConfig
}

// 设置主题
export function setTheme(data: Theme = defaultThemeConfig) {
  const oldTheme = getTheme()

  // 将传入配置与旧的主题合并，以填补缺省的值
  data = merge(oldTheme, data || {})

  // 将缓存到浏览器
  localStorage.setItem(THEME_KEY, JSON.stringify(data))

  // TODO:将主题更新到css变量中，使之生效
}
