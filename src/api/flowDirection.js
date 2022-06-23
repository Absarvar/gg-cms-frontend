import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const flowDirectionApi = {
  newFlowDirection: GG_URL_PREFIX + '/flowDirection/newFlowDirection',
  flowDirectionList: GG_URL_PREFIX + '/flowDirection/list',
  getFlowDirection: GG_URL_PREFIX + '/flowDirection/get',
  deleteFlowDirection: GG_URL_PREFIX + '/flowDirection/delete',
  editFlowDirection: GG_URL_PREFIX + '/flowDirection/edit'
}

export function newFlowDirection (parameter) {
  return request({
    url: flowDirectionApi.newFlowDirection,
    method: 'post',
    params: parameter
  })
}

export function editFlowDirection (parameter) {
  return request({
    url: flowDirectionApi.editFlowDirection,
    method: 'post',
    params: parameter
  })
}

export function flowDirectionList (parameter) {
  return request({
    url: flowDirectionApi.flowDirectionList,
    method: 'get',
    params: parameter
  })
}

export function getFlowDirection (parameter) {
  return request({
    url: flowDirectionApi.getFlowDirection,
    method: 'get',
    params: parameter
  })
}

export function deleteFlowDirection () {
  return request({
    url: flowDirectionApi.deleteFlowDirection,
    method: 'get'
  })
}
