import routes from '@/router/routes'
export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      menuList: routes,
      loadedRoutes: [
        {
          name: 'home',
          title: '首页'
        }
      ],
      activeRoute: 'home'
    }
  },
  actions: {},
  getters: {},
  persist: false
})
