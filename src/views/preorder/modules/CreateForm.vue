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
        <a-form-item
          label="id"
          hidden
        >
          <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
        </a-form-item>

        <a-form-item
          label="会员"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="select"
              style="width: 250px"
              v-decorator="['memberId', {initialValue:624, rules:[{required: true, message: '请选择会员'}]}]"
              :options="memberList"
            ></a-select>
          </a-space>
        </a-form-item>

        <!-- <a-form-item label="会员id"><a-input v-decorator="['memberId', {rules:[{required: true, message: '请输入会员id'}]}]" /></a-form-item> -->
        <a-form-item label="预定手机号"><a-input v-decorator="['mobile', {rules:[{required: true, message: '请输入预定手机号'}]}]" /></a-form-item>

        <a-form-item
          label="商品名称"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="select"
              style="width: 150px"
              v-decorator="['goodsId', {initialValue:1, rules:[{required: true, message: '请选择商品名称'}]}]"
              :options="goodsList"
            ></a-select>
          </a-space>
        </a-form-item>

        <a-form-item
          label="规格"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="select"
              style="width: 150px"
              v-decorator="['skuId', {initialValue:1, rules:[{required: true, message: '请选择商品规格'}]}]"
              :options="skuList"
            ></a-select>
          </a-space>
        </a-form-item>
        <!-- <a-form-item label="商品id"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item> -->
        <!-- <a-form-item label="规格id"><a-input v-decorator="['skuId', {rules:[{required: true, message: '请输入规格id'}]}]" /></a-form-item> -->
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="确认规格"><a-input v-decorator="['confirmSku', {rules:[{required: true, message: '请输入确认规格'}]}]" /></a-form-item>
        <a-form-item label="确认数量"><a-input v-decorator="['confirmNum', {rules:[{required: true, message: '请输入确认数量'}]}]" /></a-form-item>
        <a-form-item label="确认价格"><a-input @change="onChangePrice" v-decorator="['confirmPrice', {rules:[{required: true, message: '请输入确认价格'}]}]" /></a-form-item>
        <a-form-item label="总额"><a-input v-decorator="['amount', {rules:[{required: true, message: '请输入总额'}]}]" /></a-form-item>
        <a-form-item label="到货时间"><a-input v-decorator="['arriveTime', {rules:[{required: true, message: '请输入到货时间'}]}]" /></a-form-item>

        <a-form-item
          label="状态"
        >
          <a-space>
            <a-select
              ref="select"
              style="width: 150px"
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
import { goodsOptions, skuOptions, memberOptions } from '@/api/commonData'

// 表单字段
const fields = ['id', 'preorderCode', 'memberId', 'mobile', 'goodsId', 'skuId', 'num', 'confirmSku', 'confirmNum', 'confirmPrice', 'amount', 'arriveTime', 'status']

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
      skuList: [],
      goodsList: [],
      memberList: [],
      fo: {},
      form: this.$form.createForm(this),
      options2: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }]
    }
  },
  methods: {
    onChangePrice (e) {
      const number = Number(this.form.getFieldValue('confirmNum'))
      const specification = Number(this.form.getFieldValue('confirmSku'))
      const price = Number(e.srcElement.value)
      const amount = number * specification * price
      this.form.setFieldsValue({ 'amount': amount.toFixed(2) })
    }

  },
  created () {
    if (this.model !== null) {
      this.fo = this.model
    }
    this.goodsList = goodsOptions()
    this.skuList = skuOptions()
    this.memberList = memberOptions()

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      if (this.model !== null) {
        this.fo = this.model
      }
    })
  }
}
</script>
