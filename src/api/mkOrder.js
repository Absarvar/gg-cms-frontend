import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const mkOrderApi = {
  newMkOrder: GG_URL_PREFIX + '/mkOrder/newMkOrder',
  mkOrderList: GG_URL_PREFIX + '/mkOrder/list',
  getMkOrder: GG_URL_PREFIX + '/mkOrder/get',
  deleteMkOrder: GG_URL_PREFIX + '/mkOrder/delete',
  editMkOrder: GG_URL_PREFIX + '/mkOrder/edit',
  saleDataList: GG_URL_PREFIX + '/mkOrder/saleDataList'
}

export function newMkOrder (parameter) {
  return request({
    url: mkOrderApi.newMkOrder,
    method: 'post',
    params: parameter
  })
}

export function editMkOrder (parameter) {
  return request({
    url: mkOrderApi.editMkOrder,
    method: 'post',
    params: parameter
  })
}

export function mkOrderList (parameter) {
  return request({
    url: mkOrderApi.mkOrderList,
    method: 'get',
    params: parameter
  })
}

export function getMkOrder (parameter) {
  return request({
    url: mkOrderApi.getMkOrder,
    method: 'get',
    params: parameter
  })
}

export function deleteMkOrder () {
  return request({
    url: mkOrderApi.deleteMkOrder,
    method: 'get'
  })
}

export function saleDataList (parameter) {
  return request({
    url: mkOrderApi.saleDataList,
    method: 'get',
    params: parameter
  })
}
