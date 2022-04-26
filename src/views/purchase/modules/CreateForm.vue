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
        <a-form-item label="供应商"><a-input v-decorator="['sourceId', {rules:[{required: true, message: '请输入供应商'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="规格"><a-input v-decorator="['sku', {rules:[{required: true, message: '请输入规格'}]}]" /></a-form-item>
        <a-form-item label="单价"><a-input v-decorator="['price', {rules:[{required: true, message: '请输入单价'}]}]" /></a-form-item>
        <a-form-item label="采购重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入采购重量'}]}]" /></a-form-item>
        <a-form-item label="实收重量"><a-input v-decorator="['weightAct', {rules:[{required: true, message: '请输入实收重量'}]}]" /></a-form-item>
        <a-form-item label="制单人"><a-input v-decorator="['operator', {rules:[{required: true, message: '请输入制单人'}]}]" /></a-form-item>
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
const fields = ['id', 'sourceId', 'goodsId', 'num', 'sku', 'price', 'weight', 'weightAct', 'operator', 'createTime', 'status']

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
