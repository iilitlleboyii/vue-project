import i18n from '@/locale'

const { t } = i18n.global

/* 
  title: 路由标题
  breadCrumb: 面包屑导航
  hidden: 隐藏非菜单路由
*/

const baseRoutes = [
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
          title: t('home')
        }
      }
    ]
  },
  {
    name: 'System',
    path: '/system',
    redirect: '/system/user',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: t('system'),
      breadCrumb: true
    },
    children: [
      {
        name: 'User',
        path: '/system/user',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: t('user')
        }
      },
      {
        name: 'Role',
        path: '/system/role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: t('role')
        }
      },
      {
        name: 'Menu',
        path: '/system/menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: t('menu')
        }
      }
    ]
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: t('dataPanel'),
      isExternalLink: true
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true,
    meta: {
      title: t('login')
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/login/register.vue'),
    hidden: true,
    meta: {
      title: t('register')
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    hidden: true,
    meta: {
      title: '404'
    }
  },
  {
    name: 'Blank',
    path: '/blank',
    component: () => import('@/views/blank/index.vue'),
    hidden: true
  },
  {
    name: 'Any',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
    meta: {
      title: 'any'
    }
  }
]

const routes = baseRoutes

export default routes
