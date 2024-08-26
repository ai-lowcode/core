// eslint-disable-next-line import/order
import { createApp } from 'vue'
import '@ai-lowcode/element-plus/css'

import ELEMENT from 'element-plus'

import App from './App.vue'
import './index.ts'
import './style/index.css'
import './style/tailwind.css'

import { initComponents } from '@/index.ts'

const app = createApp(App)
function setupApp() {
  app.use(ELEMENT)
  initComponents(app)
  app.mount('#app')
}

setupApp()
