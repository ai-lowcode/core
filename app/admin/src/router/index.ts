import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/system/home/index.vue'

import LoginView from '@/views/system/login/index.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
