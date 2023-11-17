import routes from '@/router/routes'
export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      menuList: routes,
      loadedRoutes: [
        {
          name: 'Home',
          title: '首页'
        }
      ],
      activeRoute: 'Home'
    }
  },
  actions: {},
  getters: {},
  persist: false
})
