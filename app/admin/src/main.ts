import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import { setupStore } from '@/store'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  app.use(router)
  app.mount('#app')
}

setupApp()
