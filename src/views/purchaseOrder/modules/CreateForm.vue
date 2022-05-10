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
        <a-form-item label="供应商名称"><a-input v-decorator="['gname', {rules:[{required: true, message: '请输入供应商名称'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['sname', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['nmber', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="规格"><a-input v-decorator="['specification', {rules:[{required: true, message: '请输入规格'}]}]" /></a-form-item>
        <a-form-item label="订货量"><a-input v-decorator="['orderquantity', {rules:[{required: true, message: '请输入订货量'}]}]" /></a-form-item>
        <a-form-item label="采购数量"><a-input v-decorator="['purchasequantity', {rules:[{required: true, message: '请输入采购数量'}]}]" /></a-form-item>
        <a-form-item label="采购重量"><a-input v-decorator="['purchaseweight', {rules:[{required: true, message: '请输入采购重量'}]}]" /></a-form-item>
        <a-form-item label="实收量"><a-input v-decorator="['paid', {rules:[{required: true, message: '请输入实收量'}]}]" /></a-form-item>
        <a-form-item label="差量"><a-input v-decorator="['difference', {rules:[{required: true, message: '请输入差量'}]}]" /></a-form-item>
        <a-form-item label="制单时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入制单时间'}]}]" /></a-form-item>
        <a-form-item label="制单人"><a-input v-decorator="['preparedby', {rules:[{required: true, message: '请输入制单人'}]}]" /></a-form-item>
        <a-form-item label="状态"><a-input v-decorator="['state', {rules:[{required: true, message: '请输入状态'}]}]" /></a-form-item>
        <a-form-item label="单位"><a-input v-decorator="['danwei', {rules:[{required: true, message: '请输入单位'}]}]" /></a-form-item>
        <a-form-item label="订货日期"><a-input v-decorator="['daddtime', {rules:[{required: true, message: '请输入订货日期'}]}]" /></a-form-item>
        <a-form-item label="回货日期"><a-input v-decorator="['haddtime', {rules:[{required: true, message: '请输入回货日期'}]}]" /></a-form-item>
        <a-form-item label="预计到货时间"><a-input v-decorator="['yuji', {rules:[{required: true, message: '请输入预计到货时间'}]}]" /></a-form-item>
        <a-form-item label="订单编号"><a-input v-decorator="['orderno', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item>
        <a-form-item label="销售价"><a-input v-decorator="['danjia', {rules:[{required: true, message: '请输入销售价'}]}]" /></a-form-item>
        <a-form-item label="预计费用"><a-input v-decorator="['feiyong', {rules:[{required: true, message: '请输入预计费用'}]}]" /></a-form-item>

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
const fields = ['id', 'gname', 'sname', 'nmber', 'specification', 'orderquantity', 'purchasequantity', 'purchaseweight', 'paid', 'difference', 'addtime', 'preparedby', 'state', 'danwei', 'daddtime', 'haddtime', 'yuji', 'orderno', 'danjia', 'feiyong', 'status']

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
