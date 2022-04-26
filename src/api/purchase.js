import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const purchaseApi = {
  newPurchase: GG_URL_PREFIX + '/purchase/newPurchase',
  purchaseList: GG_URL_PREFIX + '/purchase/list',
  getPurchase: GG_URL_PREFIX + '/purchase/get',
  deletePurchase: GG_URL_PREFIX + '/purchase/delete',
  editPurchase: GG_URL_PREFIX + '/purchase/edit'
}

export function newPurchase (parameter) {
  return request({
    url: purchaseApi.newPurchase,
    method: 'post',
    params: parameter
  })
}

export function editPurchase (parameter) {
  return request({
    url: purchaseApi.editPurchase,
    method: 'post',
    params: parameter
  })
}

export function purchaseList (parameter) {
  return request({
    url: purchaseApi.purchaseList,
    method: 'get',
    params: parameter
  })
}

export function getPurchase (parameter) {
  return request({
    url: purchaseApi.getPurchase,
    method: 'get',
    params: parameter
  })
}

export function deletePurchase () {
  return request({
    url: purchaseApi.deletePurchase,
    method: 'get'
  })
}
