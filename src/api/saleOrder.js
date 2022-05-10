import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const saleOrderApi = {
  newSaleOrder: GG_URL_PREFIX + '/saleOrder/newSaleOrder',
  saleOrderList: GG_URL_PREFIX + '/saleOrder/list',
  outStockList: GG_URL_PREFIX + '/saleOrder/outStockList',
  getSaleOrder: GG_URL_PREFIX + '/saleOrder/get',
  deleteSaleOrder: GG_URL_PREFIX + '/saleOrder/delete',
  editSaleOrder: GG_URL_PREFIX + '/saleOrder/edit'
}

export function newSaleOrder (parameter) {
  return request({
    url: saleOrderApi.newSaleOrder,
    method: 'post',
    params: parameter
  })
}

export function editSaleOrder (parameter) {
  return request({
    url: saleOrderApi.editSaleOrder,
    method: 'post',
    params: parameter
  })
}

export function saleOrderList (parameter) {
  return request({
    url: saleOrderApi.saleOrderList,
    method: 'get',
    params: parameter
  })
}

export function outStockList (parameter) {
  return request({
    url: saleOrderApi.outStockList,
    method: 'get',
    params: parameter
  })
}

export function getSaleOrder (parameter) {
  return request({
    url: saleOrderApi.getSaleOrder,
    method: 'get',
    params: parameter
  })
}

export function deleteSaleOrder () {
  return request({
    url: saleOrderApi.deleteSaleOrder,
    method: 'get'
  })
}
