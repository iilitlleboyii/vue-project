import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Index',
      path: '/',
      redirect: '/home'
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import('@/views/login/register.vue')
    },
    {
      name: 'Home',
      path: '/home',
      component: () => import('@/views/home/index.vue')
    }
  ]
})

export default router
