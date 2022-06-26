import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const butcherEntApi = {
  newButcherEnt: GG_URL_PREFIX + '/butcherEnt/newButcherEnt',
  butcherEntList: GG_URL_PREFIX + '/butcherEnt/list',
  getButcherEnt: GG_URL_PREFIX + '/butcherEnt/get',
  deleteButcherEnt: GG_URL_PREFIX + '/butcherEnt/delete',
  editButcherEnt: GG_URL_PREFIX + '/butcherEnt/edit',
  sourceEntList: GG_URL_PREFIX + '/butcherEnt/listSourceEnt'
}

export function newButcherEnt (parameter) {
  return request({
    url: butcherEntApi.newButcherEnt,
    method: 'post',
    params: parameter
  })
}

export function editButcherEnt (parameter) {
  return request({
    url: butcherEntApi.editButcherEnt,
    method: 'post',
    params: parameter
  })
}

export function butcherEntList (parameter) {
  return request({
    url: butcherEntApi.butcherEntList,
    method: 'get',
    params: parameter
  })
}

export function getButcherEnt (parameter) {
  return request({
    url: butcherEntApi.getButcherEnt,
    method: 'get',
    params: parameter
  })
}

export function deleteButcherEnt () {
  return request({
    url: butcherEntApi.deleteButcherEnt,
    method: 'get'
  })
}

export function sourceEntList (parameter) {
  return request({
    url: butcherEntApi.sourceEntList,
    method: 'get',
    params: parameter
  })
}
