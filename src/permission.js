import router from '@/router'

// 引入加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })
NProgress.configure({ ease: 'ease', speed: 200 })
NProgress.configure({ minimum: 0.3 })

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
