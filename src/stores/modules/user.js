export const useUserStore = defineStore('userStore', {
  state: () => {
    const access = localStorage.getItem('Access-Token') || ''
    const refresh = localStorage.getItem('Refresh-Token') || ''
    return {
      access,
      refresh
    }
  },
  actions: {},
  getters: {},
  persist: false
})
