
import { goodsListAll } from '@/api/goods'
import { skuListAll } from '@/api/sku'
import { memberListAll } from '@/api/member'
import { PreorderStatusMap } from '@/config/status.config'
import { goodsUnitList } from '@/api/goodsUnit'
import { sourceEntList } from '@/api/butcherEnt'
import { categoryList } from '@/api/category'

export function goodsOptions (cateId) {
  var param = cateId
  if (param === null) {
    param = ''
  }
  var list = []
  goodsListAll({ 'cateId': cateId }).then(res => {
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

export function sourceOptions () {
  var source = {}
  var butcherEntList = []
  var farmEntList = []
  source.butcherEntList = butcherEntList
  source.farmEntList = farmEntList
  sourceEntList('').then(res => {
    // console.log('sourceEnt')
    const dataList = res.data.butcherEntList
    // console.log(dataList)
    for (var i = 0; i < dataList.length; i++) {
      butcherEntList.push({ label: dataList[i]['name'], value: dataList[i]['id'] })
    }
    const dataList2 = res.data.farmEntList
    for (var j = 0; j < dataList2.length; j++) {
      farmEntList.push({ label: dataList2[j]['name'], value: dataList2[j]['id'] })
    }
  })
  return source
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
      list.push({ label: res.data.data[i]['name'], value: res.data.data[i]['name'] })
    }
  })
  return list
}

export function categoryOptions () {
  var list = []
  categoryList({ 'parent_id': 1 }).then(res => {
  for (var i = 0; i < res.data.data.length; i++) {
      list.push({ label: res.data.data[i]['name'], value: res.data.data[i]['id'] })
    }
  })
  return list
}
