import '@ai-lowcode/element-plus/css'

import '@ai-lowcode/styles/css'

import { createApp } from 'vue'

import App from './App.vue'

import '@/assets/css/tailwind.css'

import { setupRouter } from '@/router'
import { setupStorage } from '@/setup/setupStorage'
import { setupStore } from '@/store'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
  setupStorage()
  app.mount('#app')
}

setupApp()
