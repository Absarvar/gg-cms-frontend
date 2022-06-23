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
        <a-form-item label="客户分类"><a-input v-decorator="['client', {rules:[{required: true, message: '请输入客户分类'}]}]" /></a-form-item>
        <a-form-item label="分组"><a-input v-decorator="['grp', {rules:[{required: true, message: '请输入分组'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsName', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="客户商品名称"><a-input v-decorator="['clientGoodsName', {rules:[{required: true, message: '请输入客户商品名称'}]}]" /></a-form-item>
        <a-form-item label="单位"><a-input v-decorator="['unit', {rules:[{required: true, message: '请输入单位'}]}]" /></a-form-item>
        <a-form-item label="实发量（原单位）"><a-input v-decorator="['actWeightOrigin', {rules:[{required: true, message: '请输入实发量（原单位）'}]}]" /></a-form-item>
        <a-form-item label="原料成本价"><a-input v-decorator="['materialPrice', {rules:[{required: true, message: '请输入原料成本价'}]}]" /></a-form-item>
        <a-form-item label="原料加工金额"><a-input v-decorator="['processAmount', {rules:[{required: true, message: '请输入原料加工金额'}]}]" /></a-form-item>
        <a-form-item label="实发重量换算因子"><a-input v-decorator="['fact', {rules:[{required: true, message: '请输入实发重量换算因子'}]}]" /></a-form-item>
        <a-form-item label="实发重量"><a-input v-decorator="['actWeight', {rules:[{required: true, message: '请输入实发重量'}]}]" /></a-form-item>
        <a-form-item label="明细日期"><a-input v-decorator="['effectTime', {rules:[{required: true, message: '请输入明细日期'}]}]" /></a-form-item>

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
const fields = ['id', 'client', 'grp', 'goodsName', 'clientGoodsName', 'unit', 'actWeightOrigin', 'materialPrice', 'processAmount', 'fact', 'actWeight', 'effectTime', 'status']

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
