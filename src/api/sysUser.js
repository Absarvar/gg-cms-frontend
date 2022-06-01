import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const sysUserApi = {
  newSysUser: GG_URL_PREFIX + '/sysUser/newSysUser',
  sysUserList: GG_URL_PREFIX + '/sysUser/list',
  getSysUser: GG_URL_PREFIX + '/sysUser/get',
  deleteSysUser: GG_URL_PREFIX + '/sysUser/delete',
  editSysUser: GG_URL_PREFIX + '/sysUser/edit'
}

export function newSysUser (parameter) {
  return request({
    url: sysUserApi.newSysUser,
    method: 'post',
    params: parameter
  })
}

export function editSysUser (parameter) {
  return request({
    url: sysUserApi.editSysUser,
    method: 'post',
    params: parameter
  })
}

export function sysUserList (parameter) {
  return request({
    url: sysUserApi.sysUserList,
    method: 'get',
    params: parameter
  })
}

export function getSysUser (parameter) {
  return request({
    url: sysUserApi.getSysUser,
    method: 'get',
    params: parameter
  })
}

export function deleteSysUser () {
  return request({
    url: sysUserApi.deleteSysUser,
    method: 'get'
  })
}
