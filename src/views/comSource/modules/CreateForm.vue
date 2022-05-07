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
        <a-form-item label="简称"><a-input v-decorator="['abbreviation', {rules:[{required: true, message: '请输入简称'}]}]" /></a-form-item>
        <a-form-item label="公司名称"><a-input v-decorator="['corporatename', {rules:[{required: true, message: '请输入公司名称'}]}]" /></a-form-item>
        <a-form-item label="信用代码"><a-input v-decorator="['creditcode', {rules:[{required: true, message: '请输入信用代码'}]}]" /></a-form-item>
        <a-form-item label="类型1源头企业"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入类型1源头企业'}]}]" /></a-form-item>
        <a-form-item label="联系人"><a-input v-decorator="['contacts', {rules:[{required: true, message: '请输入联系人'}]}]" /></a-form-item>
        <a-form-item label="联系电话"><a-input v-decorator="['contactnumber', {rules:[{required: true, message: '请输入联系电话'}]}]" /></a-form-item>
        <a-form-item label="法人"><a-input v-decorator="['legalperson', {rules:[{required: true, message: '请输入法人'}]}]" /></a-form-item>
        <a-form-item label="邮箱"><a-input v-decorator="['mailbox', {rules:[{required: true, message: '请输入邮箱'}]}]" /></a-form-item>
        <a-form-item label="区域"><a-input v-decorator="['region', {rules:[{required: true, message: '请输入区域'}]}]" /></a-form-item>
        <a-form-item label="地址"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入地址'}]}]" /></a-form-item>
        <a-form-item label="公司简介"><a-input v-decorator="['companyprofile', {rules:[{required: true, message: '请输入公司简介'}]}]" /></a-form-item>
        <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
        <a-form-item label="终端代码"><a-input v-decorator="['terminalcode', {rules:[{required: true, message: '请输入终端代码'}]}]" /></a-form-item>
        <a-form-item label="logo"><a-input v-decorator="['logo', {rules:[{required: true, message: '请输入logo'}]}]" /></a-form-item>

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
const fields = ['id', 'abbreviation', 'corporatename', 'creditcode', 'type', 'contacts', 'contactnumber', 'legalperson', 'mailbox', 'region', 'address', 'companyprofile', 'addtime', 'terminalcode', 'logo', 'status']

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
