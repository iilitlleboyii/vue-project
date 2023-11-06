import { createI18n } from 'vue-i18n'

import en from './en-US'
import zh from './zh-CN'

const defaultLocale = localStorage.getItem('LOCALE') || 'zh-CN'

const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: 'en-US',
  allowComposition: true,
  legacy: false,
  globalInjection: true,
  messages: {
    'en-US': en,
    'zh-CN': zh
  }
})

export default i18n
