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
        <a-form-item label="ID"><a-input v-decorator="['orderid', {rules:[{required: true, message: '请输入ID'}]}]" /></a-form-item>
        <a-form-item label="入场批次号"><a-input v-decorator="['pinjie', {rules:[{required: true, message: '请输入入场批次号'}]}]" /></a-form-item>
        <a-form-item label="动物种类"><a-input v-decorator="['animalspecies', {rules:[{required: true, message: '请输入动物种类'}]}]" /></a-form-item>
        <a-form-item label="车牌号"><a-input v-decorator="['licenseplatenumber', {rules:[{required: true, message: '请输入车牌号'}]}]" /></a-form-item>
        <a-form-item label="确认状态"><a-input v-decorator="['statusok', {rules:[{required: true, message: '请输入确认状态'}]}]" /></a-form-item>
        <a-form-item label="申报人"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入申报人'}]}]" /></a-form-item>
        <a-form-item label="联系方式"><a-input v-decorator="['consigneephonenum', {rules:[{required: true, message: '请输入联系方式'}]}]" /></a-form-item>
        <a-form-item label="预报规格"><a-input v-decorator="['standards', {rules:[{required: true, message: '请输入预报规格'}]}]" /></a-form-item>
        <a-form-item label="预报数量"><a-input v-decorator="['number', {rules:[{required: true, message: '请输入预报数量'}]}]" /></a-form-item>
        <a-form-item label="申报重量"><a-input v-decorator="['quantity', {rules:[{required: true, message: '请输入申报重量'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['certificateno', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="屠宰单位"><a-input v-decorator="['destination', {rules:[{required: true, message: '请输入屠宰单位'}]}]" /></a-form-item>
        <a-form-item label="养殖单位"><a-input v-decorator="['farmers', {rules:[{required: true, message: '请输入养殖单位'}]}]" /></a-form-item>
        <a-form-item label="司机"><a-input v-decorator="['driver', {rules:[{required: true, message: '请输入司机'}]}]" /></a-form-item>
        <a-form-item label="司机手机号"><a-input v-decorator="['cellphonenumber', {rules:[{required: true, message: '请输入司机手机号'}]}]" /></a-form-item>
        <a-form-item label="屠宰场ID"><a-input v-decorator="['logisticianid', {rules:[{required: true, message: '请输入屠宰场ID'}]}]" /></a-form-item>
        <a-form-item label="供应商id"><a-input v-decorator="['fid', {rules:[{required: true, message: '请输入供应商id'}]}]" /></a-form-item>
        <a-form-item label="商家类型 1.生产者 2.供应商"><a-input v-decorator="['factorytype', {rules:[{required: true, message: '请输入商家类型 1.生产者 2.供应商'}]}]" /></a-form-item>
        <a-form-item label="车辆是否消毒 1-是  2-否"><a-input v-decorator="['disinfected', {rules:[{required: true, message: '请输入车辆是否消毒 1-是  2-否'}]}]" /></a-form-item>
        <a-form-item label="养殖户ID"><a-input v-decorator="['outletsid', {rules:[{required: true, message: '请输入养殖户ID'}]}]" /></a-form-item>
        <a-form-item label="商品id"><a-input v-decorator="['shoppingid', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item>
        <a-form-item label="启动地点"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入启动地点'}]}]" /></a-form-item>
        <a-form-item label="运输方式"><a-input v-decorator="['typeofshipping', {rules:[{required: true, message: '请输入运输方式'}]}]" /></a-form-item>
        <a-form-item label="入场申报票证"><a-input v-decorator="['wphoto', {rules:[{required: true, message: '请输入入场申报票证'}]}]" /></a-form-item>
        <a-form-item label="入库计重"><a-input v-decorator="['warehousing', {rules:[{required: true, message: '请输入入库计重'}]}]" /></a-form-item>
        <a-form-item label="出库时间"><a-input v-decorator="['exwarehousetime', {rules:[{required: true, message: '请输入出库时间'}]}]" /></a-form-item>
        <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
        <a-form-item label="复核时间"><a-input v-decorator="['futime', {rules:[{required: true, message: '请输入复核时间'}]}]" /></a-form-item>
        <a-form-item label="登记员"><a-input v-decorator="['register', {rules:[{required: true, message: '请输入登记员'}]}]" /></a-form-item>
        <a-form-item label="销售入库0，定向入库1"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入销售入库0，定向入库1'}]}]" /></a-form-item>
        <a-form-item label="屠宰票证"><a-input v-decorator="['ticket', {rules:[{required: true, message: '请输入屠宰票证'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['remark', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item>
        <a-form-item label="合格（1合格2不合格）"><a-input v-decorator="['qualified', {rules:[{required: true, message: '请输入合格（1合格2不合格）'}]}]" /></a-form-item>
        <a-form-item label="初始读数"><a-input v-decorator="['initialreading', {rules:[{required: true, message: '请输入初始读数'}]}]" /></a-form-item>
        <a-form-item label="复核读数"><a-input v-decorator="['recheckreading', {rules:[{required: true, message: '请输入复核读数'}]}]" /></a-form-item>
        <a-form-item label="复核重量"><a-input v-decorator="['recheckweight', {rules:[{required: true, message: '请输入复核重量'}]}]" /></a-form-item>

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
const fields = ['id', 'orderid', 'pinjie', 'animalspecies', 'licenseplatenumber', 'statusok', 'name', 'consigneephonenum', 'standards', 'number', 'quantity', 'certificateno', 'destination', 'farmers', 'driver', 'cellphonenumber', 'logisticianid', 'fid', 'factorytype', 'disinfected', 'outletsid', 'shoppingid', 'address', 'typeofshipping', 'wphoto', 'warehousing', 'exwarehousetime', 'addtime', 'futime', 'register', 'type', 'ticket', 'remark', 'qualified', 'initialreading', 'recheckreading', 'recheckweight', 'status']

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
