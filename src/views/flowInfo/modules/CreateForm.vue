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
        <a-form-item label="供应商"><a-input v-decorator="['supplierEntName', {rules:[{required: true, message: '请输入供应商'}]}]" /></a-form-item>
        <a-form-item label="屠宰单位"><a-input v-decorator="['butcherEntName', {rules:[{required: true, message: '请输入屠宰单位'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['quarantineCertNo', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="检疫证类型"><a-input v-decorator="['quarantineCertType', {rules:[{required: true, message: '请输入检疫证类型'}]}]" /></a-form-item>
        <a-form-item label="批次重量"><a-input v-decorator="['batchWeight', {rules:[{required: true, message: '请输入批次重量'}]}]" /></a-form-item>
        <a-form-item label="产品名称"><a-input v-decorator="['productName', {rules:[{required: true, message: '请输入产品名称'}]}]" /></a-form-item>
        <a-form-item label="流向企业"><a-input v-decorator="['flowtoEntName', {rules:[{required: true, message: '请输入流向企业'}]}]" /></a-form-item>
        <a-form-item label="进场批次号"><a-input v-decorator="['batchCode', {rules:[{required: true, message: '请输入进场批次号'}]}]" /></a-form-item>
        <a-form-item label="出场重量"><a-input v-decorator="['batchOutWeight', {rules:[{required: true, message: '请输入出场重量'}]}]" /></a-form-item>
        <a-form-item label="出场价格"><a-input v-decorator="['batchOutPrice', {rules:[{required: true, message: '请输入出场价格'}]}]" /></a-form-item>
        <a-form-item label="进场价格"><a-input v-decorator="['batchInPrice', {rules:[{required: true, message: '请输入进场价格'}]}]" /></a-form-item>
        <a-form-item label="分销流水号"><a-input v-decorator="['fxCode', {rules:[{required: true, message: '请输入分销流水号'}]}]" /></a-form-item>
        <a-form-item label="产品类别编号"><a-input v-decorator="['productCategoryCode', {rules:[{required: true, message: '请输入产品类别编号'}]}]" /></a-form-item>
        <a-form-item label="进场日期"><a-input v-decorator="['batchInDate', {rules:[{required: true, message: '请输入进场日期'}]}]" /></a-form-item>
        <a-form-item label="出场日期"><a-input v-decorator="['batchOutDate', {rules:[{required: true, message: '请输入出场日期'}]}]" /></a-form-item>
        <a-form-item label="产品图片"><a-input v-decorator="['productImg', {rules:[{required: true, message: '请输入产品图片'}]}]" /></a-form-item>
        <a-form-item label="检测报告"><a-input v-decorator="['batchCheckReport', {rules:[{required: true, message: '请输入检测报告'}]}]" /></a-form-item>
        <a-form-item label="供应商信用代码"><a-input v-decorator="['supplierEntUnifCode', {rules:[{required: true, message: '请输入供应商信用代码'}]}]" /></a-form-item>
        <a-form-item label="屠宰场信用代码"><a-input v-decorator="['butcherEntUnifCode', {rules:[{required: true, message: '请输入屠宰场信用代码'}]}]" /></a-form-item>
        <a-form-item label="流向企业信用代码"><a-input v-decorator="['flowtoEntUnifCode', {rules:[{required: true, message: '请输入流向企业信用代码'}]}]" /></a-form-item>
        <a-form-item label="二维码地址"><a-input v-decorator="['qrcodeUrl', {rules:[{required: true, message: '请输入二维码地址'}]}]" /></a-form-item>
        <a-form-item label="进场重量"><a-input v-decorator="['batchInWeight', {rules:[{required: true, message: '请输入进场重量'}]}]" /></a-form-item>

        <!-- <a-form-item
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
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'supplierEntName', 'butcherEntName', 'quarantineCertNo', 'quarantineCertType', 'batchWeight', 'productName', 'flowtoEntName', 'batchCode', 'batchOutWeight', 'batchOutPrice', 'batchInPrice', 'fxCode', 'productCategoryCode', 'batchInDate', 'batchOutDate', 'productImg', 'batchCheckReport', 'supplierEntUnifCode', 'butcherEntUnifCode', 'flowtoEntUnifCode', 'qrcodeUrl', 'batchInWeight', 'status']

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
