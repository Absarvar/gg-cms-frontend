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
        <a-form-item label="订单号"><a-input v-decorator="['outTradeNo', {rules:[{required: true, message: '请输入订单号'}]}]" /></a-form-item>
        <a-form-item label="总金额"><a-input v-decorator="['amount', {rules:[{required: true, message: '请输入总金额'}]}]" /></a-form-item>
        <a-form-item label="总数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入总数量'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="采购商家"><a-input v-decorator="['memberId', {rules:[{required: true, message: '请输入采购商家'}]}]" /></a-form-item>
        <a-form-item label="实收金额"><a-input v-decorator="['actAmount', {rules:[{required: true, message: '请输入实收金额'}]}]" /></a-form-item>
        <a-form-item label="地址"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入地址'}]}]" /></a-form-item>
        <a-form-item label="联系人"><a-input v-decorator="['linkMan', {rules:[{required: true, message: '请输入联系人'}]}]" /></a-form-item>
        <a-form-item label="联系人电话"><a-input v-decorator="['linkMobile', {rules:[{required: true, message: '请输入联系人电话'}]}]" /></a-form-item>
        <a-form-item label="支付类型"><a-input v-decorator="['payType', {rules:[{required: true, message: '请输入支付类型'}]}]" /></a-form-item>
        <a-form-item label="支付时间"><a-input v-decorator="['payTime', {rules:[{required: true, message: '请输入支付时间'}]}]" /></a-form-item>
        <a-form-item label="库存状态"><a-input v-decorator="['stockStatus', {rules:[{required: true, message: '请输入库存状态'}]}]" /></a-form-item>
        <a-form-item label="预定单号"><a-input v-decorator="['preorderCode', {rules:[{required: true, message: '请输入预定单号'}]}]" /></a-form-item>
        <a-form-item label="订单类型"><a-input v-decorator="['fromType', {rules:[{required: true, message: '请输入订单类型'}]}]" /></a-form-item>
        <a-form-item label="订单编号"><a-input v-decorator="['orderCode', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item>
        <a-form-item label="销售商家"><a-input v-decorator="['supplier', {rules:[{required: true, message: '请输入销售商家'}]}]" /></a-form-item>
        <a-form-item label="采购商家"><a-input v-decorator="['buyer', {rules:[{required: true, message: '请输入采购商家'}]}]" /></a-form-item>
        <a-form-item label="订单时间"><a-input v-decorator="['orderTime', {rules:[{required: true, message: '请输入订单时间'}]}]" /></a-form-item>

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

// 表单字段
const fields = ['id', 'outTradeNo', 'amount', 'num', 'weight', 'memberId', 'actAmount', 'address', 'linkMan', 'linkMobile', 'payType', 'payTime', 'stockStatus', 'preorderCode', 'fromType', 'orderCode', 'supplier', 'buyer', 'orderTime', 'status']

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
  created () {
    if (this.model !== null) {
      this.fo = this.model
    }

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
