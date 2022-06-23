import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

export const processDetailApi = {
  newProcessDetail: GG_URL_PREFIX + '/processDetail/newProcessDetail',
  processDetailList: GG_URL_PREFIX + '/processDetail/list',
  getProcessDetail: GG_URL_PREFIX + '/processDetail/get',
  deleteProcessDetail: GG_URL_PREFIX + '/processDetail/delete',
  editProcessDetail: GG_URL_PREFIX + '/processDetail/edit',
  importProcessDetail: GG_URL_PREFIX + '/processDetail/import'
}

export function newProcessDetail (parameter) {
  return request({
    url: processDetailApi.newProcessDetail,
    method: 'post',
    params: parameter
  })
}

export function editProcessDetail (parameter) {
  return request({
    url: processDetailApi.editProcessDetail,
    method: 'post',
    params: parameter
  })
}

export function processDetailList (parameter) {
  return request({
    url: processDetailApi.processDetailList,
    method: 'get',
    params: parameter
  })
}

export function getProcessDetail (parameter) {
  return request({
    url: processDetailApi.getProcessDetail,
    method: 'get',
    params: parameter
  })
}

export function deleteProcessDetail () {
  return request({
    url: processDetailApi.deleteProcessDetail,
    method: 'get'
  })
}
