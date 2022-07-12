<style scoped>
.tableLine{
         border-top: 1px solid #000000 !important;
         border-right:1px solid #000000 !important;
         border-left: 1px solid #000000 !important;
         border-bottom:1px solid #000000 !important;
         border-collapse:collapse !important;
  }
   .tdLine{
         border-left: 1px solid #000000 !important;
         border-bottom:1px solid #000000 !important;
         border-right: 1px solid #000000 !important;
         border-top:1px solid #000000 !important;
         border-collapse:collapse !important;
    }
</style>
<template>
  <a-modal
    title="送货明细"
    :width="1240"
    :visible="isDetail"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-button type="primary" @click="dayin()">打印</a-button>

      <div class="text-center" id="div_print" style="width:800px;">
        <table class="mx-auto table table-bordered table-hover heavy_border t2print" style="width:800px;margin-top: 0px;">
          <tbody>
            <tr>
              <td scope="col" style="text-align:center;border-width:0px;border-color:#000000;border: solid white !important;" colspan="9"><h4><b>{{ fo.supplier }}送货明细</b></h4></td>
            </tr>
            <tr>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;" colspan="3">订单编号：{{ fo.orderCode }}</td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;;" colspan="3">订单日期：{{ fo.createTime }}</td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;border-left: solid white !important;font-size: 8px;" colspan="3">送货地址：{{ fo.address }}</td>
            </tr>
            <tr>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;" colspan="3">购货客户：{{ fo.buyer }}</td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;" colspan="3">联系人：{{ fo.linkMan }}</td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border: solid white !important;border-right: solid white !important;" colspan="3">联系电话：{{ fo.linkMobile }}</td>
            </tr>
            <tr>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border-left: solid white !important;" colspan="3">
                总数量：
                <template v-if="fo.goodsUnit==='边'">
                  {{ fo.num/2 }}头
                </template>
                <template v-if="fo.goodsUnit!=='边'">
                  {{ fo.num }}{{ fo.goodsUnit }}
                </template>

              </td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border-left: solid white !important;" colspan="3">总重量：{{ fo.weight }}</td>
              <td scope="col" style="text-align:left;border-width:0px;border-color:#000000;border-left: solid white !important;border-right: solid white !important;" colspan="3">总金额：{{ fo.amount }}</td>
            </tr>
            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:120px;" >轨道编号</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" >产品名称</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:80px;" >产品规格</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:100px;" >重量（kg）</td>

              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:80px;">数量</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:100px;">单价（元）</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:100px;">总价（元）</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">备注</td>

            </tr>

            <!-- <template v-if="isBatch"> -->
            <template v-for="(order,index) in productList">

              <tr :key="index">
                <th style="border-width:2px;border-color:#000000;text-align:center;width:100px;">{{ order.orbitCode }}</th>
                <th style="border-width:2px;border-color:#000000;text-align:center;width:100px;">{{ order.goodsName }}</th>
                <th style="border-width:2px;border-color:#000000;text-align:center;">{{ fo.sku }}</th>
                <th style="border-width:2px;border-color:#000000;text-align:center;width:60px;">{{ order.weight }}</th>

                <!-- <th style="border-width:2px;border-color:#000000;text-align:center">1{{ fo.goodsUnit }}</th> -->
                <th style="border-width:2px;border-color:#000000;text-align:center">1</th>
                <th style="border-width:2px;border-color:#000000;text-align:center">{{ order.price }}</th>
                <th style="border-width:2px;border-color:#000000;text-align:center">{{ Number(order.price*order.weight).toFixed(2) }}</th>
                <th style="border-width:2px;border-color:#000000;text-align:center"></th>
              </tr>
            </template>
            <!-- </template> -->

            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;height: 35px;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
            </tr>
            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;height: 35px;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;"></td>
            </tr>
            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border-left: solid white !important;border-right: solid white !important;" colspan="9"></td>
            </tr>
            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" >操作人：</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" >董事</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" >制单人：</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" >董事</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;">签收人：</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;">签收日期：</td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
            </tr>
            <tr>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;" ></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
              <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;border: solid white !important;"></td>
            </tr>

          </tbody>
        </table>
        <!-- <div style="margin-top:-120px;margin-left:300px;"><img width="170px" height="130px" src="https://lcpublic.s3.cn-north-1.amazonaws.com.cn/af887e62-ac3b-46a8-b4d7-102038ad2cbc"></div> -->

      </div>

      <!-- <a-form :form="form" v-bind="formLayout">
        检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
      <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->

      <!-- <a-form-item
        label="id"
        hidden
      >
        <a-input v-decorator="['id', {rules:[{required: false, message: ''}]}]" />
      </a-form-item>
      <a-form-item label="ID"><a-input v-decorator="['orderid', {rules:[{required: true, message: '请输入ID'}]}]" /></a-form-item>
      <a-form-item label="总金额：单位元  参考价格"><a-input v-decorator="['totalamount', {rules:[{required: true, message: '请输入总金额：单位元  参考价格'}]}]" /></a-form-item>
      <a-form-item label="总重量"><a-input v-decorator="['totalweight', {rules:[{required: true, message: '请输入总重量'}]}]" /></a-form-item>
      <a-form-item label="下单时间"><a-input v-decorator="['ordertime', {rules:[{required: true, message: '请输入下单时间'}]}]" /></a-form-item>
      <a-form-item label="支付时间"><a-input v-decorator="['paytime', {rules:[{required: true, message: '请输入支付时间'}]}]" /></a-form-item>
      <a-form-item label="第三方交易流水号"><a-input v-decorator="['transactionid', {rules:[{required: true, message: '请输入第三方交易流水号'}]}]" /></a-form-item>
      <a-form-item label="商户系统单号"><a-input v-decorator="['outtradeno', {rules:[{required: true, message: '请输入商户系统单号'}]}]" /></a-form-item>
      <a-form-item label="添加时间"><a-input v-decorator="['addtime', {rules:[{required: true, message: '请输入添加时间'}]}]" /></a-form-item>
      <a-form-item label="配送地址"><a-input v-decorator="['address', {rules:[{required: true, message: '请输入配送地址'}]}]" /></a-form-item>
      <a-form-item label="采购人姓名"><a-input v-decorator="['name', {rules:[{required: true, message: '请输入采购人姓名'}]}]" /></a-form-item>
      <a-form-item label="销售商家"><a-input v-decorator="['factoryid', {rules:[{required: true, message: '请输入销售商家'}]}]" /></a-form-item>
      <a-form-item label="采购商家"><a-input v-decorator="['logisticianid', {rules:[{required: true, message: '请输入采购商家'}]}]" /></a-form-item>
      <a-form-item label="商品iD"><a-input v-decorator="['sid', {rules:[{required: true, message: '请输入商品iD'}]}]" /></a-form-item>
      <a-form-item label="单选 0 false 1 true 2供应商发送订单标识 3采购商支付4加入购物车后已购买5加入购物车取消"><a-input v-decorator="['ischecked', {rules:[{required: true, message: '请输入单选 0 false 1 true 2供应商发送订单标识 3采购商支付4加入购物车后已购买5加入购物车取消'}]}]" /></a-form-item>
      <a-form-item label="申请出库3待出库0已出库1 状态"><a-input v-decorator="['stockstatus', {rules:[{required: true, message: '请输入申请出库3待出库0已出库1 状态'}]}]" /></a-form-item>
      <a-form-item label="采购商未支付0"><a-input v-decorator="['type', {rules:[{required: true, message: '请输入采购商未支付0'}]}]" /></a-form-item>
      <a-form-item label="图片商品id"><a-input v-decorator="['shoppingid', {rules:[{required: true, message: '请输入图片商品id'}]}]" /></a-form-item>
      <a-form-item label="总数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入总数量'}]}]" /></a-form-item>
      <a-form-item label="轨道编号"><a-input v-decorator="['devicecode', {rules:[{required: true, message: '请输入轨道编号'}]}]" /></a-form-item>
      <a-form-item label="供应商名称"><a-input v-decorator="['gyname', {rules:[{required: true, message: '请输入供应商名称'}]}]" /></a-form-item>

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
      </a-form> -->
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import $ from 'jquery'
import { productList } from '@/api/product'

// 表单字段
const fields = ['id', 'orderid', 'totalamount', 'totalweight', 'ordertime', 'paytime', 'transactionid', 'outtradeno', 'addtime', 'address', 'name', 'factoryid', 'logisticianid', 'sid', 'ischecked', 'stockstatus', 'type', 'shoppingid', 'num', 'devicecode', 'gyname', 'status']

export default {
  props: {
    isDetail: {
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
    },
    isBatch: {
      type: Boolean,
      required: true
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
      foList: [],
      instockedNum: 0,
      instockedWeight: 0,
      productList: [],
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
    if (this.model !== null && this.isBatch) {
      this.foList = this.model
      this.fo = this.foList[0]
    }
        this.loadProductList()

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      if (this.model !== null) {
        this.fo = this.model
        this.loadProductList()
      }

      if (this.model !== null && this.isBatch) {
        this.foList = this.model
        this.fo = this.foList[0]
        this.loadProductList()
      }
    })
  },
  methods: {
    loadProductList () {
      console.log(this.fo)
      productList({ 'orderId': this.fo.id, 'pageSize': 200 })
      .then(res => {
        this.instockedNum = res.data.total
        var weight = 0.0
        for (var k = 0; k < res.data.data.length; k++) {
          weight += res.data.data[k].weight
        }
        this.instockedWeight = weight.toFixed(1)
        this.productList = res.data.data
        return res.data
      })
    },
    dayin () {
      $('td').addClass('tdLine')
      $('table').addClass('tableLine')
      $('th').addClass('tdLine')
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
