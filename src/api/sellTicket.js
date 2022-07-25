import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'
import { download } from '@/utils/util'

export const sellTicketApi = {
  newSellTicket: GG_URL_PREFIX + '/sellTicket/newSellTicket',
  sellTicketList: GG_URL_PREFIX + '/sellTicket/list',
  getSellTicket: GG_URL_PREFIX + '/sellTicket/get',
  deleteSellTicket: GG_URL_PREFIX + '/sellTicket/delete',
  editSellTicket: GG_URL_PREFIX + '/sellTicket/edit',
  sellTicketListExport: GG_URL_PREFIX + '/sellTicket/export',
  importSellTicket: GG_URL_PREFIX + '/sellTicket/import',
  sellTicketRemainList: GG_URL_PREFIX + '/sellTicket/getRemainTicketWeight'
}

export function newSellTicket (parameter) {
  return request({
    url: sellTicketApi.newSellTicket,
    method: 'post',
    params: parameter
  })
}

export function editSellTicket (parameter) {
  return request({
    url: sellTicketApi.editSellTicket,
    method: 'post',
    params: parameter
  })
}

export function sellTicketList (parameter) {
  return request({
    url: sellTicketApi.sellTicketList,
    method: 'get',
    params: parameter
  })
}

export function getSellTicket (parameter) {
  return request({
    url: sellTicketApi.getSellTicket,
    method: 'get',
    params: parameter
  })
}

export function deleteSellTicket () {
  return request({
    url: sellTicketApi.deleteSellTicket,
    method: 'get'
  })
}

export function importSellTicket (parameter) {
  return request({
    url: sellTicketApi.importSellTicket,
    method: 'post',
    params: parameter
  })
}

export function sellTicketListExport (parameter) {
  return request({
    url: sellTicketApi.sellTicketListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  }).then(response => {
    download(response) // then直接下载，方法在下边
  })
}

export function sellTicketRemainList (parameter) {
  return request({
    url: sellTicketApi.sellTicketRemainList,
    method: 'get',
    params: parameter
  })
}
