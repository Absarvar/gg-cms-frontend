import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const orderApi = {
  newOrder: GG_URL_PREFIX + '/order/newOrder',
  orderList: GG_URL_PREFIX + '/order/list',
  getOrder: GG_URL_PREFIX + '/order/get',
  deleteOrder: GG_URL_PREFIX + '/order/delete',
  editOrder: GG_URL_PREFIX + '/order/edit'
}

export function newOrder (parameter) {
  return request({
    url: orderApi.newOrder,
    method: 'post',
    params: parameter
  })
}

export function editOrder (parameter) {
  return request({
    url: orderApi.editOrder,
    method: 'post',
    params: parameter
  })
}

export function orderList (parameter) {
  return request({
    url: orderApi.orderList,
    method: 'get',
    params: parameter
  })
}

export function getOrder (parameter) {
  return request({
    url: orderApi.getOrder,
    method: 'get',
    params: parameter
  })
}

export function deleteOrder () {
  return request({
    url: orderApi.deleteOrder,
    method: 'get'
  })
}
