import { genMixColor } from './gen-color'

export const globalColor = {
  'bg-white': {
    basicColor: '#ffffff',
    textColor: '#000',
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

export function setElementPlusProperty(name: string, DEFAULT: string, light: Record<number, string>, dark: Record<number, string>, isWhite: boolean) {
  // elementPlus主题色更新
  setStyleProperty([`--el-color-${name}`], isWhite ? light[2] : DEFAULT)
  setStyleProperty([`--el-color-${name}-dark-2`], dark[2])
  setStyleProperty([`--el-color-${name}-light-3`], light[3])
  setStyleProperty([`--el-color-${name}-light-5`], light[5])
  setStyleProperty([`--el-color-${name}-light-7`], light[7])
  setStyleProperty([`--el-color-${name}-light-8`], light[8])
  setStyleProperty([`--el-color-${name}-light-9`], light[9])
}

export function globalStyleStrategy(color: string, type: string) {
  const { DEFAULT, dark, light } = genMixColor(globalColor[color]?.basicColor.includes('#ffffff') ? '#2563EB' : globalColor[color]?.basicColor ? globalColor[color]?.basicColor : color.length === 9 ? color.slice(0, color.length - 2) : color)
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
      setElementPlusProperty('primary', DEFAULT, light, dark, globalColor[color]?.basicColor.includes('#ffffff'))
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
      setElementPlusProperty('primary', DEFAULT, dark, light, globalColor[color]?.basicColor.includes('#ffffff'))
    },
    computer: () => {
    },
  }[type]()
}

export function themeColorStrategy(color: string) {
  const globalColorSetter = (basicColor: string, textColor: string) => {
    const { DEFAULT, dark, light } = genMixColor(basicColor.includes('#ffffff') ? '#2563EB' : basicColor.length === 9 ? basicColor.slice(0, basicColor.length - 2) : basicColor)
    // 主色调
    setStyleProperty(['--al-text-active-color', '--al-border-active-color', '--al-active-bg-color'], basicColor.includes('#ffffff') ? '#2563EB' : light[2])
    // 边框色
    setStyleProperty(['--el-button-hover-border-color', '--al-menu-active-bg-color', '--el-menu-hover-bg-color'], basicColor.includes('#ffffff') ? '#2563EB' : light[3])
    setStyleProperty(['--el-border-color-light'], basicColor.includes('#ffffff') ? '#2563EB' : light[9])
    // 背景色
    setStyleProperty(['--al-menu-bg-color', '--el-menu-bg-color'], basicColor.includes('#ffffff') ? '#ffffff' : DEFAULT)
    // 文字颜色
    setStyleProperty(['--el-menu-text-color', '--el-menu-hover-text-color'], textColor)
    setStyleProperty(['--el-menu-active-color'], basicColor.includes('#ffffff') ? '#ffffff' : textColor)
    // 设置饿了么主题
    setElementPlusProperty('primary', DEFAULT, light, dark, basicColor.includes('#ffffff'))
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
