<template>

  <a-modal
    title="配货"
    :width="1040"
    :visible="goSend"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >

    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">

        <a-form-item
          label="id"
          hidden
        >
          <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
        </a-form-item>

        <a-form-item
          label="productIdList"
          hidden
        >
          <a-input v-decorator="['productIdList', {}]" />
        </a-form-item>

        <a-form-item label="预定单号"><a-input disabled v-decorator="['preorderCode', {rules:[{required: true, message: '请输入预定单号'}]}]" /></a-form-item>

        <a-form-item label="会员名称"><a-input disabled v-decorator="['memberName', {rules:[{required: true, message: '请输入会员id'}]}]" /></a-form-item>
        <a-form-item label="预定手机号"><a-input disabled v-decorator="['mobile', {rules:[{required: true, message: '请输入预定手机号'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input disabled v-decorator="['goodsName', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item>

        <a-form-item label="请选择配货商品">
          <a-tree-select
            v-model="value"
            :dropdownStyle="ddStyle"
            :tree-data="treeData"
            tree-checkable
            search-placeholder="请选择配货商品"
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }"
          />
        </a-form-item>

        <a-form-item label="已选择：">
          <span style="float:left;font-size:20px;">{{ this.selectedNum }}</span>
        </a-form-item>

        <a-form-item label="规格"><a-input disabled v-decorator="['skuName', {rules:[{required: true, message: '请输入规格id'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input disabled v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="确认规格"><a-input disabled v-decorator="['confirmSku', {rules:[{required: true, message: '请输入确认规格'}]}]" /></a-form-item>
        <a-form-item label="确认数量"><a-input disabled v-decorator="['confirmNum', {rules:[{required: true, message: '请输入确认数量'}]}]" /></a-form-item>
        <a-form-item label="确认价格"><a-input disabled v-decorator="['confirmPrice', {rules:[{required: true, message: '请输入确认价格'}]}]" /></a-form-item>
        <a-form-item label="总额"><a-input disabled v-decorator="['amount', {rules:[{required: true, message: '请输入总额'}]}]" /></a-form-item>
        <a-form-item label="到货时间"><a-input disabled v-decorator="['arriveTime', {rules:[{required: true, message: '请输入到货时间'}]}]" /></a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { productListTree } from '@/api/product'

// 表单字段
const fields = ['id', 'preorderCode', 'memberName', 'mobile', 'goodsName', 'skuName', 'num', 'confirmSku', 'confirmNum', 'confirmPrice', 'amount', 'arriveTime', 'status']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    goSend: {
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
      selectedNum: 0,
      ddStyle: { maxHeight: '300px', overflow: 'auto' },
      fo: {},
      daddTimeDefault: '',
      haddTimeDefault: '',
      treeData: [],
      goodsList: [],
      value: undefined, // 多选结果数组
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
      this.form.setFieldsValue({ 'daddtime': date.unix() * 1000 })
    },
    onChangeH (date, dateString) {
      this.form.setFieldsValue({ 'haddtime': date.unix() * 1000 })
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
    }
  },
  watch: {
    value (value) {
      console.log(value)
      if (value !== undefined) {
 this.form.setFieldsValue({ 'productIdList': value.toString() })
        this.selectedNum = value.length
}
    }
  },
  // mounted: function () {
  // },
  created () {
    this.$nextTick(() => {
      // 调用内容
      productListTree('').then(res => {
        this.treeData = res.data
      })

      // goodsListAll('').then(res => {
      //   for (var i = 0; i < res.data.length; i++) {
      //     this.goodsList.push({ label: res.data[i]['namea'], value: res.data[i]['namea'] })
      //   }
      // })
    })

    if (this.model !== null) {
      this.fo = this.model
      this.value = undefined
      if (this.model.productIdList !== undefined && this.model.productIdList !== '') {
        this.form.setFieldsValue({ 'productIdList': this.model.productIdList.toString() })
        this.selectedNum = this.model.productIdList.length
        this.value = this.model.productIdList.split(',')
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
        if (this.model.productIdList !== undefined && this.model.productIdList !== '') {
          this.form.setFieldsValue({ 'productIdList': this.model.productIdList.toString() })
        this.selectedNum = this.model.productIdList.length
          this.value = this.model.productIdList.split(',')
        }
      }
    })
  }
}
</script>
