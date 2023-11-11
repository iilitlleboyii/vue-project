import { useUserStore } from '@/stores/modules'
import pinia from '@/stores'

export const authDict = {
  access: 'Access-Token',
  refresh: 'Refresh-Token',
  permissions: 'Permissions',
  roles: 'Roles',
  userInfo: 'UserInfo'
}

export const getAccess = () => {
  return localStorage.getItem(authDict.access)
}
export const setAccess = (access) => {
  localStorage.setItem(authDict.access, access)
  const $userStore = useUserStore(pinia)
  $userStore.access = access
}
export const removeAccess = () => {
  localStorage.removeItem(authDict.access)
  const $userStore = useUserStore(pinia)
  $userStore.access = ''
}

export const getRefresh = () => {
  return localStorage.getItem(authDict.refresh)
}
export const setRefresh = (refresh) => {
  localStorage.setItem(authDict.refresh, refresh)
  const $userStore = useUserStore(pinia)
  $userStore.refresh = refresh
}
export const removeRefresh = () => {
  localStorage.removeItem(authDict.refresh)
  const $userStore = useUserStore(pinia)
  $userStore.refresh = ''
}

export const getPermissions = () => {
  return JSON.parse(localStorage.getItem(authDict.permissions))
}
export const setPermissions = (permissions) => {
  const permissions_ = JSON.stringify(permissions)
  localStorage.setItem(authDict.permissions, permissions_)
  const $userStore = useUserStore(pinia)
  $userStore.permissions = permissions_
}
export const removePermissions = () => {
  localStorage.removeItem(authDict.permissions)
  const $userStore = useUserStore(pinia)
  $userStore.permissions = []
}

export const getRoles = () => {
  return JSON.parse(localStorage.getItem(authDict.roles))
}
export const setRoles = (roles) => {
  const roles_ = JSON.stringify(roles)
  localStorage.setItem(authDict.roles, roles_)
  const $userStore = useUserStore(pinia)
  $userStore.roles = roles_
}
export const removeRoles = () => {
  localStorage.removeItem(authDict.roles)
  const $userStore = useUserStore(pinia)
  $userStore.roles = []
}

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(authDict.userInfo))
}
export const setUserInfo = (userInfo) => {
  const userInfo_ = JSON.stringify(userInfo)
  localStorage.setItem(authDict.userInfo, userInfo_)
  const $userStore = useUserStore(pinia)
  $userStore.userInfo = userInfo_
}
export const removeUserInfo = () => {
  localStorage.removeItem(authDict.userInfo)
  const $userStore = useUserStore(pinia)
  $userStore.userInfo = {}
}
