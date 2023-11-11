import { login, getUserInfo } from '@/api/common'
import * as storage from '@/utils/auth'

export const useUserStore = defineStore('userStore', {
  state: () => {
    const access = storage.getAccess() || ''
    const refresh = storage.getRefresh() || ''
    const permissions = storage.getPermissions() || []
    const roles = storage.getRoles() || []
    const userInfo = storage.getUserInfo() || {}
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
            storage.setAccess(access)
            storage.setRefresh(refresh)

            storage.setPermissions(permissions)
            storage.setRoles(roles)
            storage.setUserInfo(userInfo)
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

            storage.setPermissions(permissions)
            storage.setRoles(roles)
            storage.setUserInfo(userInfo)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    Logout() {
      return new Promise((resolve, reject) => {
        storage.removeAccess()
        storage.removeRefresh()
        storage.removePermissions()
        storage.removeRoles()
        storage.removeUserInfo()
        resolve()
      })
    }
  },
  getters: {},
  persist: false
})
