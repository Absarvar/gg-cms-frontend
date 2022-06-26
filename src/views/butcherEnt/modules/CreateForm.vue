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
        <a-form-item label="名称"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入名称'}]}]" /></a-form-item>
        <a-form-item label="地址"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入地址'}]}]" /></a-form-item>
        <a-form-item label="信用代码"><a-input v-decorator="['creditCode', {rules:[{required: true, message: '请输入信用代码'}]}]" /></a-form-item>
        <a-form-item label="场地人数"><a-input v-decorator="['peopleNum', {rules:[{required: true, message: '请输入场地人数'}]}]" /></a-form-item>
        <a-form-item label="联系人"><a-input v-decorator="['linkman', {rules:[{required: true, message: '请输入联系人'}]}]" /></a-form-item>
        <a-form-item label="联系人手机"><a-input v-decorator="['linkmanMobile', {rules:[{required: true, message: '请输入联系人手机'}]}]" /></a-form-item>
        <a-form-item label="屠宰类型"><a-input v-decorator="['butcherType', {rules:[{required: true, message: '请输入屠宰类型'}]}]" /></a-form-item>
        <a-form-item label="屠宰量（头/天）"><a-input v-decorator="['butcherNum', {rules:[{required: true, message: '请输入屠宰量（头/天）'}]}]" /></a-form-item>
        <a-form-item label="场地面积"><a-input v-decorator="['butcherArea', {rules:[{required: true, message: '请输入场地面积'}]}]" /></a-form-item>
        <a-form-item label="动物检疫合格证号"><a-input v-decorator="['aniQuarantineNo', {rules:[{required: true, message: '请输入动物检疫合格证号'}]}]" /></a-form-item>
        <a-form-item label="屠宰场备案号"><a-input v-decorator="['farmBackupNo', {rules:[{required: true, message: '请输入屠宰场备案号'}]}]" /></a-form-item>

        <a-form-item label="营业执照">
          <a-upload
            name="file"
            :multiple="true"
            :action="uploadUrl.ticket"
            :headers="uploadHeaders"
            @change="uploadBusinessLicense"
          >
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>
          <a-input v-decorator="['businessLicense', {rules:[{required: true, message: '请上传营业执照'}]}]" />
        </a-form-item>

        <a-form-item label="相关认证">
          <a-upload
            name="file"
            :multiple="true"
            :action="uploadUrl.ticket"
            :headers="uploadHeaders"
            @change="uploadRelatedLicense"
          >
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>
          <a-input v-decorator="['relatedLicense', {rules:[{required: true, message: '请上传相关认证'}]}]" />
        </a-form-item>

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
import { uploadHeaders, uploadUrl, handleUploadInfo } from '@/utils/util'

// 表单字段
const fields = ['id', 'name', 'address', 'creditCode', 'peopleNum', 'linkman', 'linkmanMobile', 'butcherType', 'butcherNum', 'butcherArea', 'aniQuarantineNo', 'farmBackupNo', 'businessLicense', 'relatedLicense', 'status']

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
      uploadHeaders: uploadHeaders,
      uploadUrl: uploadUrl,
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
  methods: {
    uploadRelatedLicense (info) {
      var fileName = info.file.response.data.url
      this.form.setFieldsValue({ relatedLicense: fileName })
      return handleUploadInfo(info)
    },
    uploadBusinessLicense (info) {
      var fileName = info.file.response.data.url
      this.form.setFieldsValue({ businessLicense: fileName })
      return handleUploadInfo(info)
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
