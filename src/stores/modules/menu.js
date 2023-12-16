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
          title: t('home')
        }
      ],
      activeRoute: 'Home'
    }
  },
  actions: {},
  getters: {},
  persist: false
})
