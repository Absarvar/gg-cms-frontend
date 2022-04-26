import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const flowApi = {
  newFlow: GG_URL_PREFIX + '/flow/newFlow',
  flowList: GG_URL_PREFIX + '/flow/list',
  getFlow: GG_URL_PREFIX + '/flow/get',
  deleteFlow: GG_URL_PREFIX + '/flow/delete',
  editFlow: GG_URL_PREFIX + '/flow/edit'
}

export function newFlow (parameter) {
  return request({
    url: flowApi.newFlow,
    method: 'post',
    params: parameter
  })
}

export function editFlow (parameter) {
  return request({
    url: flowApi.editFlow,
    method: 'post',
    params: parameter
  })
}

export function flowList (parameter) {
  return request({
    url: flowApi.flowList,
    method: 'get',
    params: parameter
  })
}

export function getFlow (parameter) {
  return request({
    url: flowApi.getFlow,
    method: 'get',
    params: parameter
  })
}

export function deleteFlow () {
  return request({
    url: flowApi.deleteFlow,
    method: 'get'
  })
}
