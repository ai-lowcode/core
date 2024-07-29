import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/system/home/index.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/12', component: HomeView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
