import '@zero-dim/component-adapter/css'
import { initComponents } from '@zero-dim/designer'
import '@zero-dim/designer/css'
import '@zero-dim/graphic/css'
import '@zero-dim/styles/css'
import '@zero-dim/styles/tailwindCss'
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
