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
    getCachedRoutes: (state) =>
      state.menuList
        .flatMap((route) => [route, ...(route.children || [])])
        .filter((item) => item.keepAlive && state.loadedRoutes.map((route) => route.name).includes(item.name))
        .map((item) => item.name)
  },
  persist: false
})
