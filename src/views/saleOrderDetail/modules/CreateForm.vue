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
        <a-form-item label="ID"><a-input v-decorator="['odid', {rules:[{required: true, message: '请输入ID'}]}]" /></a-form-item>
        <a-form-item label="所属订单ID"><a-input v-decorator="['orderid', {rules:[{required: true, message: '请输入所属订单ID'}]}]" /></a-form-item>
        <a-form-item label="轨道编号"><a-input v-decorator="['trackid', {rules:[{required: true, message: '请输入轨道编号'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsname', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="商品重量"><a-input v-decorator="['goodsweight', {rules:[{required: true, message: '请输入商品重量'}]}]" /></a-form-item>
        <a-form-item label="总价"><a-input v-decorator="['totalfee', {rules:[{required: true, message: '请输入总价'}]}]" /></a-form-item>
        <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
        <a-form-item label="单价"><a-input v-decorator="['unitprice', {rules:[{required: true, message: '请输入单价'}]}]" /></a-form-item>
        <a-form-item label="规格"><a-input v-decorator="['standards', {rules:[{required: true, message: '请输入规格'}]}]" /></a-form-item>
        <a-form-item label="供货方(来源)"><a-input v-decorator="['supplier', {rules:[{required: true, message: '请输入供货方(来源)'}]}]" /></a-form-item>
        <a-form-item label="品类名称"><a-input v-decorator="['classifyname', {rules:[{required: true, message: '请输入品类名称'}]}]" /></a-form-item>
        <a-form-item label="级别"><a-input v-decorator="['rank', {rules:[{required: true, message: '请输入级别'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['orderid1', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="出库状态(1未2已)"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入出库状态(1未2已)'}]}]" /></a-form-item>
        <a-form-item label="出库时间"><a-input v-decorator="['endaddtime', {rules:[{required: true, message: '请输入出库时间'}]}]" /></a-form-item>
        <a-form-item label="产品id"><a-input v-decorator="['sid', {rules:[{required: true, message: '请输入产品id'}]}]" /></a-form-item>

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
const fields = ['id', 'odid', 'orderid', 'trackid', 'goodsname', 'goodsweight', 'totalfee', 'addtime', 'unitprice', 'standards', 'supplier', 'classifyname', 'rank', 'orderid1', 'type', 'endaddtime', 'sid', 'status']

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
