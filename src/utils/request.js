import axios from 'axios'
import pinia from '@/stores'
import { useUserStore } from '@/stores/modules'

let $userStore = null

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10 * 1000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    // 请求是否携带令牌，默认携带
    config.headers['Carry-Token'] = config.headers['Carry-Token'] ?? true
    if ($userStore === null) {
      $userStore = useUserStore(pinia)
    }
    const access = $userStore.access
    if (config.headers['Carry-Token'] && access) {
      config.headers['Authorization'] = 'Bearer ' + access
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response.status === 401) {
      ElMessageBox.alert('登录状态已过期，请重新登录', '提示', {
        type: 'warning',
        showClose: false
      }).then(() => {
        if ($userStore === null) {
          $userStore = useUserStore(pinia)
        }
        $userStore.Logout().then(() => {
          location.href = '/login'
        })
        return Promise.reject()
      })
    } else {
      const message = error.response.data.msg || '服务器开小差了~'
      ElMessage.error(message)
      return Promise.reject(message)
    }
  }
)

export default request
