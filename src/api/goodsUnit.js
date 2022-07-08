import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const goodsUnitApi = {
  newGoodsUnit: GG_URL_PREFIX + '/goodsUnit/newGoodsUnit',
  goodsUnitList: GG_URL_PREFIX + '/goodsUnit/list',
  getGoodsUnit: GG_URL_PREFIX + '/goodsUnit/get',
  deleteGoodsUnit: GG_URL_PREFIX + '/goodsUnit/delete',
  editGoodsUnit: GG_URL_PREFIX + '/goodsUnit/edit'
}

export function newGoodsUnit (parameter) {
  return request({
    url: goodsUnitApi.newGoodsUnit,
    method: 'post',
    params: parameter
  })
}

export function editGoodsUnit (parameter) {
  return request({
    url: goodsUnitApi.editGoodsUnit,
    method: 'post',
    params: parameter
  })
}

export function goodsUnitList (parameter) {
  return request({
    url: goodsUnitApi.goodsUnitList,
    method: 'get',
    params: parameter
  })
}

export function getGoodsUnit (parameter) {
  return request({
    url: goodsUnitApi.getGoodsUnit,
    method: 'get',
    params: parameter
  })
}

export function deleteGoodsUnit () {
  return request({
    url: goodsUnitApi.deleteGoodsUnit,
    method: 'get'
  })
}
