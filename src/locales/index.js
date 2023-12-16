import { createI18n } from 'vue-i18n'

import en from './lang/en.json'
import zh from './lang/zh.json'

const defaultLocale = localStorage.getItem('locale') || 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  allowComposition: true,
  globalInjection: true,
  messages: {
    'en-US': en,
    'zh-CN': zh
  }
})

export default i18n
