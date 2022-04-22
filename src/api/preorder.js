import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const preorderApi = {
  newPreorder: GG_URL_PREFIX + '/preorder/newPreorder',
  preorderList: GG_URL_PREFIX + '/preorder/list',
  getPreorder: GG_URL_PREFIX + '/preorder/get',
  deletePreorder: GG_URL_PREFIX + '/preorder/delete',
  editPreorder: GG_URL_PREFIX + '/preorder/edit'
}

export function newPreorder (parameter) {
  return request({
    url: preorderApi.newPreorder,
    method: 'post',
    params: parameter
  })
}

export function editPreorder (parameter) {
  return request({
    url: preorderApi.editPreorder,
    method: 'post',
    params: parameter
  })
}

export function preorderList (parameter) {
  return request({
    url: preorderApi.preorderList,
    method: 'get',
    params: parameter
  })
}

export function getPreorder (parameter) {
  return request({
    url: preorderApi.getPreorder,
    method: 'get',
    params: parameter
  })
}

export function deletePreorder () {
  return request({
    url: preorderApi.deletePreorder,
    method: 'get'
  })
}
