import pinia from '@/stores'
import router from '@/router'
import { useUserStore } from '@/stores/modules'

// 引入加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, ease: 'ease', speed: 200, minimum: 0.3 })

let $userStore = null

router.beforeEach(({ name, path, params, query, meta }) => {
  NProgress.start()
  document.title = meta.title ? meta.title + '-后台管理系统' : '后台管理系统'
  // 登录页和注册页直接放行
  if (name === 'Login' || name === 'Register') {
    return true
  } else {
    if ($userStore === null) {
      $userStore = useUserStore(pinia)
    }
    // 其它页如果已登录过直接放行，否则重新登录
    if ($userStore.access) {
      return true
    } else {
      return {
        path: '/login',
        query: {
          redirect: path
        }
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
