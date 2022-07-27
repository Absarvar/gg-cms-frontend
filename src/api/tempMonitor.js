import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

export const tempMonitorApi = {
  newTempMonitor: GG_URL_PREFIX + '/tempMonitor/newTempMonitor',
  tempMonitorList: GG_URL_PREFIX + '/tempMonitor/list',
  getTempMonitor: GG_URL_PREFIX + '/tempMonitor/get',
  deleteTempMonitor: GG_URL_PREFIX + '/tempMonitor/delete',
  editTempMonitor: GG_URL_PREFIX + '/tempMonitor/edit',
  importTempMonitor: GG_URL_PREFIX + '/tempMonitor/import'
}

export function newTempMonitor (parameter) {
  return request({
    url: tempMonitorApi.newTempMonitor,
    method: 'post',
    params: parameter
  })
}

export function editTempMonitor (parameter) {
  return request({
    url: tempMonitorApi.editTempMonitor,
    method: 'post',
    params: parameter
  })
}

export function tempMonitorList (parameter) {
  return request({
    url: tempMonitorApi.tempMonitorList,
    method: 'get',
    params: parameter
  })
}

export function getTempMonitor (parameter) {
  return request({
    url: tempMonitorApi.getTempMonitor,
    method: 'get',
    params: parameter
  })
}

export function deleteTempMonitor () {
  return request({
    url: tempMonitorApi.deleteTempMonitor,
    method: 'get'
  })
}

export function importTempMonitor (parameter) {
  return request({
    url: tempMonitorApi.importTempMonitor,
    method: 'post',
    params: parameter
  })
}
