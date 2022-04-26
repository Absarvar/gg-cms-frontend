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
        <a-form-item label="入场申报ID"><a-input v-decorator="['enterApplyId', {rules:[{required: true, message: '请输入入场申报ID'}]}]" /></a-form-item>
        <a-form-item label="样品编号"><a-input v-decorator="['sampleCode', {rules:[{required: true, message: '请输入样品编号'}]}]" /></a-form-item>
        <a-form-item label="样品种类"><a-input v-decorator="['sampleType', {rules:[{required: true, message: '请输入样品种类'}]}]" /></a-form-item>
        <a-form-item label="样品种类"><a-input v-decorator="['collector', {rules:[{required: true, message: '请输入样品种类'}]}]" /></a-form-item>
        <a-form-item label="样品种类"><a-input v-decorator="['tester', {rules:[{required: true, message: '请输入样品种类'}]}]" /></a-form-item>
        <a-form-item label="样品种类"><a-input v-decorator="['reportPic', {rules:[{required: true, message: '请输入样品种类'}]}]" /></a-form-item>
        <a-form-item label="样品种类"><a-input v-decorator="['collectorTime', {rules:[{required: true, message: '请输入样品种类'}]}]" /></a-form-item>

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
const fields = ['id', 'enterApplyId', 'sampleCode', 'sampleType', 'collector', 'tester', 'reportPic', 'collectorTime', 'status']

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
