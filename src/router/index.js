import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Login',
      path: '/',
      component: () => import('@/views/login/index.vue')
    },
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/views/home/index.vue')
    }
  ]
})

export default router
