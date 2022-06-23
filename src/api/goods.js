import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const goodsApi = {
  newGoods: GG_URL_PREFIX + '/goods/newGoods',
  goodsList: GG_URL_PREFIX + '/goods/list',
  getGoods: GG_URL_PREFIX + '/goods/get',
  deleteGoods: GG_URL_PREFIX + '/goods/delete',
  editGoods: GG_URL_PREFIX + '/goods/edit',
  goodsListAll: GG_URL_PREFIX + '/goods/listAll'
}

export function newGoods (parameter) {
  return request({
    url: goodsApi.newGoods,
    method: 'post',
    params: parameter
  })
}

export function editGoods (parameter) {
  return request({
    url: goodsApi.editGoods,
    method: 'post',
    params: parameter
  })
}

export function goodsList (parameter) {
  return request({
    url: goodsApi.goodsList,
    method: 'get',
    params: parameter
  })
}

export function getGoods (parameter) {
  return request({
    url: goodsApi.getGoods,
    method: 'get',
    params: parameter
  })
}

export function deleteGoods () {
  return request({
    url: goodsApi.deleteGoods,
    method: 'get'
  })
}

export function goodsListAll (parameter) {
  return request({
    url: goodsApi.goodsListAll,
    method: 'get',
    params: parameter
  })
}
