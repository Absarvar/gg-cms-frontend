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
        <a-form-item label="检疫证号"><a-input v-decorator="['quarantineNo', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="屠宰场名称"><a-input v-decorator="['slaughterId', {rules:[{required: true, message: '请输入屠宰场名称'}]}]" /></a-form-item>
        <a-form-item label="养殖户"><a-input v-decorator="['farmId', {rules:[{required: true, message: '请输入养殖户'}]}]" /></a-form-item>
        <a-form-item label="用途"><a-input v-decorator="['usage', {rules:[{required: true, message: '请输入用途'}]}]" /></a-form-item>
        <a-form-item label="承运人"><a-input v-decorator="['carrier', {rules:[{required: true, message: '请输入承运人'}]}]" /></a-form-item>
        <a-form-item label="承运人联系方式"><a-input v-decorator="['carrierMobile', {rules:[{required: true, message: '请输入承运人联系方式'}]}]" /></a-form-item>
        <a-form-item label="运输方式"><a-input v-decorator="['transportation', {rules:[{required: true, message: '请输入运输方式'}]}]" /></a-form-item>
        <a-form-item label="车牌号"><a-input v-decorator="['plateNo', {rules:[{required: true, message: '请输入车牌号'}]}]" /></a-form-item>
        <a-form-item label="是否消毒"><a-input v-decorator="['disinfect', {rules:[{required: true, message: '请输入是否消毒'}]}]" /></a-form-item>
        <a-form-item label="养殖票证"><a-input v-decorator="['farmTicket', {rules:[{required: true, message: '请输入养殖票证'}]}]" /></a-form-item>
        <a-form-item label="检疫票证"><a-input v-decorator="['quarantineTicket', {rules:[{required: true, message: '请输入检疫票证'}]}]" /></a-form-item>
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
const fields = ['id', 'quarantineNo', 'goodsId', 'num', 'weight', 'slaughterId', 'farmId', 'usage', 'carrier', 'carrierMobile', 'transportation', 'plateNo', 'disinfect', 'farmTicket', 'quarantineTicket', 'createTime', 'status']

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
