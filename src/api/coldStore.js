import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const coldStoreApi = {
  newColdStore: GG_URL_PREFIX + '/coldStore/newColdStore',
  coldStoreList: GG_URL_PREFIX + '/coldStore/list',
  getColdStore: GG_URL_PREFIX + '/coldStore/get',
  deleteColdStore: GG_URL_PREFIX + '/coldStore/delete',
  editColdStore: GG_URL_PREFIX + '/coldStore/edit'
}

export function newColdStore (parameter) {
  return request({
    url: coldStoreApi.newColdStore,
    method: 'post',
    params: parameter
  })
}

export function editColdStore (parameter) {
  return request({
    url: coldStoreApi.editColdStore,
    method: 'post',
    params: parameter
  })
}

export function coldStoreList (parameter) {
  return request({
    url: coldStoreApi.coldStoreList,
    method: 'get',
    params: parameter
  })
}

export function getColdStore (parameter) {
  return request({
    url: coldStoreApi.getColdStore,
    method: 'get',
    params: parameter
  })
}

export function deleteColdStore () {
  return request({
    url: coldStoreApi.deleteColdStore,
    method: 'get'
  })
}
