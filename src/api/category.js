import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const categoryApi = {
  newCategory: GG_URL_PREFIX + '/category/newCategory',
  categoryList: GG_URL_PREFIX + '/category/list',
  getCategory: GG_URL_PREFIX + '/category/get',
  deleteCategory: GG_URL_PREFIX + '/category/delete',
  editCategory: GG_URL_PREFIX + '/category/edit'
}

export function newCategory (parameter) {
  return request({
    url: categoryApi.newCategory,
    method: 'post',
    params: parameter
  })
}

export function editCategory (parameter) {
  return request({
    url: categoryApi.editCategory,
    method: 'post',
    params: parameter
  })
}

export function categoryList (parameter) {
  return request({
    url: categoryApi.categoryList,
    method: 'get',
    params: parameter
  })
}

export function getCategory (parameter) {
  return request({
    url: categoryApi.getCategory,
    method: 'get',
    params: parameter
  })
}

export function deleteCategory () {
  return request({
    url: categoryApi.deleteCategory,
    method: 'get'
  })
}
