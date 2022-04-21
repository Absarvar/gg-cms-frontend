import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const streamApi = {
  newStream: GG_URL_PREFIX + '/stream/newStream',
  streamList: GG_URL_PREFIX + '/stream/list',
  getStream: GG_URL_PREFIX + '/stream/get',
  deleteStream: GG_URL_PREFIX + '/stream/delete',
  editStream: GG_URL_PREFIX + '/stream/edit'
}

export function newStream (parameter) {
  return request({
    url: streamApi.newStream,
    method: 'post',
    params: parameter
  })
}

export function editStream (parameter) {
  return request({
    url: streamApi.editStream,
    method: 'post',
    params: parameter
  })
}

export function streamList (parameter) {
  return request({
    url: streamApi.streamList,
    method: 'get',
    params: parameter
  })
}

export function getStream (parameter) {
  return request({
    url: streamApi.getStream,
    method: 'get',
    params: parameter
  })
}

export function deleteStream () {
  return request({
    url: streamApi.deleteStream,
    method: 'get'
  })
}
