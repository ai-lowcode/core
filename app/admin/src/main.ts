import '@ai-lowcode/element-plus/css'

import '@ai-lowcode/styles/css'

import { createApp } from 'vue'

import App from './App.vue'

import '@/assets/css/tailwind.css'

import { router } from '@/router'
import { setupStore } from '@/store'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  app.use(router)
  app.mount('#app')
}

setupApp()
