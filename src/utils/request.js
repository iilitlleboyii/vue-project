import axios from 'axios'
import { storageKeys, getItem, setItem, getUserStore } from '@/utils/auth'

// 是否正在刷新令牌
let isRefreshing = false

// 暂存请求
let waitingRequests = []

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
    const access = getItem(storageKeys.access)
    if (config.headers['Carry-Token'] && access) {
      config.headers['Authorization'] = 'Bearer ' + access
    }
    // 如果正在刷新令牌，那么就把新请求暂存，等待刷新令牌请求成功后使用新的令牌重新发送请求
    if (isRefreshing && !config.url.includes('refresh')) {
      waitingRequests.push(config)
    } else {
      return config
    }
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const { data, config } = response
    // 如果是刷新令牌请求，那么就把新的令牌存起来
    if (config.url.includes('refresh')) {
      setItem(storageKeys.access, data.access)
      isRefreshing = false
      waitingRequests.forEach((item) => {
        request(item)
      })
      waitingRequests.length = 0
    }
    return data
  },
  (error) => {
    const { data, config, status } = error.response
    if (status === 401) {
      // 如果正在刷新令牌，且是普通请求，那么就暂存该请求
      if (isRefreshing && !config.url.includes('refresh')) {
        waitingRequests.push(config)
      } else {
        // 如果是普通请求，且存有刷新Token，那么就暂存该请求，尝试去刷新令牌，成功后再重新发送该请求
        const refresh = getItem(storageKeys.refresh)
        if (!config.url.includes('refresh') && refresh) {
          waitingRequests.push(config)
          isRefreshing = true
          request.post('/auth/refresh/', { refresh: refresh })
        } else {
          // 如果刷新令牌也过期了，或者没有刷新Token，那么就直接提示用户重新登录
          isRefreshing = false
          waitingRequests.length = 0
          ElMessageBox.alert('登录状态已过期，请重新登录', '提示', {
            type: 'warning',
            showClose: false
          }).then(() => {
            const $userStore = getUserStore()
            $userStore.Logout().then(() => {
              location.href = '/login'
            })
            return Promise.reject()
          })
        }
      }
    } else {
      const message = data.msg || '服务器开小差了~'
      ElMessage.error(message)
      return Promise.reject(message)
    }
  }
)

export default request
