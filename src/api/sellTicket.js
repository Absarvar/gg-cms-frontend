import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

export const sellTicketApi = {
  newSellTicket: GG_URL_PREFIX + '/sellTicket/newSellTicket',
  sellTicketList: GG_URL_PREFIX + '/sellTicket/list',
  getSellTicket: GG_URL_PREFIX + '/sellTicket/get',
  deleteSellTicket: GG_URL_PREFIX + '/sellTicket/delete',
  importSellTicket: GG_URL_PREFIX + '/sellTicket/import',
  editSellTicket: GG_URL_PREFIX + '/sellTicket/edit'
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
