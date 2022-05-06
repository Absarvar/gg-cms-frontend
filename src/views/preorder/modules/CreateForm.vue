<template>
  <a-modal
    title="操作"
    :width="1240"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">

        <button @click="dayin()">打印</button>

        <!-- <div class="row row-no-gutters">
          <div class="col-xs-4 col-md-4">会员名称:<span style="font-weight:bold"> {{ ticket.memberName }}</span></div>
          <div class="col-xs-4 col-md-4" style="text-align:right"><span>预定时间：{{ ticket.addTimeStr }}</span></div>
        </div> -->

        <div class="text-center" id="div_print">
          <table class="mx-auto table table-bordered table-hover heavy_border t2print" style="width:1240px;">
            <tbody>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="14"><h4><b>供广市场  客户预定订单</b></h4></td>
              </tr>
              <tr>
                <td scope="col" style="text-align:left;border-width:2px;border-color:#000000;" colspan="10">客户名称：{{ ticket.memberName }}</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="1">联系人：</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="1">{{ ticket.contactMan }}</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="2">联系电话：{{ ticket.phone }}</td>
              </tr>
              <tr>
                <td scope="col" style="text-align:left;border-width:2px;border-color:#000000;" colspan="12">供货单位：供广深圳肉类智能交易市场有限公司</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="2">到货日期：</td>
              </tr>
              <tr>
                <td scope="col" style="text-align:left;border-width:2px;border-color:#000000;" colspan="14">订单编号：</td>
              </tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" >订货日期</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" >回货日期</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" >预计到货时间</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" >商品</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">规格</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">数量</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">单位</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">销售价（公斤/元）</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">预付款</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">确认规格（kg）</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">确认数量（kg）</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">实际单价（公斤/元）</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">实际费用（元）</td>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">备注</td>

              </tr>
              <template v-for="(preorder,index) in ticket.preorderList">

                <tr :key="index">
                  <th style="border-width:2px;border-color:#000000;text-align:center;width:100px;">{{ ticket.addTimeStr }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center;width:100px;">{{ ticket.theArrivalTimeStr }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center;">晚上8-10点</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center;width:60px;">{{ preorder.commodity }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center;width:60px;">{{ preorder.specification }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center">{{ preorder.number }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center">头</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center">{{ preorder.price }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center">{{ preorder.money }}</th>

                  <th style="border-width:2px;border-color:#000000;text-align:center">{{ preorder.guige }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center">{{ preorder.qnumber }}</th>
                  <th style="border-width:2px;border-color:#000000;text-align:center"></th>
                  <th style="border-width:2px;border-color:#000000;text-align:center"></th>
                  <th style="border-width:2px;border-color:#000000;text-align:center"></th>
                </tr>

              </template>
            </tbody>
          </table>
        </div>

        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->
        <!-- <a-form-item
          label="id"
          hidden
        >
          <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
        </a-form-item>
        <a-form-item label="会员id"><a-input v-decorator="['ouid', {rules:[{required: true, message: '请输入会员id'}]}]" /></a-form-item>
        <a-form-item label="会员名称"><a-input v-decorator="['membername', {rules:[{required: true, message: '请输入会员名称'}]}]" /></a-form-item>
        <a-form-item label="电话"><a-input v-decorator="['phone', {rules:[{required: true, message: '请输入电话'}]}]" /></a-form-item>
        <a-form-item label="预定商品"><a-input v-decorator="['commodity', {rules:[{required: true, message: '请输入预定商品'}]}]" /></a-form-item>
        <a-form-item label="商品级别"><a-input v-decorator="['rank', {rules:[{required: true, message: '请输入商品级别'}]}]" /></a-form-item>
        <a-form-item label="商品规格"><a-input v-decorator="['specification', {rules:[{required: true, message: '请输入商品规格'}]}]" /></a-form-item>
        <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
        <a-form-item label="到货时间"><a-input v-decorator="['thearrivaltime', {rules:[{required: true, message: '请输入到货时间'}]}]" /></a-form-item>
        <a-form-item label="业务员"><a-input v-decorator="['salesman', {rules:[{required: true, message: '请输入业务员'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['number', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="确认数量"><a-input v-decorator="['qnumber', {rules:[{required: true, message: '请输入确认数量'}]}]" /></a-form-item>
        <a-form-item label="确认价格"><a-input v-decorator="['price', {rules:[{required: true, message: '请输入确认价格'}]}]" /></a-form-item>
        <a-form-item label="确认状态"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入确认状态'}]}]" /></a-form-item>
        <a-form-item label="预估金额"><a-input v-decorator="['money', {rules:[{required: true, message: '请输入预估金额'}]}]" /></a-form-item>
        <a-form-item label="确认规格"><a-input v-decorator="['guige', {rules:[{required: true, message: '请输入确认规格'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['remarks', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item> -->
        <!--
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
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'ouid', 'membername', 'phone', 'commodity', 'rank', 'specification', 'addtime', 'thearrivaltime', 'salesman', 'number', 'qnumber', 'price', 'type', 'money', 'guige', 'remarks', 'status']

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
      ticket: {

      },
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
    if (this.model !== null) {
      this.ticket = this.model
    }
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      if (this.model !== null) {
        this.ticket = this.model
      }
    })
  },
  methods: {
    dayin () {
        // var userAgent = navigator.userAgent.toLowerCase() // 取得浏览器的userAgent字符串 // 其它浏览器使用lodop
            var oldstr = document.body.innerHTML
            var headstr = '<html><head><title></title></head><body>'
            var footstr = '</body>'
            // 执行隐藏打印区域不需要打印的内容
            // document.getElementById('otherpho').style.display = 'none'
            // 此处id换为你自己的id
            var printData = document.getElementById('div_print').innerHTML // 获得 div 里的所有 html 数据
            document.body.innerHTML = headstr + printData + footstr
            window.print()
            // 打印结束后，放开隐藏内容
            // document.getElementById('otherpho').style.display = 'block'
            document.body.innerHTML = oldstr
            window.location.reload()
            // this.isPrint = false
            // console.log(location.href)
    }
  }
}
</script>
