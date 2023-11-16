import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior: () => {
    return {
      left: 0,
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
