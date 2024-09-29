import path from 'node:path'

import { definePkgConfig } from '@al-config/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return definePkgConfig({
    name: 'AiLowcodeElementPlus',
    defaultFormats: ['es'],
    options: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
      plugins: [vue()],
    },
  })
})
