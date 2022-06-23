import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const comSourceApi = {
  newComSource: GG_URL_PREFIX + '/comSource/newComSource',
  comSourceList: GG_URL_PREFIX + '/comSource/list',
  getComSource: GG_URL_PREFIX + '/comSource/get',
  deleteComSource: GG_URL_PREFIX + '/comSource/delete',
  editComSource: GG_URL_PREFIX + '/comSource/edit'
}

export function newComSource (parameter) {
  return request({
    url: comSourceApi.newComSource,
    method: 'post',
    params: parameter
  })
}

export function editComSource (parameter) {
  return request({
    url: comSourceApi.editComSource,
    method: 'post',
    params: parameter
  })
}

export function comSourceList (parameter) {
  return request({
    url: comSourceApi.comSourceList,
    method: 'get',
    params: parameter
  })
}

export function getComSource (parameter) {
  return request({
    url: comSourceApi.getComSource,
    method: 'get',
    params: parameter
  })
}

export function deleteComSource () {
  return request({
    url: comSourceApi.deleteComSource,
    method: 'get'
  })
}
