import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth/login/',
    method: 'post',
    headers: {
      'Carry-Token': false
    },
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout/',
    method: 'delete'
  })
}

export function getUserInfo() {
  return request({
    url: '/auth/info/',
    method: 'get'
  })
}

export function register(data) {
  return request({
    url: '/auth/register/',
    method: 'post',
    headers: {
      'Carry-Token': false
    },
    data
  })
}

export function refreshToken() {
  return request({
    url: '/auth/refresh/',
    method: 'get'
  })
}

export function verifyToken(data) {
  return request({
    url: '/auth/verify/',
    method: 'post',
    data
  })
}
