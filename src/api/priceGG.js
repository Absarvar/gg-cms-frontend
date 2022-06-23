import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const priceGGApi = {
  newPriceGG: GG_URL_PREFIX + '/priceGG/newPriceGG',
  priceGGList: GG_URL_PREFIX + '/priceGG/list',
  getPriceGG: GG_URL_PREFIX + '/priceGG/get',
  deletePriceGG: GG_URL_PREFIX + '/priceGG/delete',
  editPriceGG: GG_URL_PREFIX + '/priceGG/edit'
}

export function newPriceGG (parameter) {
  return request({
    url: priceGGApi.newPriceGG,
    method: 'post',
    params: parameter
  })
}

export function editPriceGG (parameter) {
  return request({
    url: priceGGApi.editPriceGG,
    method: 'post',
    params: parameter
  })
}

export function priceGGList (parameter) {
  return request({
    url: priceGGApi.priceGGList,
    method: 'get',
    params: parameter
  })
}

export function getPriceGG (parameter) {
  return request({
    url: priceGGApi.getPriceGG,
    method: 'get',
    params: parameter
  })
}

export function deletePriceGG () {
  return request({
    url: priceGGApi.deletePriceGG,
    method: 'get'
  })
}
