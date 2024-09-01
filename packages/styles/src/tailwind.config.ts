import type { Config } from 'tailwindcss'
// 生成颜色css变量名
function genSimilarColorsName(brandName: string) {
  return {
    lighter: `var(--${brandName}-lighter-color)`,
    light: `var(--${brandName}-light-color)`,
    DEFAULT: `var(--${brandName}-color)`,
    deep: `var(--${brandName}-deep-color)`,
    deeper: `var(--${brandName}-deeper-color)`,
  }
}

export default {
  darkMode: 'class',
  corePlugins: {
    preflight: false,
  },
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        workspace: '#0000001a 0 20px 25px -5px,#0000000a 0 10px 10px -5px',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
      },
      textColor: {
        'black-color': 'var(--al-black-color)',
      },
      fontWeight: {
        'bold-weight': 'var(--al-bold-title-weight)',
      },
      backgroundColor: {
        'basic-color': 'var(--al-basic-background-color)',
      },
      borderColor: {
        // 添加自定义颜色
        'basic-color': 'var(--al-basic-border-color)', // 自定义的蓝色
      },
    },
  },
} satisfies Config
