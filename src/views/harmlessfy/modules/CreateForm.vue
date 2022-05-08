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
        <a-form-item label="日期"><a-input v-decorator="['date', {rules:[{required: true, message: '请输入日期'}]}]" /></a-form-item>
        <a-form-item label="种类"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入种类'}]}]" /></a-form-item>
        <a-form-item label="处理原因"><a-input v-decorator="['hreasons', {rules:[{required: true, message: '请输入处理原因'}]}]" /></a-form-item>
        <a-form-item label="进场批次号"><a-input v-decorator="['batchnumber', {rules:[{required: true, message: '请输入进场批次号'}]}]" /></a-form-item>
        <a-form-item label="供应商名称"><a-input v-decorator="['suppliername', {rules:[{required: true, message: '请输入供应商名称'}]}]" /></a-form-item>
        <a-form-item label="动物来源"><a-input v-decorator="['animalorigin', {rules:[{required: true, message: '请输入动物来源'}]}]" /></a-form-item>
        <a-form-item label="运输车牌"><a-input v-decorator="['licenseplate', {rules:[{required: true, message: '请输入运输车牌'}]}]" /></a-form-item>
        <a-form-item label="数量（头/公斤）"><a-input v-decorator="['quantity', {rules:[{required: true, message: '请输入数量（头/公斤）'}]}]" /></a-form-item>
        <a-form-item label="现场照片"><a-input v-decorator="['sitephotos', {rules:[{required: true, message: '请输入现场照片'}]}]" /></a-form-item>
        <a-form-item label="录入人"><a-input v-decorator="['enteredby', {rules:[{required: true, message: '请输入录入人'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['remark', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item>

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
const fields = ['id', 'date', 'type', 'hreasons', 'batchnumber', 'suppliername', 'animalorigin', 'licenseplate', 'quantity', 'sitephotos', 'enteredby', 'remark', 'status']

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
