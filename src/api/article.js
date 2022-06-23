import request from '@/utils/request'
import { GG_URL_PREFIX } from '@/config/common.config'

const articleApi = {
  newArticle: GG_URL_PREFIX + '/article/newArticle',
  articleList: GG_URL_PREFIX + '/article/list',
  getArticle: GG_URL_PREFIX + '/article/get',
  deleteArticle: GG_URL_PREFIX + '/article/delete',
  editArticle: GG_URL_PREFIX + '/article/edit'
}

export function newArticle (parameter) {
  return request({
    url: articleApi.newArticle,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function articleList (parameter) {
  console.log(parameter)
  return request({
    url: articleApi.articleList,
    method: 'get',
    params: parameter
  })
}

export function getArticle (parameter) {
  return request({
    url: articleApi.getArticle,
    method: 'get',
    params: parameter,
    headers: {
      'X-AUTH-TOKEN': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY3MDE3MTAzNyIsImlhdCI6MTY0NTU4MzQwNywiZXhwIjoxNjQ4MTc1NDA3fQ.QERvfJNL_hP0-fL2O3akBjgXxchHaCtitieExOAVv8EEdyYfJhb2BToI9ce29FJQ8RMslT-4DZi0Cj2jh99IgA',
      'version': ' TYC-Web',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function deleteArticle () {
  return request({
    url: articleApi.deleteArticle,
    method: 'get'
  })
}
