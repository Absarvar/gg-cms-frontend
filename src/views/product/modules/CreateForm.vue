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
        <a-form-item label="名称"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入名称'}]}]" /></a-form-item>
        <a-form-item label="轨道编号"><a-input v-decorator="['orbitCode', {rules:[{required: true, message: '请输入轨道编号'}]}]" /></a-form-item>
        <a-form-item label="商品id"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item>
        <a-form-item label="skuID"><a-input v-decorator="['skuId', {rules:[{required: true, message: '请输入skuID'}]}]" /></a-form-item>
        <a-form-item label="订单id"><a-input v-decorator="['orderId', {rules:[{required: true, message: '请输入订单id'}]}]" /></a-form-item>
        <a-form-item label="会员id"><a-input v-decorator="['memberId', {rules:[{required: true, message: '请输入会员id'}]}]" /></a-form-item>
        <a-form-item label="地址id"><a-input v-decorator="['addressId', {rules:[{required: true, message: '请输入地址id'}]}]" /></a-form-item>
        <a-form-item label="入场申请id"><a-input v-decorator="['applyId', {rules:[{required: true, message: '请输入入场申请id'}]}]" /></a-form-item>
        <a-form-item label="来源id"><a-input v-decorator="['sourceId', {rules:[{required: true, message: '请输入来源id'}]}]" /></a-form-item>
        <a-form-item label="终端id"><a-input v-decorator="['terminalId', {rules:[{required: true, message: '请输入终端id'}]}]" /></a-form-item>
        <a-form-item label="等级"><a-input v-decorator="['level', {rules:[{required: true, message: '请输入等级'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="实际价格"><a-input v-decorator="['price', {rules:[{required: true, message: '请输入实际价格'}]}]" /></a-form-item>
        <a-form-item label="预定价格"><a-input v-decorator="['priceT', {rules:[{required: true, message: '请输入预定价格'}]}]" /></a-form-item>
        <a-form-item label="入库时间"><a-input v-decorator="['instockTime', {rules:[{required: true, message: '请输入入库时间'}]}]" /></a-form-item>
        <a-form-item label="出库时间"><a-input v-decorator="['outstockTime', {rules:[{required: true, message: '请输入出库时间'}]}]" /></a-form-item>
        <a-form-item label="创建时间"><a-input v-decorator="['createTime', {rules:[{required: true, message: '请输入创建时间'}]}]" /></a-form-item>

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
const fields = ['id', 'name', 'orbitCode', 'goodsId', 'skuId', 'orderId', 'memberId', 'addressId', 'applyId', 'sourceId', 'terminalId', 'level', 'weight', 'price', 'priceT', 'instockTime', 'outstockTime', 'createTime', 'status']

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
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
