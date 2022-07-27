import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const goodsCodeApi = {
  newGoodsCode: GG_URL_PREFIX + '/goodsCode/newGoodsCode',
  goodsCodeList: GG_URL_PREFIX + '/goodsCode/list',
  getGoodsCode: GG_URL_PREFIX + '/goodsCode/get',
  deleteGoodsCode: GG_URL_PREFIX + '/goodsCode/delete',
  editGoodsCode: GG_URL_PREFIX + '/goodsCode/edit'
}

export function newGoodsCode (parameter) {
  return request({
    url: goodsCodeApi.newGoodsCode,
    method: 'post',
    params: parameter
  })
}

export function editGoodsCode (parameter) {
  return request({
    url: goodsCodeApi.editGoodsCode,
    method: 'post',
    params: parameter
  })
}

export function goodsCodeList (parameter) {
  return request({
    url: goodsCodeApi.goodsCodeList,
    method: 'get',
    params: parameter
  })
}

export function getGoodsCode (parameter) {
  return request({
    url: goodsCodeApi.getGoodsCode,
    method: 'get',
    params: parameter
  })
}

export function deleteGoodsCode () {
  return request({
    url: goodsCodeApi.deleteGoodsCode,
    method: 'get'
  })
}
