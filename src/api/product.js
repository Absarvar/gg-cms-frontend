import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'
import { download } from '@/utils/util'

const productApi = {
  newProduct: GG_URL_PREFIX + '/product/newProduct',
  productList: GG_URL_PREFIX + '/product/list',
  getProduct: GG_URL_PREFIX + '/product/get',
  deleteProduct: GG_URL_PREFIX + '/product/delete',
  editProduct: GG_URL_PREFIX + '/product/edit',
  frozenStock: GG_URL_PREFIX + '/product/frozenStock',
  outStock: GG_URL_PREFIX + '/product/outStock',
  pdProductListExport: GG_URL_PREFIX + '/product/export',
  productListTree: GG_URL_PREFIX + '/product/listTree'
}

export function newProduct (parameter) {
  return request({
    url: productApi.newProduct,
    method: 'post',
    params: parameter
  })
}

export function editProduct (parameter) {
  return request({
    url: productApi.editProduct,
    method: 'post',
    params: parameter
  })
}

export function productList (parameter) {
  return request({
    url: productApi.productList,
    method: 'get',
    params: parameter
  })
}

export function getProduct (parameter) {
  return request({
    url: productApi.getProduct,
    method: 'get',
    params: parameter
  })
}

export function deleteProduct (parameter) {
  return request({
    url: productApi.deleteProduct,
    method: 'post',
    params: parameter
  })
}

export function frozenStock (parameter) {
  return request({
    url: productApi.frozenStock,
    method: 'post',
    params: parameter
  })
}

export function outStock (parameter) {
  return request({
    url: productApi.outStock,
    method: 'post',
    params: parameter
  })
}

export function productListTree (parameter) {
  return request({
    url: productApi.productListTree,
    method: 'get',
    params: parameter
  })
}

export function pdProductListExport (parameter) {
  return request({
    url: productApi.pdProductListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  }).then(response => {
    download(response) // then直接下载，方法在下边
  })
}
