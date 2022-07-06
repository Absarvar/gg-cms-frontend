<template>
  <a-modal
    title="操作"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->
        <a-form-item label="请选择批次">
          <a-tree-select
            v-model="value"
            :dropdownStyle="ddStyle"
            :tree-data="treeData"
            tree-checkable
            search-placeholder="请选择批次"
          />
        </a-form-item>
        <a-form-item
          label="batchIdList"
          hidden
        >
          <a-input v-decorator="['batchIdList', {}]" />
        </a-form-item>
        <a-form-item
          label="商品名称"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="select"
              style="width: 120px"
              v-decorator="['sname', {initialValue:'中温白条' ,rules:[{required: true, message: '请选择商品名称'}]}]"
              :options="goodsList"
            ></a-select>
          </a-space>
        </a-form-item>
        <a-form-item
          label="单位"
        >
          <a-space>
            <a-select
              ref="select"
              style="width: 120px"
              v-decorator="['danwei', {initialValue:'头' ,rules:[{required: true, message: '请选择单位'}]}]"
              :options="danweiList"
            ></a-select>
          </a-space>
        </a-form-item>

        <a-form-item
          label="id"
          hidden
        >
          <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
        </a-form-item>
        <a-form-item label="源头id"><a-input v-decorator="['sourceId', {rules:[{required: true, message: '请输入源头id'}]}]" /></a-form-item>
        <a-form-item label="商品id"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="规格"><a-input v-decorator="['sku', {rules:[{required: true, message: '请输入规格'}]}]" /></a-form-item>
        <a-form-item label="价格"><a-input @change="onChangePrice" v-decorator="['price', {rules:[{required: true, message: '请输入价格'}]}]" /></a-form-item>
        <a-form-item label="总费用"><a-input v-decorator="['amount', {rules:[{required: true, message: '请输入总费用'}]}]" /></a-form-item>
        <a-form-item label="制单人"><a-input v-decorator="['operator', {rules:[{required: true, message: '请输入制单人'}]}]" /></a-form-item>
        <a-form-item label="预计到货时间"><a-input v-decorator="['planArrive', {rules:[{required: true, message: '请输入预计到货时间'}]}]" /></a-form-item>
        <a-form-item label="订货日期"><a-input v-decorator="['orderDate', {rules:[{required: true, message: '请输入订货日期'}]}]" /></a-form-item>
        <a-form-item label="回货日期"><a-input v-decorator="['backDate', {rules:[{required: true, message: '请输入回货日期'}]}]" /></a-form-item>

        <a-form-item label="订货日期">
          <a-date-picker
            v-model="daddTimeDefault"
            @change="onChangeD"/>
        </a-form-item>
        <a-form-item label="回货日期">
          <a-date-picker
            v-model="haddTimeDefault"
            @change="onChangeH"/>
        </a-form-item>

        <a-form-item
          label="状态"
        >
          <a-space>
            <a-select
              ref="select"
              style="width: 120px"
              v-decorator="['status', {rules:[{required: true, message: '请选择状态'}]}]"
              :options="options2"
            ></a-select>
          </a-space>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { entryApplyListTree } from '@/api/entryApply'
import { goodsListAll } from '@/api/goods'
import { formateDate } from '@/utils/dateUtil'
import moment from 'moment'

// 表单字段
const fields = ['id', 'sourceId', 'goodsId', 'num', 'sku', 'price', 'amount', 'operator', 'planArrive', 'orderDate', 'backDate', 'status']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      ddStyle: { width: '500px', height: '600px' },
      fo: {},
      daddTimeDefault: '',
      haddTimeDefault: '',
      treeData: [],
      goodsList: [],
      value: undefined,
      form: this.$form.createForm(this),
      options2: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }],
      danweiList: [{
        value: '头',
        label: '头'
      }, {
        value: '边',
        label: '边'
      }, {
        value: '公斤',
        label: '公斤'
      }, {
        value: '只',
        label: '只'
      }, {
        value: '副',
        label: '副'
      }]
    }
  },
  methods: {
    onChangeD (date, dateString) {
      this.form.setFieldsValue({ 'orderDate': date.unix() * 1000 })
    },
    onChangeH (date, dateString) {
      this.form.setFieldsValue({ 'backDate': date.unix() * 1000 })
    },
    onChangePrice (e) {
      const number = Number(this.form.getFieldValue('nmber'))
      const specification = Number(this.form.getFieldValue('specification'))
      const price = Number(e.srcElement.value)
      const amount = number * specification * price
      this.form.setFieldsValue({ 'feiyong': amount.toFixed(2) })
    },
    setDefaultVal () {
      // 设置默认值
      const date = new Date()
      const todayStr = formateDate(date, 'yyyy-MM-dd')
      const dateFormat = 'YYYY-MM-DD'
      const todayjs = moment(todayStr, dateFormat)
      this.form.setFieldsValue({ 'daddtime': date * 1 })
      this.form.setFieldsValue({ 'haddtime': date * 1 })
      this.daddTimeDefault = todayjs
      this.haddTimeDefault = todayjs
    }
  },
  watch: {
    value (value) {
      console.log(value)
      this.form.setFieldsValue({ 'batchIdList': value.toString() })
    }
  },
  created () {
    this.$nextTick(() => {
      // this.form.setFieldsValue({
      // 'haddtimeStr': todayjs })

      // this.daddTimeDefault = todayStr
      // this.haddTimeDefault = todayStr
      // console.log('tick')
      // 调用内容
      entryApplyListTree('').then(res => {
        // console.log('res', res.data)
        this.treeData = res.data
        // const pcList = []
        // if (res.data != null && res.data.data != null) {
        //   for (let index = 0; index < res.data.data.length; index++) {
        //     // const element = res.data.data[index]
        //     // pcList.push(element['pinjie'])
        //   }
        // }
      })

      goodsListAll('').then(res => {
        for (var i = 0; i < res.data.length; i++) {
          this.goodsList.push({ label: res.data[i]['namea'], value: res.data[i]['namea'] })
        }
      })
    })

    if (this.model !== null) {
      this.fo = this.model
      this.value = undefined
      if (this.model.batchIdList !== '') {
        this.form.setFieldsValue({ 'batchIdList': this.model.batchIdList.toString() })
        this.value = this.model.batchIdList.split(',')
      }
    }

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      // 恢复默认值
      this.value = undefined
      this.setDefaultVal()
      if (this.model !== null) {
        this.fo = this.model
        this.value = undefined
        if (this.model.batchIdList !== '') {
          this.form.setFieldsValue({ 'batchIdList': this.model.batchIdList.toString() })
          this.value = this.model.batchIdList.split(',')
        }
        // 设置两个时间的展示
        var haddDate = new Date(this.model.haddtime)
        var daddDate = new Date(this.model.daddtime)
        const haddDateStr = formateDate(haddDate, 'yyyy-MM-dd')
        const daddDateStr = formateDate(daddDate, 'yyyy-MM-dd')
        const dateFormat = 'YYYY-MM-DD'
        const haddDateStrmm = moment(haddDateStr, dateFormat)
        const daddDateStrmm = moment(daddDateStr, dateFormat)
        this.daddTimeDefault = daddDateStrmm
        this.haddTimeDefault = haddDateStrmm
        this.model.haddtime = Date.parse(haddDate) * 1
        this.model.daddtime = Date.parse(daddDate) * 1
        this.form.setFieldsValue({ 'haddtime': this.model.haddtime, 'daddtime': this.model.daddtime })
      }
    })
  }
}
</script>
