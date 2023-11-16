import { createRouter, createWebHistory } from 'vue-router'
import pinia from '@/stores'
import { useMenuStore } from '@/stores/modules'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: useMenuStore(pinia) || [],
  scrollBehavior: () => {
    return {
      left: 0,
      top: 0,
      behavior: 'smooth'
    }
  }
})

export default router
