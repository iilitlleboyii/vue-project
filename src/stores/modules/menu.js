import routes from '@/router/routes'
import i18n from '@/locales'

const { t } = i18n.global

export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      menuList: routes,
      loadedRoutes: [
        {
          name: 'Home',
          title: t('layout.routes.home')
        }
      ],
      activeRoute: 'Home'
    }
  },
  actions: {},
  getters: {
    getCachedRoutes: (state) => {
      const dfs = (routes, acc = []) => {
        for (const route of routes) {
          acc.push(route)
          route.children && dfs(route.children, acc)
        }
        return acc
      }
      const loadedRoutesNames = state.loadedRoutes.map((route) => route.name)
      return dfs(state.menuList)
        .filter((item) => item.keepAlive && loadedRoutesNames.includes(item.name))
        .map((item) => item.name)
    }
  },
  persist: false
})
