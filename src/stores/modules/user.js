import { login, getUserInfo } from '@/api/common'
import { storageKeys, getItem, setItem, removeItem } from '@/utils/auth'

export const useUserStore = defineStore('userStore', {
  state: () => {
    const access = getItem(storageKeys.access)
    const refresh = getItem(storageKeys.refresh)
    const permissions = JSON.parse(getItem(storageKeys.permissions))
    const roles = JSON.parse(getItem(storageKeys.roles))
    const userInfo = JSON.parse(getItem(storageKeys.userInfo))
    return {
      access,
      refresh,
      permissions,
      roles,
      userInfo
    }
  },
  actions: {
    Login(data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res) => {
            const { access, refresh, permissions, roles, userInfo } = res
            setItem(storageKeys.access, access)
            setItem(storageKeys.refresh, refresh)

            setItem(storageKeys.permissions, JSON.stringify(permissions))
            setItem(storageKeys.roles, JSON.stringify(roles))
            setItem(storageKeys.userInfo, JSON.stringify(userInfo))
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const { permissions, roles, userInfo } = res

            setItem(storageKeys.permissions, JSON.stringify(permissions))
            setItem(storageKeys.roles, JSON.stringify(roles))
            setItem(storageKeys.userInfo, JSON.stringify(userInfo))
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    Logout() {
      return new Promise((resolve, reject) => {
        removeItem(storageKeys.access)
        removeItem(storageKeys.refresh)
        removeItem(storageKeys.permissions)
        removeItem(storageKeys.roles)
        removeItem(storageKeys.userInfo)
        resolve()
      })
    }
  },
  getters: {},
  persist: false
})
