import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const pdProductApi = {
  newPdProduct: GG_URL_PREFIX + '/pdProduct/newPdProduct',
  pdProductList: GG_URL_PREFIX + '/pdProduct/list',
  getPdProduct: GG_URL_PREFIX + '/pdProduct/get',
  deletePdProduct: GG_URL_PREFIX + '/pdProduct/delete',
  editPdProduct: GG_URL_PREFIX + '/pdProduct/edit'
}

export function newPdProduct (parameter) {
  return request({
    url: pdProductApi.newPdProduct,
    method: 'post',
    params: parameter
  })
}

export function editPdProduct (parameter) {
  return request({
    url: pdProductApi.editPdProduct,
    method: 'post',
    params: parameter
  })
}

export function pdProductList (parameter) {
  return request({
    url: pdProductApi.pdProductList,
    method: 'get',
    params: parameter
  })
}

export function getPdProduct (parameter) {
  return request({
    url: pdProductApi.getPdProduct,
    method: 'get',
    params: parameter
  })
}

export function deletePdProduct () {
  return request({
    url: pdProductApi.deletePdProduct,
    method: 'get'
  })
}
