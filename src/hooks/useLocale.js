export default function useLocale() {
  const i18n = useI18n()

  const currentLocale = computed(() => i18n.locale.value)

  const setLocale = (locale) => {
    i18n.locale.value = locale
    localStorage.setItem('locale', locale)
  }
  return {
    i18n,
    currentLocale,
    setLocale
  }
}
