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
          title: '首页'
        }
      }
    ]
  },
  {
    name: 'Screen',
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      isExternalLink: true
    }
  },
  {
    name: 'Acl',
    path: '/acl',
    redirect: '/acl/user',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理'
    },
    children: [
      {
        name: 'User',
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'Role',
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        name: 'Menu',
        path: '/acl/menu',
        component: () => import('@/views/acl/menu/index.vue'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    hidden: true,
    meta: {
      title: '登录'
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/login/register.vue'),
    hidden: true,
    meta: {
      title: '注册'
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
