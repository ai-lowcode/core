import '@ai-lowcode/component-adapter/css'
import { initComponents } from '@ai-lowcode/designer'
import '@ai-lowcode/designer/css'
import '@ai-lowcode/graphic/css'
import '@ai-lowcode/styles/css'
import '@ai-lowcode/styles/tailwindCss'
import { createApp } from 'vue'

import App from './App.vue'
import './setup/codemirror'

import { setupRouter } from '@/router'
import { storage } from '@/setup/storage'
import { setupStore } from '@/store'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
  initComponents(app)
  storage()
  app.mount('#app')
}

setupApp()
