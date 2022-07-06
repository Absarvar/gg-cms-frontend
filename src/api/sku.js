import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const skuApi = {
  newSku: GG_URL_PREFIX + '/sku/newSku',
  skuList: GG_URL_PREFIX + '/sku/list',
  getSku: GG_URL_PREFIX + '/sku/get',
  deleteSku: GG_URL_PREFIX + '/sku/delete',
  editSku: GG_URL_PREFIX + '/sku/edit',
  listAll: GG_URL_PREFIX + '/sku/listAll'
}

export function newSku (parameter) {
  return request({
    url: skuApi.newSku,
    method: 'post',
    params: parameter
  })
}

export function editSku (parameter) {
  return request({
    url: skuApi.editSku,
    method: 'post',
    params: parameter
  })
}

export function skuList (parameter) {
  return request({
    url: skuApi.skuList,
    method: 'get',
    params: parameter
  })
}

export function getSku (parameter) {
  return request({
    url: skuApi.getSku,
    method: 'get',
    params: parameter
  })
}

export function deleteSku () {
  return request({
    url: skuApi.deleteSku,
    method: 'get'
  })
}

export function skuListAll (parameter) {
  return request({
    url: skuApi.listAll,
    method: 'get',
    params: parameter
  })
}
