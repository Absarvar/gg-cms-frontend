import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const sourceTrackApi = {
  newSourceTrack: GG_URL_PREFIX + '/sourceTrack/newSourceTrack',
  sourceTrackList: GG_URL_PREFIX + '/sourceTrack/list',
  getSourceTrack: GG_URL_PREFIX + '/sourceTrack/get',
  deleteSourceTrack: GG_URL_PREFIX + '/sourceTrack/delete',
  editSourceTrack: GG_URL_PREFIX + '/sourceTrack/edit'
}

export function newSourceTrack (parameter) {
  return request({
    url: sourceTrackApi.newSourceTrack,
    method: 'post',
    params: parameter
  })
}

export function editSourceTrack (parameter) {
  return request({
    url: sourceTrackApi.editSourceTrack,
    method: 'post',
    params: parameter
  })
}

export function sourceTrackList (parameter) {
  return request({
    url: sourceTrackApi.sourceTrackList,
    method: 'get',
    params: parameter
  })
}

export function getSourceTrack (parameter) {
  return request({
    url: sourceTrackApi.getSourceTrack,
    method: 'get',
    params: parameter
  })
}

export function deleteSourceTrack () {
  return request({
    url: sourceTrackApi.deleteSourceTrack,
    method: 'get'
  })
}
