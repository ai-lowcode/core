import '@ai-lowcode/element-plus/css'

import formCreate from '@form-create/element-ui'
import ELEMENT from 'element-plus'
import { createApp } from 'vue'

import App from './App.vue'
import './index.ts'
import './style/tailwind.css'

const app = createApp(App)
function setupApp() {
  app.use(ELEMENT)
  app.use(formCreate)
  app.mount('#app')
}

setupApp()
