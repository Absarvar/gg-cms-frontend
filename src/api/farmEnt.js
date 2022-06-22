import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const farmEntApi = {
  newFarmEnt: GG_URL_PREFIX + '/farmEnt/newFarmEnt',
  farmEntList: GG_URL_PREFIX + '/farmEnt/list',
  getFarmEnt: GG_URL_PREFIX + '/farmEnt/get',
  deleteFarmEnt: GG_URL_PREFIX + '/farmEnt/delete',
  editFarmEnt: GG_URL_PREFIX + '/farmEnt/edit'
}

export function newFarmEnt (parameter) {
  return request({
    url: farmEntApi.newFarmEnt,
    method: 'post',
    params: parameter
  })
}

export function editFarmEnt (parameter) {
  return request({
    url: farmEntApi.editFarmEnt,
    method: 'post',
    params: parameter
  })
}

export function farmEntList (parameter) {
  return request({
    url: farmEntApi.farmEntList,
    method: 'get',
    params: parameter
  })
}

export function getFarmEnt (parameter) {
  return request({
    url: farmEntApi.getFarmEnt,
    method: 'get',
    params: parameter
  })
}

export function deleteFarmEnt () {
  return request({
    url: farmEntApi.deleteFarmEnt,
    method: 'get'
  })
}
