
import { goodsListAll } from '@/api/goods'
import { skuListAll } from '@/api/sku'
import { memberListAll } from '@/api/member'

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
