import '@ai-lowcode/element-plus/css'
import '@ai-lowcode/styles/css'
import { createApp } from 'vue'

import App from './App.vue'
import './index.ts'

import './style/index.css'
import './style/tailwind.css'

import { initComponents } from '@/index.ts'

const app = createApp(App)
function setupApp() {
  initComponents(app)
  app.mount('#app')
}

setupApp()
