import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const purchaseOrderApi = {
  newPurchaseOrder: GG_URL_PREFIX + '/purchaseOrder/newPurchaseOrder',
  purchaseOrderList: GG_URL_PREFIX + '/purchaseOrder/list',
  getPurchaseOrder: GG_URL_PREFIX + '/purchaseOrder/get',
  deletePurchaseOrder: GG_URL_PREFIX + '/purchaseOrder/delete',
  editPurchaseOrder: GG_URL_PREFIX + '/purchaseOrder/edit'
}

export function newPurchaseOrder (parameter) {
  return request({
    url: purchaseOrderApi.newPurchaseOrder,
    method: 'post',
    params: parameter
  })
}

export function editPurchaseOrder (parameter) {
  return request({
    url: purchaseOrderApi.editPurchaseOrder,
    method: 'post',
    params: parameter
  })
}

export function purchaseOrderList (parameter) {
  return request({
    url: purchaseOrderApi.purchaseOrderList,
    method: 'get',
    params: parameter
  })
}

export function getPurchaseOrder (parameter) {
  return request({
    url: purchaseOrderApi.getPurchaseOrder,
    method: 'get',
    params: parameter
  })
}

export function deletePurchaseOrder () {
  return request({
    url: purchaseOrderApi.deletePurchaseOrder,
    method: 'get'
  })
}
