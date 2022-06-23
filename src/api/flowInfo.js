import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

export const flowInfoApi = {
  newFlowInfo: GG_URL_PREFIX + '/flowInfo/newFlowInfo',
  flowInfoList: GG_URL_PREFIX + '/flowInfo/list',
  getFlowInfo: GG_URL_PREFIX + '/flowInfo/get',
  deleteFlowInfo: GG_URL_PREFIX + '/flowInfo/delete',
  editFlowInfo: GG_URL_PREFIX + '/flowInfo/edit',
  importFlowInfo: GG_URL_PREFIX + '/flowInfo/import'
}

export function newFlowInfo (parameter) {
  return request({
    url: flowInfoApi.newFlowInfo,
    method: 'post',
    params: parameter
  })
}

export function editFlowInfo (parameter) {
  return request({
    url: flowInfoApi.editFlowInfo,
    method: 'post',
    params: parameter
  })
}

export function flowInfoList (parameter) {
  return request({
    url: flowInfoApi.flowInfoList,
    method: 'get',
    params: parameter
  })
}

export function getFlowInfo (parameter) {
  return request({
    url: flowInfoApi.getFlowInfo,
    method: 'get',
    params: parameter
  })
}

export function deleteFlowInfo () {
  return request({
    url: flowInfoApi.deleteFlowInfo,
    method: 'get'
  })
}
