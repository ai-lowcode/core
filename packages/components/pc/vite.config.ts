import baseConfigFn from '@al-config/vite/vite.base.config'
import { defineConfig } from 'vite'

export default defineConfig(async () => {
  return baseConfigFn({
    name: 'AiLowcodeHooks',
    defaultFormats: ['es', 'cjs'],
  })
})
