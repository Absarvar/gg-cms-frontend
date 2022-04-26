import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const sampleTestApi = {
  newSampleTest: GG_URL_PREFIX + '/sampleTest/newSampleTest',
  sampleTestList: GG_URL_PREFIX + '/sampleTest/list',
  getSampleTest: GG_URL_PREFIX + '/sampleTest/get',
  deleteSampleTest: GG_URL_PREFIX + '/sampleTest/delete',
  editSampleTest: GG_URL_PREFIX + '/sampleTest/edit'
}

export function newSampleTest (parameter) {
  return request({
    url: sampleTestApi.newSampleTest,
    method: 'post',
    params: parameter
  })
}

export function editSampleTest (parameter) {
  return request({
    url: sampleTestApi.editSampleTest,
    method: 'post',
    params: parameter
  })
}

export function sampleTestList (parameter) {
  return request({
    url: sampleTestApi.sampleTestList,
    method: 'get',
    params: parameter
  })
}

export function getSampleTest (parameter) {
  return request({
    url: sampleTestApi.getSampleTest,
    method: 'get',
    params: parameter
  })
}

export function deleteSampleTest () {
  return request({
    url: sampleTestApi.deleteSampleTest,
    method: 'get'
  })
}
