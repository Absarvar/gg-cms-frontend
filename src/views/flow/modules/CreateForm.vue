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
        <a-form-item label="一级批发商"><a-input v-decorator="['firstSellerId', {rules:[{required: true, message: '请输入一级批发商'}]}]" /></a-form-item>
        <a-form-item label="二级批发商"><a-input v-decorator="['secondSellerId', {rules:[{required: true, message: '请输入二级批发商'}]}]" /></a-form-item>
        <a-form-item label="终端"><a-input v-decorator="['terminalId', {rules:[{required: true, message: '请输入终端'}]}]" /></a-form-item>
        <a-form-item label="动物类型"><a-input v-decorator="['species', {rules:[{required: true, message: '请输入动物类型'}]}]" /></a-form-item>
        <a-form-item label="产品种类"><a-input v-decorator="['categoryType', {rules:[{required: true, message: '请输入产品种类'}]}]" /></a-form-item>
        <a-form-item label="关联订单"><a-input v-decorator="['orderId', {rules:[{required: true, message: '请输入关联订单'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['ps', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item>
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
const fields = ['id', 'firstSellerId', 'secondSellerId', 'terminalId', 'species', 'categoryType', 'orderId', 'ps', 'createTime', 'status']

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
