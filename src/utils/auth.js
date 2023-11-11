import { useUserStore } from '@/stores/modules'
import pinia from '@/stores'

let $userStore = null

export const getUserStore = () => {
  if (!$userStore) {
    $userStore = useUserStore(pinia)
  }
  return $userStore
}

export const storageKeys = {
  access: 'access',
  refresh: 'refresh',
  permissions: 'permissions',
  roles: 'roles',
  userInfo: 'userInfo'
}

export const getItem = (key) => {
  return localStorage.getItem(key)
}

export const setItem = (key, value) => {
  localStorage.setItem(key, value)
  const $userStore = getUserStore()
  $userStore[key] = value
}

export const removeItem = (key) => {
  localStorage.removeItem(key)
  const $userStore = getUserStore()
  $userStore[key] = null
}
