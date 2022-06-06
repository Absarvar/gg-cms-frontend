import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const pdProductApi = {
  newPdProduct: GG_URL_PREFIX + '/pdProduct/newPdProduct',
  pdProductList: GG_URL_PREFIX + '/pdProduct/list',
  getPdProduct: GG_URL_PREFIX + '/pdProduct/get',
  deletePdProduct: GG_URL_PREFIX + '/pdProduct/delete',
  pdProductListExport: GG_URL_PREFIX + '/pdProduct/export',
  editPdProduct: GG_URL_PREFIX + '/pdProduct/edit'
}

export function newPdProduct (parameter) {
  return request({
    url: pdProductApi.newPdProduct,
    method: 'post',
    params: parameter
  })
}

export function editPdProduct (parameter) {
  return request({
    url: pdProductApi.editPdProduct,
    method: 'post',
    params: parameter
  })
}

export function pdProductList (parameter) {
  return request({
    url: pdProductApi.pdProductList,
    method: 'get',
    params: parameter
  })
}

export function getPdProduct (parameter) {
  return request({
    url: pdProductApi.getPdProduct,
    method: 'get',
    params: parameter
  })
}

export function deletePdProduct () {
  return request({
    url: pdProductApi.deletePdProduct,
    method: 'get'
  })
}

export function pdProductListExport (parameter) {
  return request({
    url: pdProductApi.pdProductListExport,
    method: 'get',
    params: parameter,
    responseType: 'blob'
  }).then(response => {
    download(response) // then直接下载，方法在下边
  })
}
// 下载文件
export function download (res) {
  console.log(res)
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' })// type是文件类，详情可以参阅blob文件类型
  // 创建新的URL并指向File对象或者Blob对象的地址
  const blobURL = window.URL.createObjectURL(blob)
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  // tempLink.setAttribute('download', decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1]))
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  // 挂载a标签
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  // 释放blob URL地址
  window.URL.revokeObjectURL(blobURL)
}
