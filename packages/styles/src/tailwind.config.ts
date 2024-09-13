import type { Config } from 'tailwindcss'

export default {
  darkMode: 'selector',
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
        'active-color': 'var(--al-text-active-color)',
      },
      fontWeight: {
        'bold-weight': 'var(--al-bold-title-weight)',
      },
      backgroundColor: {
        'basic-color': 'var(--al-basic-background-color)',
        'active-color': 'var(--al-active-bg-color)',
        'menu-color': 'var(--al-menu-bg-color)',
        'hover-color': 'var(--al-hover-bg-color)',
      },
      backgroundImage: {
        'workspace-white': 'linear-gradient(#f5f5f5 14px,transparent 0),linear-gradient(90deg,transparent 14px,#86909c 0)',
        'workspace-dark': 'linear-gradient(#18181c 14px,transparent 0),linear-gradient(90deg,transparent 14px,#4e5969 0)',
      },
      outlineColor: {
        'active-color': 'var(--al-text-active-color)',
      },
      borderColor: {
        'basic-color': 'var(--al-basic-border-color)',
        'active-color': 'var(--al-border-active-color)',
      },
    },
  },
} satisfies Config
