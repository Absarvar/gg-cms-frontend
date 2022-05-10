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
        <a-form-item label="会员名称"><a-input v-decorator="['namess', {rules:[{required: true, message: '请输入会员名称'}]}]" /></a-form-item>
        <a-form-item label="订单编号"><a-input v-decorator="['outtradeno', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['devicename', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="轨道编号"><a-input v-decorator="['devicecode', {rules:[{required: true, message: '请输入轨道编号'}]}]" /></a-form-item>
        <a-form-item label="等级"><a-input v-decorator="['rank', {rules:[{required: true, message: '请输入等级'}]}]" /></a-form-item>
        <a-form-item label="溯源批次号(编号)"><a-input v-decorator="['orderid', {rules:[{required: true, message: '请输入溯源批次号(编号)'}]}]" /></a-form-item>
        <a-form-item label="供应商名字"><a-input v-decorator="['gyname', {rules:[{required: true, message: '请输入供应商名字'}]}]" /></a-form-item>
        <a-form-item label="申报时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入申报时间'}]}]" /></a-form-item>
        <a-form-item label="进场时间"><a-input v-decorator="['jtime', {rules:[{required: true, message: '请输入进场时间'}]}]" /></a-form-item>
        <a-form-item label="车牌号"><a-input v-decorator="['licenseplatenumber', {rules:[{required: true, message: '请输入车牌号'}]}]" /></a-form-item>
        <a-form-item label="验收人"><a-input v-decorator="['register', {rules:[{required: true, message: '请输入验收人'}]}]" /></a-form-item>
        <a-form-item label="养殖户"><a-input v-decorator="['farmers', {rules:[{required: true, message: '请输入养殖户'}]}]" /></a-form-item>
        <a-form-item label="屠宰场名称"><a-input v-decorator="['logisticianname', {rules:[{required: true, message: '请输入屠宰场名称'}]}]" /></a-form-item>
        <a-form-item label="屠宰票证"><a-input v-decorator="['ticket', {rules:[{required: true, message: '请输入屠宰票证'}]}]" /></a-form-item>
        <a-form-item label="养殖票证"><a-input v-decorator="['wphoto', {rules:[{required: true, message: '请输入养殖票证'}]}]" /></a-form-item>
        <a-form-item label="溯源码"><a-input v-decorator="['sycode', {rules:[{required: true, message: '请输入溯源码'}]}]" /></a-form-item>
        <a-form-item label="流向时间"><a-input v-decorator="['lxaddtime', {rules:[{required: true, message: '请输入流向时间'}]}]" /></a-form-item>
        <a-form-item label="流向地址"><a-input v-decorator="['flowaddress', {rules:[{required: true, message: '请输入流向地址'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['certificateno', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="批发市场名字"><a-input v-decorator="['logistician', {rules:[{required: true, message: '请输入批发市场名字'}]}]" /></a-form-item>

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
const fields = ['id', 'namess', 'outtradeno', 'devicename', 'devicecode', 'rank', 'orderid', 'gyname', 'addtime', 'jtime', 'licenseplatenumber', 'register', 'farmers', 'logisticianname', 'ticket', 'wphoto', 'sycode', 'lxaddtime', 'flowaddress', 'certificateno', 'logistician', 'status']

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
