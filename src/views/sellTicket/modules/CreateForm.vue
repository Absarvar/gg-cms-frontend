<template>
  <a-modal
    title="打印预览"
    :width="850"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >

    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">

        <div align="center" >
          <a-button type="primary" @click="printHTML()">打印</a-button>
          <div class="text-center" style="width:750px;height:417px;" align="center" >
            <br>
            <h4>供广深圳肉类智能交易市场动物产品分销信息凭证</h4>
            <div style="margin-top:0px;">
              <div style="float:left;margin-left:0px;" align="left" >
                <div style="margin-top:20px">&nbsp; 购货单位：{{ ticket.flowaddress }}</div>
                <div> </div>
              </div>
              <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.nowTime }}</div>
            </div>
            <table
              class="table table-bordered table-hover heavy_border t2print"
              style="vertical-align:middle;padding-top:15px;margin-bottom:1px;">
              <tbody >
                <tr style="">
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">商品名称</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">生产单位</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">原检疫证号</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >上级供应商</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >分销凭证号</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">规格</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">数量</td>
                  <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">重量（千克）</td>
                </tr>
                <tr>
                  <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle">已经过分销的，须填写</td>
                </tr>
                <tr>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>   {{ ticket.productname }}<br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    {{ ticket.business }}<br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    {{ ticket.certificateno }}<br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br><br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    {{ ticket.number }}<br></th>
                  <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    {{ ticket.quantity }}<br></th>
                </tr>
                <tr>
                  <th style="border-width:1px;border-color:#000000;text-align:left;" colspan="7">合计：</th>
                  <th style="border-width:1px;border-color:#000000;">    {{ ticket.quantity }}</th>
                </tr>
              </tbody>
            </table>
            <div>
              <div style="float:left;" align="left" >
                <div>供货单位：供广深圳肉类智能交易市场有限公司</div>
                <div>出证单位：供广深圳肉类智能交易市场</div>
              </div>
              <div style="float:right;">出证人：&nbsp;&nbsp;&nbsp;&nbsp;莫洋飞</div>
            </div>
          </div>
        </div>
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
        <!-- <a-form-item label="会员id"><a-input v-decorator="['memberid', {rules:[{required: true, message: '请输入会员id'}]}]" /></a-form-item> -->
        <a-form-item label="产品名称"><a-input v-decorator="['productname', {rules:[{required: true, message: '请输入产品名称'}]}]" /></a-form-item>
        <!-- <a-form-item label="重量"><a-input v-decorator="['merchandisequantity', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item> -->
        <!-- <a-form-item label="生产单位"><a-input v-decorator="['productionunit', {rules:[{required: true, message: '请输入生产单位'}]}]" /></a-form-item> -->
        <a-form-item label="流向地址"><a-input v-decorator="['flowaddress', {rules:[{required: true, message: '请输入流向地址'}]}]" /></a-form-item>
        <!-- <a-form-item label="订单编号"><a-input v-decorator="['orderno', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item> -->
        <!-- <a-form-item label="物种"><a-input v-decorator="['animalspecies', {rules:[{required: true, message: '请输入物种'}]}]" /></a-form-item> -->
        <a-form-item label="屠宰单位"><a-input v-decorator="['business', {rules:[{required: true, message: '请输入屠宰单位'}]}]" /></a-form-item>
        <a-form-item label="原检疫证号"><a-input v-decorator="['certificateno', {rules:[{required: true, message: '请输入原检疫证号'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['quantity', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['number', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <!-- <a-form-item label="上级供应商"><a-input v-decorator="['sjgys', {rules:[{required: true, message: '请输入上级供应商'}]}]" /></a-form-item> -->
        <!-- <a-form-item label="入场批次号"><a-input v-decorator="['mobilizationbatch', {rules:[{required: true, message: '请输入入场批次号'}]}]" /></a-form-item> -->

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'memberid', 'productname', 'merchandisequantity', 'productionunit', 'flowaddress', 'orderno', 'animalspecies', 'business', 'certificateno', 'quantity', 'number', 'sjgys', 'mobilizationbatch', 'status']

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
        xs: { span: 64 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 64 },
        sm: { span: 13 }
      }
    }
    return {
      ticket: {

      },
      nowTime: {},
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
    this.nowTime = this.getNowTime()
    if (this.model !== null) {
      this.ticket = this.model
      console.log(this.model)
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
    getNowTime () { // 获取当前时间
      const nowDate = new Date()
      const yy = nowDate.getFullYear()
      const mm = nowDate.getMonth() + 1
      const dd = nowDate.getDate()
      const hh = nowDate.getHours()
      const mf = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes()
        : nowDate.getMinutes()
      // const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
      //   : new Date().getSeconds()
      const dateTime = yy + '年' + mm + '月' + dd + '日' + hh + '时' + mf + '分'
      return dateTime
    },
      printHTML (model) {
// 打开一个新的浏览器窗口
var win = window.open('print22')

// win.document.write('sddddddddddddddddddddddddddd')
// win.focus()// 在IE浏览器中使用必须添加这一句
// win.print()
// 写入
win.document.write(`
	<html>
<style>
</style>
	<body>
		<div class="text-center" style="width:750px;height:417px;" align="center" >
       <br>
      <div style="margin-top:0px;">
        <div style="float:left;margin-left:50px;" align="left" >
          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;` + this.model.flowaddress + `</div>
          <div> </div>
        </div>
        <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;` + this.nowTime + `</div>
      </div>
      <table
        class="table table-bordered table-hover heavy_border t2print"
        style="padding-top:15px;margin-bottom:1px;float:left;width:750px;">
        <tbody >

          <tr>
            <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
          </tr>
          <tr>
            <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
          </tr>

          <tr>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:70px;height:120px;">    ` + this.model.productname + `</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:115px;height:120px;">   ` + this.model.business + `</td>
            <td style="text-align:left;border-width:0px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:105px;height:130px;">` + this.model.certificateno + `</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:110px;height:110px;visibility:hidden;">{上级供应商	}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:120px;height:100px;visibility:hidden;">{	分销凭证号	}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:50px;height:120px;visibility:hidden;">{规格}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:55px;height:120px;"> &nbsp;&nbsp;&nbsp;` + this.model.number + `</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:100px;height:120px;">&nbsp;` + this.model.quantity + `</td>
          </tr>
          <tr>
            <td colspan="2" style="height:40px;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
          </tr>
          <tr>
            <td style="border-width:1px;border-color:#000000;text-align:left;" colspan="7">&nbsp;&nbsp;&nbsp;</td>
            <td style="border-width:1px;border-color:#000000;" align="center">    ` + this.model.quantity + `</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:60px;">
        <div style="float:left;margin-left:50px;" align="left" >
          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b>供广深圳肉类智能交易市场有限公司</b></div>
          <div> </div>
        </div>
      <div style="float:right;margin-right:70px;margin-top:10px;"><div> &nbsp;</div> <div> &nbsp;</div>&nbsp; &nbsp; &nbsp; &nbsp;莫洋飞</div>

      </div>
    </div>

	</body>
	</html>
`)
win.document.close()// 在IE浏览器中使用必须添加这一句
win.focus()// 在IE浏览器中使用必须添加这一句
win.print()
win.close()
}
  }

}
</script>
