import { defineConfig } from 'vite'
import baseConfigFn from '@al-config/vite/vite.base.config.ts'

export default defineConfig(async () => {
  return baseConfigFn({
    name: 'AiLowcodeHooks',
    defaultFormats: ['es', 'cjs'],
  })
})
