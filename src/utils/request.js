import axios from 'axios'
import { storageKeys, getItem, setItem, getUserStore } from '@/utils/auth'
import { formatQueryParams, downloadByData } from '@/utils/tools'

// 是否正在刷新
let isRefreshing = false
// 待请求队列
let waitingRequests = []

function isRefreshRequest(config) {
  // 判断是否为刷新令牌请求
  return config.url.includes('refresh')
}
function handleNewRequests(config) {
  // 如果正在刷新令牌，那么就将新的普通请求暂存
  if (isRefreshing && !isRefreshRequest(config)) {
    return new Promise((resolve, reject) => {
      waitingRequests.push({ config, resolve, reject })
    })
  }
}
function handle401Requests(config) {
  // 如果正在刷新令牌，那么就将401的普通请求暂存
  if (isRefreshing && !isRefreshRequest(config)) {
    return new Promise((resolve, reject) => {
      waitingRequests.push({ config, resolve, reject })
    })
  }
}
function tryRefreshAccessToken(config, refresh) {
  // 如果普通请求401，且存在刷新Token
  if (!isRefreshRequest(config) && refresh) {
    isRefreshing = true

    // 发送刷新令牌请求
    request
      .post('/auth/refresh', { refresh: refresh })
      .then((res) => {})
      .catch((err) => {})

    return new Promise((resolve, reject) => {
      waitingRequests.push({ config, resolve, reject })
    })
  }
}
function onSuccess(config, cb) {
  // 如果正在刷新令牌，且刷新令牌请求成功
  if (isRefreshing && isRefreshRequest(config)) {
    // 替换新的令牌
    cb()

    isRefreshing = false

    waitingRequests.forEach((item) => {
      request(item.config).then(item.resolve).catch(item.reject)
    })
    waitingRequests = []
  }
}
function onFail(cb) {
  // 如果是刷新令牌请求401，或者不存在刷新Token
  isRefreshing = false

  waitingRequests.forEach((item) => {
    item.reject('登录状态已过期，请重新登录')
  })
  waitingRequests = []

  // 返回登录页重新登录
  cb()

  return Promise.reject('登录状态已过期，请重新登录')
}

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截
request.interceptors.request.use(
  (config) => {
    // django风格是要加/
    config.url = config.url.endsWith('/') ? config.url : config.url + '/'

    // 请求是否携带令牌，默认携带
    config.headers['Carry-Token'] = config.headers['Carry-Token'] ?? true
    const access = getItem(storageKeys.access)
    if (config.headers['Carry-Token'] && access) {
      config.headers['Authorization'] = 'Bearer ' + access
    }

    if (config.method === 'get' && config.params) {
      config.params = formatQueryParams(config.params)
    }

    return handleNewRequests(config) || config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const config = response.config
    const { code, data, msg } = response.data
    // 请求成功
    if (code >= 200 && code < 300) {
      onSuccess(config, () => {
        setItem(storageKeys.access, data.access)
      })

      return Promise.resolve(response.data)
    }
    // 认证失败
    else if (code === 401) {
      if (msg === 'No active account found with the given credentials') {
        ElMessage.error('用户名或密码错误')
        return Promise.reject('用户名或密码错误')
      }

      return (
        handle401Requests(config) ||
        tryRefreshAccessToken(config, getItem(storageKeys.refresh)) ||
        onFail(() => {
          ElMessageBox.alert('登录状态已过期，请重新登录', '提示', {
            type: 'warning',
            showClose: false
          }).then(() => {
            const $userStore = getUserStore()
            $userStore.Logout().then(() => {
              location.href = '/login'
            })
          })
        })
      )
    } else {
      // 其它错误
      ElMessage.error(msg)
      return Promise.reject(msg)
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const download = (config) => {
  return new Promise((resolve, reject) => {
    config.url = config.url.endsWith('/') ? config.url : config.url + '/'
    fetch(import.meta.env.VITE_APP_BASE_API + config.url, {
      method: config.method,
      headers: config.headers,
      body: config.data
    })
      .then((response) => response.blob())
      .then((data) => {
        downloadByData(data, config.filename, config.mime)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default request
