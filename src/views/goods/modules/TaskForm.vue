<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="id"
      hidden
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
    </a-form-item>
    <a-form-item
      label="商品名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['name', {rules:[{required: true, message: '请输入商品名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="物种"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-space>
        <a-select
          ref="select"
          style="width: 120px"
          v-decorator="['species', {initialValue:this.record.species}, {rules:[{required: true, message: '请输入物种'}]}]"
          :options="options1"
        ></a-select>
      </a-space>
    </a-form-item>
    <a-form-item
      label="单位"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['unit', {rules:[{required: true, message: '请输入单位'}]}]" />
    </a-form-item>

    <!-- <a-form-item
      label="开始时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-date-picker
        style="width: 100%"
        valueFormat="YYYY-MM-DD HH:mm"
        v-decorator="['startAt', {rules:[{required: true, message: '请选择开始时间'}]}]"
      />
    </a-form-item>
    <a-form-item
      label="公司名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['owner', {rules:[{required: true, message: '请选择开始时间'}]}]">
        <a-select-option :value="0">付晓晓</a-select-option>
        <a-select-option :value="1">周毛毛</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="产品描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['description']"></a-textarea>
    </a-form-item> -->

  </a-form>
</template>

<script>
import pick from 'lodash.pick'
import { editGoods, newGoods } from '@/api/goodsApi'

const fields = ['name', 'species', 'unit', 'id']

export default {
  name: 'TaskForm',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this),
      options1: [{
        value: 1,
        label: '猪',
        selected: true
      }, {
        value: 2,
        label: '牛'
      }, {
        value: 3,
        label: '羊'
      }]
    }
  },
  mounted () {
    this.record && this.form.setFieldsValue(pick(this.record, fields))
  },
  methods: {
    onOk () {
      console.log('监听了 modal ok 事件')
      if (this.form.getFieldsValue()['id'] > 0) {
        editGoods(this.form.getFieldsValue()).then(res => {
          this.info = res.data
        }).catch(err => {
        const { $message } = this
          $message.error(`load user err: ${err.message}`)
        })
      } else {
        newGoods(this.form.getFieldsValue()).then(res => {
          this.info = res.data
        }).catch(err => {
        const { $message } = this
          $message.error(`load user err: ${err.message}`)
        })
      }
      return new Promise(resolve => {
        resolve(true)
      })
    },
    onCancel () {
      console.log('监听了 modal cancel 事件')
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.visible = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
        }
      })
    }
  }
}
</script>
