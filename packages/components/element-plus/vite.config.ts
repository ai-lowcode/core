import { definePkgConfig } from '@al-config/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AiLowcodeElementPlus',
    defaultFormats: ['es'],
    options: {
      plugins: [vue()],
    },
  })
})
