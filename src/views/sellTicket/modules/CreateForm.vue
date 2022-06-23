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
        <a-form-item label="分销证号"><a-input v-decorator="['fxNo', {rules:[{required: true, message: '请输入分销证号'}]}]" /></a-form-item>
        <a-form-item label="批次号"><a-input v-decorator="['batchNo', {rules:[{required: true, message: '请输入批次号'}]}]" /></a-form-item>
        <a-form-item label="生产单位"><a-input v-decorator="['butcherEnt', {rules:[{required: true, message: '请输入生产单位'}]}]" /></a-form-item>
        <a-form-item label="生产单位地址"><a-input v-decorator="['butcherAddress', {rules:[{required: true, message: '请输入生产单位地址'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['quarantineNo', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="供应商企业"><a-input v-decorator="['supplierEnt', {rules:[{required: true, message: '请输入供应商企业'}]}]" /></a-form-item>
        <a-form-item label="供货商"><a-input v-decorator="['goodsSupplier', {rules:[{required: true, message: '请输入供货商'}]}]" /></a-form-item>
        <a-form-item label="流向企业"><a-input v-decorator="['flowtoEnt', {rules:[{required: true, message: '请输入流向企业'}]}]" /></a-form-item>
        <a-form-item label="流向企业地址"><a-input v-decorator="['flowtoEntAddress', {rules:[{required: true, message: '请输入流向企业地址'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsName', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['remark', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item>
        <a-form-item label="订单编号"><a-input v-decorator="['orderCode', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item>
        <a-form-item label="生产企业ID"><a-input v-decorator="['butcherEntId', {rules:[{required: true, message: '请输入生产企业ID'}]}]" /></a-form-item>
        <a-form-item label="供应商企业ID"><a-input v-decorator="['supplierEntId', {rules:[{required: true, message: '请输入供应商企业ID'}]}]" /></a-form-item>
        <a-form-item label="流向企业ID"><a-input v-decorator="['flowtoEntId', {rules:[{required: true, message: '请输入流向企业ID'}]}]" /></a-form-item>
        <a-form-item label="入场ID"><a-input v-decorator="['entryApplyId', {rules:[{required: true, message: '请输入入场ID'}]}]" /></a-form-item>
        <a-form-item label="订单ID"><a-input v-decorator="['orderId', {rules:[{required: true, message: '请输入订单ID'}]}]" /></a-form-item>
        <a-form-item label="换算参数"><a-input v-decorator="['convertFact', {rules:[{required: true, message: '请输入换算参数'}]}]" /></a-form-item>

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
const fields = ['id', 'fxNo', 'batchNo', 'butcherEnt', 'butcherAddress', 'quarantineNo', 'supplierEnt', 'goodsSupplier', 'flowtoEnt', 'flowtoEntAddress', 'goodsName', 'num', 'weight', 'remark', 'orderCode', 'butcherEntId', 'supplierEntId', 'flowtoEntId', 'entryApplyId', 'orderId', 'convertFact', 'status']

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
