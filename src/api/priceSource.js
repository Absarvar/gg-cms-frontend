import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const priceSourceApi = {
  newPriceSource: GG_URL_PREFIX + '/priceSource/newPriceSource',
  priceSourceList: GG_URL_PREFIX + '/priceSource/list',
  getPriceSource: GG_URL_PREFIX + '/priceSource/get',
  deletePriceSource: GG_URL_PREFIX + '/priceSource/delete',
  editPriceSource: GG_URL_PREFIX + '/priceSource/edit'
}

export function newPriceSource (parameter) {
  return request({
    url: priceSourceApi.newPriceSource,
    method: 'post',
    params: parameter
  })
}

export function editPriceSource (parameter) {
  return request({
    url: priceSourceApi.editPriceSource,
    method: 'post',
    params: parameter
  })
}

export function priceSourceList (parameter) {
  return request({
    url: priceSourceApi.priceSourceList,
    method: 'get',
    params: parameter
  })
}

export function getPriceSource (parameter) {
  return request({
    url: priceSourceApi.getPriceSource,
    method: 'get',
    params: parameter
  })
}

export function deletePriceSource () {
  return request({
    url: priceSourceApi.deletePriceSource,
    method: 'get'
  })
}
