import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const announcementApi = {
  newAnnouncement: GG_URL_PREFIX + '/announcement/newAnnouncement',
  announcementList: GG_URL_PREFIX + '/announcement/list',
  getAnnouncement: GG_URL_PREFIX + '/announcement/get',
  deleteAnnouncement: GG_URL_PREFIX + '/announcement/delete',
  editAnnouncement: GG_URL_PREFIX + '/announcement/edit'
}

export function newAnnouncement (parameter) {
  return request({
    url: announcementApi.newAnnouncement,
    method: 'post',
    params: parameter
  })
}

export function editAnnouncement (parameter) {
  return request({
    url: announcementApi.editAnnouncement,
    method: 'post',
    params: parameter
  })
}

export function announcementList (parameter) {
  return request({
    url: announcementApi.announcementList,
    method: 'get',
    params: parameter
  })
}

export function getAnnouncement (parameter) {
  return request({
    url: announcementApi.getAnnouncement,
    method: 'get',
    params: parameter
  })
}

export function deleteAnnouncement () {
  return request({
    url: announcementApi.deleteAnnouncement,
    method: 'get'
  })
}
