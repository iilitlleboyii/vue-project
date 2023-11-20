import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function getUser(id) {
  return request({
    url: '/user/' + id,
    method: 'get'
  })
}

export function createUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}
