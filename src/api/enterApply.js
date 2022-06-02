import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const enterApplyApi = {
  newEnterApply: GG_URL_PREFIX + '/enterApply/newEnterApply',
  enterApplyList: GG_URL_PREFIX + '/enterApply/list',
  getEnterApply: GG_URL_PREFIX + '/enterApply/get',
  deleteEnterApply: GG_URL_PREFIX + '/enterApply/delete',
  editEnterApply: GG_URL_PREFIX + '/enterApply/edit',
  enterApplyListTree: GG_URL_PREFIX + '/enterApply/listTree'
}

export function newEnterApply (parameter) {
  return request({
    url: enterApplyApi.newEnterApply,
    method: 'post',
    params: parameter
  })
}

export function editEnterApply (parameter) {
  return request({
    url: enterApplyApi.editEnterApply,
    method: 'post',
    params: parameter
  })
}

export function enterApplyList (parameter) {
  return request({
    url: enterApplyApi.enterApplyList,
    method: 'get',
    params: parameter
  })
}

export function getEnterApply (parameter) {
  return request({
    url: enterApplyApi.getEnterApply,
    method: 'get',
    params: parameter
  })
}

export function deleteEnterApply () {
  return request({
    url: enterApplyApi.deleteEnterApply,
    method: 'get'
  })
}

export function enterApplyListTree (parameter) {
  return request({
    url: enterApplyApi.enterApplyListTree,
    method: 'get',
    params: parameter
  })
}
