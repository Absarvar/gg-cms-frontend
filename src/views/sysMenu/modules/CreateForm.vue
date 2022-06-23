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
        <a-form-item label="菜单名称(英文）"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入菜单名称(英文）'}]}]" /></a-form-item>
        <a-form-item label="父级菜单id"><a-input v-decorator="['parentId', {rules:[{required: true, message: '请输入父级菜单id'}]}]" /></a-form-item>
        <a-form-item label="meta信息json"><a-input v-decorator="['metaJson', {rules:[{required: true, message: '请输入meta信息json'}]}]" /></a-form-item>
        <a-form-item label="组件"><a-input v-decorator="['component', {rules:[{required: true, message: '请输入组件'}]}]" /></a-form-item>
        <a-form-item label="路径"><a-input v-decorator="['path', {rules:[{required: true, message: '请输入路径'}]}]" /></a-form-item>
        <a-form-item label="重定向地址"><a-input v-decorator="['redirect', {rules:[{required: true, message: '请输入重定向地址'}]}]" /></a-form-item>
        <a-form-item label="meta信息json"><a-input v-decorator="['meta', {rules:[{required: true, message: '请输入meta信息json'}]}]" /></a-form-item>

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
const fields = ['id', 'name', 'parentId', 'metaJson', 'component', 'path', 'redirect', 'meta', 'status']

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
