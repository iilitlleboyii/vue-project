const baseRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/login/register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    name: 'Index',
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页'
        }
      }
    ]
  }
]

const routes = baseRoutes

export default routes
