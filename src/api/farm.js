import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const farmApi = {
  newFarm: GG_URL_PREFIX + '/farm/newFarm',
  farmList: GG_URL_PREFIX + '/farm/list',
  getFarm: GG_URL_PREFIX + '/farm/get',
  deleteFarm: GG_URL_PREFIX + '/farm/delete',
  editFarm: GG_URL_PREFIX + '/farm/edit'
}

export function newFarm (parameter) {
  return request({
    url: farmApi.newFarm,
    method: 'post',
    params: parameter
  })
}

export function editFarm (parameter) {
  return request({
    url: farmApi.editFarm,
    method: 'post',
    params: parameter
  })
}

export function farmList (parameter) {
  return request({
    url: farmApi.farmList,
    method: 'get',
    params: parameter
  })
}

export function getFarm (parameter) {
  return request({
    url: farmApi.getFarm,
    method: 'get',
    params: parameter
  })
}

export function deleteFarm () {
  return request({
    url: farmApi.deleteFarm,
    method: 'get'
  })
}
