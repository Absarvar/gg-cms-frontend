import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const harmlessfyApi = {
  newHarmlessfy: GG_URL_PREFIX + '/harmlessfy/newHarmlessfy',
  harmlessfyList: GG_URL_PREFIX + '/harmlessfy/list',
  getHarmlessfy: GG_URL_PREFIX + '/harmlessfy/get',
  deleteHarmlessfy: GG_URL_PREFIX + '/harmlessfy/delete',
  editHarmlessfy: GG_URL_PREFIX + '/harmlessfy/edit'
}

export function newHarmlessfy (parameter) {
  return request({
    url: harmlessfyApi.newHarmlessfy,
    method: 'post',
    params: parameter
  })
}

export function editHarmlessfy (parameter) {
  return request({
    url: harmlessfyApi.editHarmlessfy,
    method: 'post',
    params: parameter
  })
}

export function harmlessfyList (parameter) {
  return request({
    url: harmlessfyApi.harmlessfyList,
    method: 'get',
    params: parameter
  })
}

export function getHarmlessfy (parameter) {
  return request({
    url: harmlessfyApi.getHarmlessfy,
    method: 'get',
    params: parameter
  })
}

export function deleteHarmlessfy () {
  return request({
    url: harmlessfyApi.deleteHarmlessfy,
    method: 'get'
  })
}
