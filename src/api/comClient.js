import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const comClientApi = {
  newComClient: GG_URL_PREFIX + '/comClient/newComClient',
  comClientList: GG_URL_PREFIX + '/comClient/list',
  getComClient: GG_URL_PREFIX + '/comClient/get',
  deleteComClient: GG_URL_PREFIX + '/comClient/delete',
  editComClient: GG_URL_PREFIX + '/comClient/edit'
}

export function newComClient (parameter) {
  return request({
    url: comClientApi.newComClient,
    method: 'post',
    params: parameter
  })
}

export function editComClient (parameter) {
  return request({
    url: comClientApi.editComClient,
    method: 'post',
    params: parameter
  })
}

export function comClientList (parameter) {
  return request({
    url: comClientApi.comClientList,
    method: 'get',
    params: parameter
  })
}

export function getComClient (parameter) {
  return request({
    url: comClientApi.getComClient,
    method: 'get',
    params: parameter
  })
}

export function deleteComClient () {
  return request({
    url: comClientApi.deleteComClient,
    method: 'get'
  })
}
