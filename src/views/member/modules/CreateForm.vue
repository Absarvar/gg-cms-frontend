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
        <a-form-item label="公司名称"><a-input v-decorator="['companyName', {rules:[{required: true, message: '请输入公司名称'}]}]" /></a-form-item>
        <a-form-item label="法人姓名"><a-input v-decorator="['legalName', {rules:[{required: true, message: '请输入法人姓名'}]}]" /></a-form-item>
        <a-form-item label="信用代码"><a-input v-decorator="['creditcode', {rules:[{required: true, message: '请输入信用代码'}]}]" /></a-form-item>
        <a-form-item label="经营地址"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入经营地址'}]}]" /></a-form-item>
        <a-form-item label="终端代码"><a-input v-decorator="['terminalCode', {rules:[{required: true, message: '请输入终端代码'}]}]" /></a-form-item>
        <a-form-item label="会员名称"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入会员名称'}]}]" /></a-form-item>
        <a-form-item label="会员手机"><a-input v-decorator="['mobile', {rules:[{required: true, message: '请输入会员手机'}]}]" /></a-form-item>
        <a-form-item label="类型"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入类型'}]}]" /></a-form-item>
        <a-form-item label="余额"><a-input v-decorator="['amount', {rules:[{required: true, message: '请输入余额'}]}]" /></a-form-item>
        <a-form-item label="冻结余额"><a-input v-decorator="['frozenAmount', {rules:[{required: true, message: '请输入冻结余额'}]}]" /></a-form-item>
        <a-form-item label="身份证正面"><a-input v-decorator="['idCardFront', {rules:[{required: true, message: '请输入身份证正面'}]}]" /></a-form-item>
        <a-form-item label="身份证反面"><a-input v-decorator="['idCardBack', {rules:[{required: true, message: '请输入身份证反面'}]}]" /></a-form-item>
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
const fields = ['id', 'companyName', 'legalName', 'creditcode', 'address', 'terminalCode', 'name', 'mobile', 'type', 'amount', 'frozenAmount', 'idCardFront', 'idCardBack', 'createTime', 'status']

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
