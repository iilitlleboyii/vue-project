import { login, getUserInfo } from '@/api/common'
import { storageKeys, getItem, setItem, removeItem } from '@/utils/auth'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      access: getItem(storageKeys.access),
      refresh: getItem(storageKeys.refresh),
      permissions: JSON.parse(getItem(storageKeys.permissions)),
      roles: JSON.parse(getItem(storageKeys.roles)),
      userInfo: JSON.parse(getItem(storageKeys.userInfo))
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

            setItem(storageKeys.permissions, permissions)
            setItem(storageKeys.roles, roles)
            setItem(storageKeys.userInfo, userInfo)
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
            setItem(storageKeys.permissions, permissions)
            setItem(storageKeys.roles, roles)
            setItem(storageKeys.userInfo, userInfo)
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
