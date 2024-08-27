import type { Config } from 'tailwindcss'

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
      colors: {
        bg_color: 'var(--el-bg-color)',
        primary: 'var(--el-color-primary)',
        text_color_primary: 'var(--el-text-color-primary)',
        text_color_regular: 'var(--el-text-color-regular)',
      },
    },
  },
} satisfies Config
