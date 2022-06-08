import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

export const drawDetailApi = {
  newDrawDetail: GG_URL_PREFIX + '/drawDetail/newDrawDetail',
  drawDetailList: GG_URL_PREFIX + '/drawDetail/list',
  drawDetailStatistic: GG_URL_PREFIX + '/drawDetail/statistic',
  getDrawDetail: GG_URL_PREFIX + '/drawDetail/get',
  deleteDrawDetail: GG_URL_PREFIX + '/drawDetail/delete',
  editDrawDetail: GG_URL_PREFIX + '/drawDetail/edit',
  importDrawDetail: GG_URL_PREFIX + '/drawDetail/import'
}

export function newDrawDetail (parameter) {
  return request({
    url: drawDetailApi.newDrawDetail,
    method: 'post',
    params: parameter
  })
}

export function editDrawDetail (parameter) {
  return request({
    url: drawDetailApi.editDrawDetail,
    method: 'post',
    params: parameter
  })
}

export function drawDetailList (parameter) {
  return request({
    url: drawDetailApi.drawDetailList,
    method: 'get',
    params: parameter
  })
}

export function drawDetailStatistic (parameter) {
  return request({
    url: drawDetailApi.drawDetailStatistic,
    method: 'get',
    params: parameter
  })
}

export function getDrawDetail (parameter) {
  return request({
    url: drawDetailApi.getDrawDetail,
    method: 'get',
    params: parameter
  })
}

export function deleteDrawDetail () {
  return request({
    url: drawDetailApi.deleteDrawDetail,
    method: 'get'
  })
}
