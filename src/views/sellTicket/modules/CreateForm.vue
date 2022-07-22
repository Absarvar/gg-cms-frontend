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
        <template v-if="model!==null">
          <div align="center" >
            <a-button type="primary" @click="printHTML()">打印</a-button>
            <br>
            <br>
            <h4>供广深圳肉类智能交易市场</h4>
            <h4>动物产品分销信息凭证</h4>
            <div class="text-center" style="width:750px;height:417px;" align="center" id="div_print">
              <div style="margin-top:0px;height:70px;">
                <div style="float:left;margin-left:0px;" align="left" >
                  <div style="margin-top:20px">&nbsp; NO：{{ model.fxNo }}</div>
                </div>
                <div style="float:right;margin-top:-30px;"> <img width="70px" height="70px" src="https://sy.ggmstc.com/szszdistfile/8c7ea05c-8b80-4190-a527-79126c6073f1.jpg"></div>
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
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.butcherEnt }}</td>
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >生产单位地址</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.butcherAddress }}</td>
                  </tr>
                  <tr style="">
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >购货单位</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.flowtoEnt }}</td>
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >购货单位地址</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.flowtoEntAddress }}</td>
                  </tr>
                  <tr style="">
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >入场批次</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.batchNo }}</td>
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >原检疫证号</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.quarantineNo }}</td>
                  </tr>
                  <tr style="">
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >产品名称</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.goodsName }}</td>
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >数量及单位</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >{{ model.weight }}</td>
                  </tr>
                  <tr style="">
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">检测结果</td>
                    <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">本批次产品经抽样进行感官、理化、瘦肉精、非洲猪瘟病毒及禁限药物残留检测，结果合格。</td>
                  </tr>
                  <tr style="">
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1">备注</td>
                    <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="3">{{ model.remark }}</td>
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
        </template>
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
        <a-form-item label="批次号"><a-input v-decorator="['batchNo', {rules:[{required: true, message: '请输入批次号'}]}]" /></a-form-item>
        <a-form-item label="生产单位"><a-input v-decorator="['butcherEnt', {rules:[{required: true, message: '请输入生产单位'}]}]" /></a-form-item>
        <a-form-item label="生产单位地址"><a-input v-decorator="['butcherAddress', {rules:[{required: true, message: '请输入生产单位地址'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['quarantineNo', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>
        <a-form-item label="供应商企业"><a-input v-decorator="['supplierEnt', {rules:[{required: true, message: '请输入供应商企业'}]}]" /></a-form-item>
        <a-form-item label="供货商"><a-input v-decorator="['goodsSupplier', {rules:[{required: true, message: '请输入供货商'}]}]" /></a-form-item>
        <a-form-item label="流向企业"><a-input v-decorator="['flowtoEnt', {rules:[{required: true, message: '请输入流向企业'}]}]" /></a-form-item>
        <a-form-item label="流向企业地址"><a-input v-decorator="['flowtoEntAddress', {rules:[{required: true, message: '请输入流向企业地址'}]}]" /></a-form-item>
        <a-form-item label="商品名称"><a-input v-decorator="['goodsName', {rules:[{required: true, message: '请输入商品名称'}]}]" /></a-form-item>
        <a-form-item label="数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入数量'}]}]" /></a-form-item>
        <a-form-item label="重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入重量'}]}]" /></a-form-item>
        <a-form-item label="备注"><a-input v-decorator="['remark', {rules:[{required: true, message: '请输入备注'}]}]" /></a-form-item>
        <a-form-item label="订单编号"><a-input v-decorator="['orderCode', {rules:[{required: true, message: '请输入订单编号'}]}]" /></a-form-item>
        <a-form-item label="换算参数"><a-input v-decorator="['convertFact', {rules:[{required: true, message: '请输入换算参数'}]}]" /></a-form-item>

        <!-- <a-form-item
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
import { getNowTime } from '@/utils/util'

// 表单字段
const fields = ['id', 'fxNo', 'batchNo', 'butcherEnt', 'butcherAddress', 'quarantineNo', 'supplierEnt', 'goodsSupplier', 'flowtoEnt', 'flowtoEntAddress', 'goodsName', 'num', 'weight', 'remark', 'orderCode', 'butcherEntId', 'supplierEntId', 'flowtoEntId', 'entryApplyId', 'orderId', 'convertFact', 'status']

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
    },
      printHTML (model) {
        if (this.model === null) return
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
		<div class="text-center" style="width:750px;height:386px;" align="center" >
      <div style="margin-top:35px;height:70px;">
              <div style="margin-left:0px;" align="left" >
                <div style="margin-top:20px;padding-left:80px;padding-top:15px;"> ` + this.model.fxNo + `</div>
              </div>
              <div style="float:right;margin-top:-70px;"> </div>
              <!-- <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.nowTime }}</div> -->
            </div>
      <table 
              class="table table-bordered table-hover heavy_border t2print"
              style="vertical-align:middle;padding-top:15px;margin-top:-35px;">
              <tbody >
               
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1"> </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" colspan="3">供广深圳肉类智能交易市场有限公司</td>
                </tr>
                <tr style="width:750px;">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:150px;visibility:hidden;" > 生产单位</td>
                  <td scope="col" style="text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:230px;padding-left:-0px;font-size:15px; " >` + this.model.butcherEnt + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:120px;visibility:hidden;" > -</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:250px;font-size:8px;padding-left:25px;" >` + this.model.butcherAddress + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;font-size:15px;" >` + this.model.flowtoEnt + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:200px;font-size:8px;padding-left:25px;" >` + this.model.flowtoEntAddress + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" >` + this.model.batchNo + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:25px;" >` + this.model.quarantineNo + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" >` + this.model.goodsName + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:25px;" >` + this.model.weight + `公斤</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">检测结果</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="3">本批次产品经抽样进行感官、理化、瘦肉精、非洲猪瘟病毒及禁限药物残留检测，结果合格。</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">备注</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:55px;" colspan="3"><br>` + this.model.remark + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:bottom;padding-left:45px;width:90px;" colspan="1"><br>&nbsp;&nbsp;&nbsp;&nbsp;莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;visibility:hidden;" colspan="1"> 莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:right;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;font-size:12px;" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br> ` + this.nowTime + `</td>
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
  },
  created () {
    this.nowTime = getNowTime()
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
