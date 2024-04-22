import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export function getRole(id) {
  return request({
    url: '/role/' + id,
    method: 'get'
  })
}

export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/' + data.id,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: '/role/' + id,
    method: 'delete'
  })
}
