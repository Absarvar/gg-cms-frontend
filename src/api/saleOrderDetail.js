import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const saleOrderDetailApi = {
  newSaleOrderDetail: GG_URL_PREFIX + '/saleOrderDetail/newSaleOrderDetail',
  saleOrderDetailList: GG_URL_PREFIX + '/saleOrderDetail/list',
  getSaleOrderDetail: GG_URL_PREFIX + '/saleOrderDetail/get',
  deleteSaleOrderDetail: GG_URL_PREFIX + '/saleOrderDetail/delete',
  editSaleOrderDetail: GG_URL_PREFIX + '/saleOrderDetail/edit'
}

export function newSaleOrderDetail (parameter) {
  return request({
    url: saleOrderDetailApi.newSaleOrderDetail,
    method: 'post',
    params: parameter
  })
}

export function editSaleOrderDetail (parameter) {
  return request({
    url: saleOrderDetailApi.editSaleOrderDetail,
    method: 'post',
    params: parameter
  })
}

export function saleOrderDetailList (parameter) {
  return request({
    url: saleOrderDetailApi.saleOrderDetailList,
    method: 'get',
    params: parameter
  })
}

export function getSaleOrderDetail (parameter) {
  return request({
    url: saleOrderDetailApi.getSaleOrderDetail,
    method: 'get',
    params: parameter
  })
}

export function deleteSaleOrderDetail () {
  return request({
    url: saleOrderDetailApi.deleteSaleOrderDetail,
    method: 'get'
  })
}
