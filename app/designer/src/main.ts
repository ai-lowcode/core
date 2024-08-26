// eslint-disable-next-line import/order
import { createApp } from 'vue'
import { initComponents } from '@ai-lowcode/designer'
import '@ai-lowcode/designer/css'
import ELEMENT from 'element-plus'

import App from './App.vue'

const app = createApp(App)
function setupApp() {
  app.use(ELEMENT)
  initComponents(app)
  app.mount('#app')
}

setupApp()
