import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const agreementApi = {
  newAgreement: GG_URL_PREFIX + '/agreement/newAgreement',
  agreementList: GG_URL_PREFIX + '/agreement/list',
  getAgreement: GG_URL_PREFIX + '/agreement/get',
  deleteAgreement: GG_URL_PREFIX + '/agreement/delete',
  editAgreement: GG_URL_PREFIX + '/agreement/edit'
}

export function newAgreement (parameter) {
  return request({
    url: agreementApi.newAgreement,
    method: 'post',
    params: parameter
  })
}

export function editAgreement (parameter) {
  return request({
    url: agreementApi.editAgreement,
    method: 'post',
    params: parameter
  })
}

export function agreementList (parameter) {
  return request({
    url: agreementApi.agreementList,
    method: 'get',
    params: parameter
  })
}

export function getAgreement (parameter) {
  return request({
    url: agreementApi.getAgreement,
    method: 'get',
    params: parameter
  })
}

export function deleteAgreement () {
  return request({
    url: agreementApi.deleteAgreement,
    method: 'get'
  })
}
