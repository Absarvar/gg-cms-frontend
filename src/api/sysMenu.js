import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const sysMenuApi = {
  newSysMenu: GG_URL_PREFIX + '/sysMenu/newSysMenu',
  sysMenuList: GG_URL_PREFIX + '/sysMenu/list',
  getSysMenu: GG_URL_PREFIX + '/sysMenu/get',
  deleteSysMenu: GG_URL_PREFIX + '/sysMenu/delete',
  editSysMenu: GG_URL_PREFIX + '/sysMenu/edit'
}

export function newSysMenu (parameter) {
  return request({
    url: sysMenuApi.newSysMenu,
    method: 'post',
    params: parameter
  })
}

export function editSysMenu (parameter) {
  return request({
    url: sysMenuApi.editSysMenu,
    method: 'post',
    params: parameter
  })
}

export function sysMenuList (parameter) {
  return request({
    url: sysMenuApi.sysMenuList,
    method: 'get',
    params: parameter
  })
}

export function getSysMenu (parameter) {
  return request({
    url: sysMenuApi.getSysMenu,
    method: 'get',
    params: parameter
  })
}

export function deleteSysMenu () {
  return request({
    url: sysMenuApi.deleteSysMenu,
    method: 'get'
  })
}
