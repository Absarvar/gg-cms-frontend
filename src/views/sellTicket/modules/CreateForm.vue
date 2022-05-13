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
            <h4>供广深圳肉类智能交易市场</h4>
            <h4>动物产品分销信息凭证</h4>
            <div style="margin-top:0px;">
              <div style="float:left;margin-left:0px;" align="left" >
                <div style="margin-top:20px">&nbsp; NO：{{ ticket.fxId }}</div>
                <div> </div>
              </div>
              <!-- <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.nowTime }}</div> -->
            </div>
            <table
              class="table table-bordered table-hover heavy_border t2print"
              style="vertical-align:middle;padding-top:15px;margin-bottom:1px;">
              <tbody >
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">供货商22</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="5">供广深圳肉类智能交易市场有限公司</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >生产单位</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.business }}</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >生产单位地址</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.shAddress }}</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >购货单位</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.flowaddress }}</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >购货单位地址</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.flowaddress }}</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >入场批次</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.mobilizationbatch }}</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >原检疫证号</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.certificateno }}</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >产品名称</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.productname }}</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >数量及单位</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ ticket.quantity }}</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">检测结果</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">本批次产品经抽样进行感官、理化、瘦肉精、非洲猪瘟病毒及禁限药物残留检测，结果合格。</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">备注</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3"></td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="2">出证人： 莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:right;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="2">出证日期： {{ this.nowTime }}</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4">出证单位：供广深圳肉类智能交易市场有限公司&nbsp;&nbsp;&nbsp;&nbsp; 0755-2885 3668</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4">注：仅限于国内动物产品，在深圳市境内使用，二日内到达有效。</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->
        <br>
        <br>
        <br>
        <br>
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
      <table 
              class="table table-bordered table-hover heavy_border t2print"
              style="vertical-align:middle;padding-top:15px;margin-bottom:1px;">
              <tbody >
              <!--   <div style="text-align:left;margin-top:30px">&nbsp; ` + this.model.fxId + `</div>
              <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.nowTime }}</div> -->

                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">` + this.model.fxId + `</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1"><img width="70px" height="30px" src="https://sy.ggmstc.com/szszdistfile/8c7ea05c-8b80-4190-a527-79126c6073f1.jpg"></td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1"> </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">供广深圳肉类智能交易市场有限公司</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" > 购货单位地址----</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.business + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" > 购货单位地址--------</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.shAddress + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.flowaddress + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.flowaddress + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.mobilizationbatch + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.certificateno + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.productname + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >` + this.model.quantity + `公斤</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">检测结果</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="3">本批次产品经抽样进行感官、理化、瘦肉精、非洲猪瘟病毒及禁限药物残留检测，结果合格。</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">备注</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">` + this.model.separatedetails + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">&nbsp;&nbsp;&nbsp;&nbsp;莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1"> 莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:right;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ` + this.nowTime + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4"></td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4"></td>
                </tr>
              </tbody>
            </table>
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
