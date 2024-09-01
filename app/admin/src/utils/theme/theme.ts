import { genMixColor } from './gen-color'

import { Theme, defaultThemeConfig } from '@/utils/theme/store'

// 设置css变量
function setStyleProperty(propName: string, value: string) {
  document.documentElement.style.setProperty(propName, value)
}

// 更新主题色到css变量
function updateThemeColorVar({ colors }: Theme) {
  // 遍历当前主题色，生成混合色，并更新到css变量（tailwind + elementPlus）
  for (const brand in colors) {
    updateBrandExtendColorsVar(
      colors[brand as keyof Theme['colors']] as string,
      brand,
    )
  }

  function updateBrandExtendColorsVar(color: string, name: string) {
    // TODO:生成混合色
    const { DEFAULT, dark, light } = genMixColor(color)
    // 每种主题色由浅到深分为五个阶梯以供开发者使用。
    setStyleProperty(`--${name}-lighter-color`, light[5])
    setStyleProperty(`--${name}-light-color`, light[3])
    setStyleProperty(`--${name}-color`, DEFAULT)
    setStyleProperty(`--${name}-deep-color`, dark[2])
    setStyleProperty(`--${name}-deeper-color`, dark[4])

    // elementPlus主题色更新
    setStyleProperty(`--el-color-${name}`, DEFAULT)
    setStyleProperty(`--el-color-${name}-dark-2`, dark[2])
    setStyleProperty(`--el-color-${name}-light-3`, light[3])
    setStyleProperty(`--el-color-${name}-light-5`, light[5])
    setStyleProperty(`--el-color-${name}-light-7`, light[7])
    setStyleProperty(`--el-color-${name}-light-8`, light[8])
    setStyleProperty(`--el-color-${name}-light-9`, light[9])
  }
}

// 设置主题
export function setTheme(data: Theme = defaultThemeConfig) {
  // 将主题更新到css变量中，使之生效
  updateThemeColorVar(data)
}
