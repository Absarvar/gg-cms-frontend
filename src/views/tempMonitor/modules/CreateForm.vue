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
        <a-form-item label="批次号"><a-input v-decorator="['batchNo', {rules:[{required: true, message: '请输入批次号'}]}]" /></a-form-item>
        <a-form-item label="屠宰场名称"><a-input v-decorator="['butcherEntName', {rules:[{required: true, message: '请输入屠宰场名称'}]}]" /></a-form-item>
        <a-form-item label="批次"><a-input v-decorator="['batch', {rules:[{required: true, message: '请输入批次'}]}]" /></a-form-item>
        <a-form-item label="车牌号"><a-input v-decorator="['plateNo', {rules:[{required: true, message: '请输入车牌号'}]}]" /></a-form-item>
        <a-form-item label="商品"><a-input v-decorator="['goodsName', {rules:[{required: true, message: '请输入商品'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="屠宰时间"><a-input v-decorator="['butcherTime', {rules:[{required: true, message: '请输入屠宰时间'}]}]" /></a-form-item>
        <a-form-item label="屠宰水温"><a-input v-decorator="['butcherWaterTemp', {rules:[{required: true, message: '请输入屠宰水温'}]}]" /></a-form-item>
        <a-form-item label="凉水池"><a-input v-decorator="['coolPool', {rules:[{required: true, message: '请输入凉水池'}]}]" /></a-form-item>
        <a-form-item label="入库时间"><a-input v-decorator="['instockTime', {rules:[{required: true, message: '请输入入库时间'}]}]" /></a-form-item>
        <a-form-item label="入库温度"><a-input v-decorator="['instockTemp', {rules:[{required: true, message: '请输入入库温度'}]}]" /></a-form-item>
        <a-form-item label="预冷库温度"><a-input v-decorator="['precoldTemp', {rules:[{required: true, message: '请输入预冷库温度'}]}]" /></a-form-item>
        <a-form-item label="出库时间"><a-input v-decorator="['outstockTime', {rules:[{required: true, message: '请输入出库时间'}]}]" /></a-form-item>
        <a-form-item label="出库温度"><a-input v-decorator="['outstockTemp', {rules:[{required: true, message: '请输入出库温度'}]}]" /></a-form-item>
        <a-form-item label="始发车厢温度"><a-input v-decorator="['takeOffTemp', {rules:[{required: true, message: '请输入始发车厢温度'}]}]" /></a-form-item>
        <a-form-item label="出发时间"><a-input v-decorator="['takeOffTime', {rules:[{required: true, message: '请输入出发时间'}]}]" /></a-form-item>
        <a-form-item label="途中车厢温度"><a-input v-decorator="['onWayTemp', {rules:[{required: true, message: '请输入途中车厢温度'}]}]" /></a-form-item>
        <a-form-item label="途中中心温度"><a-input v-decorator="['onWayCenterTemp', {rules:[{required: true, message: '请输入途中中心温度'}]}]" /></a-form-item>
        <a-form-item label="到达供广时间"><a-input v-decorator="['arriveTime', {rules:[{required: true, message: '请输入到达供广时间'}]}]" /></a-form-item>
        <a-form-item label="到场车厢温度"><a-input v-decorator="['arriveTemp', {rules:[{required: true, message: '请输入到场车厢温度'}]}]" /></a-form-item>
        <a-form-item label="到场中心温度"><a-input v-decorator="['arriveCenterTemp', {rules:[{required: true, message: '请输入到场中心温度'}]}]" /></a-form-item>
        <a-form-item label="操作员"><a-input v-decorator="['operatorId', {rules:[{required: true, message: '请输入操作员'}]}]" /></a-form-item>

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
const fields = ['id', 'batchNo', 'butcherEntName', 'batch', 'plateNo', 'goodsName', 'num', 'butcherTime', 'butcherWaterTemp', 'coolPool', 'instockTime', 'instockTemp', 'precoldTemp', 'outstockTime', 'outstockTemp', 'takeOffTemp', 'takeOffTime', 'onWayTemp', 'onWayCenterTemp', 'arriveTime', 'arriveTemp', 'arriveCenterTemp', 'operatorId', 'status']

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
