import request from '@/utils/request'

const articleApi = {
  newArticle: 'http://localhost:5590/article/newArticle',
  articleList: '/article/list',
  getArticle: 'http://localhost:5590/article/get',
  deleteArticle: '/article/delete',
  testApi: 'https://capi.tianyancha.com/cloud-tempest/search/suggest/v2'
}

export function testApi (parameter) {
  return request({
    url: articleApi.testApi,
    method: 'post',
    data: parameter,
    headers: {
      'X-AUTH-TOKEN': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY3MDE3MTAzNyIsImlhdCI6MTY0NTU4MzQwNywiZXhwIjoxNjQ4MTc1NDA3fQ.QERvfJNL_hP0-fL2O3akBjgXxchHaCtitieExOAVv8EEdyYfJhb2BToI9ce29FJQ8RMslT-4DZi0Cj2jh99IgA',
      'version': ' TYC-Web',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function newArticle (parameter) {
  return request({
    url: articleApi.newArticle,
    method: 'post',
    data: parameter,
    headers: {
      'X-AUTH-TOKEN': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzY3MDE3MTAzNyIsImlhdCI6MTY0NTU4MzQwNywiZXhwIjoxNjQ4MTc1NDA3fQ.QERvfJNL_hP0-fL2O3akBjgXxchHaCtitieExOAVv8EEdyYfJhb2BToI9ce29FJQ8RMslT-4DZi0Cj2jh99IgA',
      'version': ' TYC-Web',
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
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
