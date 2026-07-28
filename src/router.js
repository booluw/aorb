import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import RevealPage from './pages/RevealPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/r/:slug', name: 'reveal', component: RevealPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
