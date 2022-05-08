import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const slaughterHouseApi = {
  newSlaughterHouse: GG_URL_PREFIX + '/slaughterHouse/newSlaughterHouse',
  slaughterHouseList: GG_URL_PREFIX + '/slaughterHouse/list',
  getSlaughterHouse: GG_URL_PREFIX + '/slaughterHouse/get',
  deleteSlaughterHouse: GG_URL_PREFIX + '/slaughterHouse/delete',
  editSlaughterHouse: GG_URL_PREFIX + '/slaughterHouse/edit'
}

export function newSlaughterHouse (parameter) {
  return request({
    url: slaughterHouseApi.newSlaughterHouse,
    method: 'post',
    params: parameter
  })
}

export function editSlaughterHouse (parameter) {
  return request({
    url: slaughterHouseApi.editSlaughterHouse,
    method: 'post',
    params: parameter
  })
}

export function slaughterHouseList (parameter) {
  return request({
    url: slaughterHouseApi.slaughterHouseList,
    method: 'get',
    params: parameter
  })
}

export function getSlaughterHouse (parameter) {
  return request({
    url: slaughterHouseApi.getSlaughterHouse,
    method: 'get',
    params: parameter
  })
}

export function deleteSlaughterHouse () {
  return request({
    url: slaughterHouseApi.deleteSlaughterHouse,
    method: 'get'
  })
}
