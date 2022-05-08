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
        <a-form-item label="供应商名称"><a-input v-decorator="['corporatename', {rules:[{required: true, message: '请输入供应商名称'}]}]" /></a-form-item>
        <a-form-item label="相关认证"><a-input v-decorator="['certificationtypeyz', {rules:[{required: true, message: '请输入相关认证'}]}]" /></a-form-item>
        <a-form-item label="信用代码"><a-input v-decorator="['businesslicensenumber', {rules:[{required: true, message: '请输入信用代码'}]}]" /></a-form-item>
        <a-form-item label="屠宰营业执照上传"><a-input v-decorator="['businesslicense', {rules:[{required: true, message: '请输入屠宰营业执照上传'}]}]" /></a-form-item>
        <a-form-item label="屠宰单位"><a-input v-decorator="['namefarm', {rules:[{required: true, message: '请输入屠宰单位'}]}]" /></a-form-item>
        <a-form-item label="屠宰地址"><a-input v-decorator="['farmaddress', {rules:[{required: true, message: '请输入屠宰地址'}]}]" /></a-form-item>
        <a-form-item label="联系人"><a-input v-decorator="['personincharge', {rules:[{required: true, message: '请输入联系人'}]}]" /></a-form-item>
        <a-form-item label="电话"><a-input v-decorator="['contactinformation', {rules:[{required: true, message: '请输入电话'}]}]" /></a-form-item>
        <a-form-item label="信用代码"><a-input v-decorator="['creditcode', {rules:[{required: true, message: '请输入信用代码'}]}]" /></a-form-item>
        <a-form-item label="场地人数"><a-input v-decorator="['people', {rules:[{required: true, message: '请输入场地人数'}]}]" /></a-form-item>
        <a-form-item label="养殖种类"><a-input v-decorator="['breedingspecies', {rules:[{required: true, message: '请输入养殖种类'}]}]" /></a-form-item>
        <a-form-item label="出栏量"><a-input v-decorator="['stock', {rules:[{required: true, message: '请输入出栏量'}]}]" /></a-form-item>
        <a-form-item label="占地面积"><a-input v-decorator="['areacovered', {rules:[{required: true, message: '请输入占地面积'}]}]" /></a-form-item>
        <a-form-item label="行政许可动物防疫合格证号"><a-input v-decorator="['animalepidemic', {rules:[{required: true, message: '请输入行政许可动物防疫合格证号'}]}]" /></a-form-item>
        <a-form-item label="养殖场备案号"><a-input v-decorator="['farmrecordno', {rules:[{required: true, message: '请输入养殖场备案号'}]}]" /></a-form-item>
        <a-form-item label="审核报告上传"><a-input v-decorator="['auditreport', {rules:[{required: true, message: '请输入审核报告上传'}]}]" /></a-form-item>
        <a-form-item label="审核时间"><a-input v-decorator="['constructiontime', {rules:[{required: true, message: '请输入审核时间'}]}]" /></a-form-item>
        <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
        <a-form-item label="审核人"><a-input v-decorator="['reviewer', {rules:[{required: true, message: '请输入审核人'}]}]" /></a-form-item>
        <a-form-item label="提交人id"><a-input v-decorator="['operatorid', {rules:[{required: true, message: '请输入提交人id'}]}]" /></a-form-item>

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
const fields = ['id', 'corporatename', 'certificationtypeyz', 'businesslicensenumber', 'businesslicense', 'namefarm', 'farmaddress', 'personincharge', 'contactinformation', 'creditcode', 'people', 'breedingspecies', 'stock', 'areacovered', 'animalepidemic', 'farmrecordno', 'auditreport', 'constructiontime', 'addtime', 'reviewer', 'operatorid', 'status']

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
