import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const memberApi = {
  newMember: GG_URL_PREFIX + '/member/newMember',
  memberList: GG_URL_PREFIX + '/member/list',
  getMember: GG_URL_PREFIX + '/member/get',
  deleteMember: GG_URL_PREFIX + '/member/delete',
  editMember: GG_URL_PREFIX + '/member/edit'
}

export function newMember (parameter) {
  return request({
    url: memberApi.newMember,
    method: 'post',
    params: parameter
  })
}

export function editMember (parameter) {
  return request({
    url: memberApi.editMember,
    method: 'post',
    params: parameter
  })
}

export function memberList (parameter) {
  return request({
    url: memberApi.memberList,
    method: 'get',
    params: parameter
  })
}

export function getMember (parameter) {
  return request({
    url: memberApi.getMember,
    method: 'get',
    params: parameter
  })
}

export function deleteMember () {
  return request({
    url: memberApi.deleteMember,
    method: 'get'
  })
}
