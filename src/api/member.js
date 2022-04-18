import request from '@/utils/request'
import gg from '@/config/common.config'

const memberApi = {
  newMember: gg.URL + '/member/newMember',
  memberList: gg.URL + '/member/list',
  getMember: gg.URL + '/member/get',
  deleteMember: gg.URL + '/member/delete',
  editMember: gg.URL + '/member/edit'
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
