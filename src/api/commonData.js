
import { goodsListAll } from '@/api/goods'
import { skuListAll } from '@/api/sku'
import { memberListAll } from '@/api/member'
import { PreorderStatusMap } from '@/config/status.config'
import { goodsUnitList } from '@/api/goodsUnit'

export function goodsOptions () {
  var list = []
  goodsListAll('').then(res => {
  for (var i = 0; i < res.data.length; i++) {
      list.push({ label: res.data[i]['name'], value: res.data[i]['id'] })
    }
  })
  return list
}

export function skuOptions () {
  var list = []
  skuListAll('').then(res => {
  for (var i = 0; i < res.data.length; i++) {
      list.push({ label: res.data[i]['name'], value: res.data[i]['id'] })
    }
  })
  return list
}

export function memberOptions () {
  var list = []
  memberListAll('').then(res => {
  for (var i = 0; i < res.data.length; i++) {
      list.push({ label: res.data[i]['name'], value: res.data[i]['id'] })
    }
  })
  return list
}

export function preorderStatusOptions () {
  var list = []
  for (var i in PreorderStatusMap) {
      list.push({ label: PreorderStatusMap[i].text, value: Number(i) })
    }
  return list
}

export function goodsUnitOptions () {
  var list = []
  goodsUnitList({ 'goodsId': 0 }).then(res => {
  for (var i = 0; i < res.data.data.length; i++) {
      list.push({ label: res.data.data[i]['name'], value: res.data.data[i]['id'] })
    }
  })
  return list
}
