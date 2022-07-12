import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const entryApplyApi = {
  newEntryApply: GG_URL_PREFIX + '/entryApply/newEntryApply',
  entryApplyList: GG_URL_PREFIX + '/entryApply/list',
  getEntryApply: GG_URL_PREFIX + '/entryApply/get',
  deleteEntryApply: GG_URL_PREFIX + '/entryApply/delete',
  entryApplyListTree: GG_URL_PREFIX + '/entryApply/listTree',
  editEntryApply: GG_URL_PREFIX + '/entryApply/edit'
}

export function newEntryApply (parameter) {
  return request({
    url: entryApplyApi.newEntryApply,
    method: 'post',
    params: parameter
  })
}

export function editEntryApply (parameter) {
  return request({
    url: entryApplyApi.editEntryApply,
    method: 'post',
    params: parameter
  })
}

export function entryApplyList (parameter) {
  return request({
    url: entryApplyApi.entryApplyList,
    method: 'get',
    params: parameter
  })
}

export function getEntryApply (parameter) {
  return request({
    url: entryApplyApi.getEntryApply,
    method: 'get',
    params: parameter
  })
}

export function deleteEntryApply (parameter) {
  return request({
    url: entryApplyApi.deleteEntryApply,
    method: 'post',
    params: parameter
  })
}

export function entryApplyListTree (parameter) {
  return request({
    url: entryApplyApi.entryApplyListTree,
    method: 'get',
    params: parameter
  })
}
