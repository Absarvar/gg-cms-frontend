import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'
import { download } from '@/utils/util'

const preorderApi = {
  newPreorder: GG_URL_PREFIX + '/preorder/newPreorder',
  preorderList: GG_URL_PREFIX + '/preorder/list',
  getPreorder: GG_URL_PREFIX + '/preorder/get',
  deletePreorder: GG_URL_PREFIX + '/preorder/delete',
  editPreorder: GG_URL_PREFIX + '/preorder/edit',
  preorderListExport: GG_URL_PREFIX + '/preorder/export'
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

export function preorderListExport (parameter) {
  return request({
    url: preorderApi.preorderListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  }).then(response => {
    download(response) // then直接下载，方法在下边
  })
}
