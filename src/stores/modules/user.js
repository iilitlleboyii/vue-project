import { login, logout, getUserInfo } from '@/api/common'

export const useUserStore = defineStore('userStore', {
  state: () => {
    const access = localStorage.getItem('Access-Token') || ''
    const refresh = localStorage.getItem('Refresh-Token') || ''
    const permissions = JSON.parse(localStorage.getItem('Permissions')) || []
    const roles = JSON.parse(localStorage.getItem('Roles')) || []
    const userInfo = JSON.parse(localStorage.getItem('UserInfo')) || {}
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
            this.access = access
            this.refresh = refresh
            localStorage.setItem('Access-Token', access)
            localStorage.setItem('Refresh-Token', refresh)
            this.permissions = permissions
            this.roles = roles
            this.userInfo = userInfo
            localStorage.setItem('Permissions', JSON.stringify(permissions))
            localStorage.setItem('Roles', JSON.stringify(roles))
            localStorage.setItem('UserInfo', JSON.stringify(userInfo))
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
            this.permissions = permissions
            this.roles = roles
            this.userInfo = userInfo
            localStorage.setItem('Permissions', JSON.stringify(permissions))
            localStorage.setItem('Roles', JSON.stringify(roles))
            localStorage.setItem('UserInfo', JSON.stringify(userInfo))
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    Logout() {
      return new Promise((resolve, reject) => {
        this.access = ''
        this.refresh = ''
        this.permissions = []
        this.roles = []
        this.userInfo = {}
        localStorage.removeItem('Access-Token')
        localStorage.removeItem('Refresh-Token')
        localStorage.removeItem('Permissions')
        localStorage.removeItem('Roles')
        localStorage.removeItem('UserInfo')
        resolve()
        // logout()
        //   .then(() => {
        //     this.access = ''
        //     this.refresh = ''
        //     this.permissions = []
        //     this.roles = []
        //     this.userInfo = {}
        //     localStorage.removeItem('Access-Token')
        //     localStorage.removeItem('Refresh-Token')
        //     localStorage.removeItem('Permissions')
        //     localStorage.removeItem('Roles')
        //     localStorage.removeItem('UserInfo')
        //     resolve()
        //   })
        //   .catch((err) => {
        //     reject(err)
        //   })
      })
    }
  },
  getters: {},
  persist: false
})
