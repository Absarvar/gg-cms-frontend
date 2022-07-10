import { parse } from 'querystring'

import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import { GG_URL_PREFIX } from '@/config/common.config'

export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['welcome', '?', '', '']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}
export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const uploadHeaders = {
  Authorization: storage.get(ACCESS_TOKEN)
}
export const uploadUrl = {
  common: GG_URL_PREFIX + '/upload/common',
  ticket: GG_URL_PREFIX + '/upload/ticket'
}

export function handleUploadInfo (info) {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    this.$message.success(`${info.file.name} file uploaded successfully`)
  } else if (info.file.status === 'error') {
    this.$message.error(`${info.file.name} file upload failed.`)
  }
}

export function getNowTime () { // 获取当前时间
  const nowDate = new Date()
  const yy = nowDate.getFullYear()
  const mm = nowDate.getMonth() + 1
  const dd = nowDate.getDate()
  const hh = nowDate.getHours()
  const mf = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes()
    : nowDate.getMinutes()
  // const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
  //   : new Date().getSeconds()
  const dateTime = yy + '年' + mm + '月' + dd + '日' + hh + '时' + mf + '分'
  return dateTime
}

// 下载文件
export function download (res) {
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
