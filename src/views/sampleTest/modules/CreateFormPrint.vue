<template>
  <a-modal
    title="打印"
    :width="1240"
    :visible="isPrint"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading" >
      <a-form :form="form" v-bind="formLayout">

        <br><br><br>

        <div class="text-center" id="div_print">
          <div align="center" class="center" style="text-align:center" ><h2>供广肉类深圳智能交易市场</h2><h2>产品检测报告</h2></div>
          <table align="center" class="mx-auto table table-bordered table-hover heavy_border t2print" style="width:750px;vertical-align:middle">

            <tbody>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000; width:100px;">入场批次
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:170px;" align="center">{{ fo.batchNo }}
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:180px;">受检单位
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;width:300px;">{{ fo.applierEntName }}
                </td>
              </tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">采样基数
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.weight }}
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">检疫证号
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.quarantineNo }}
                </td>
              </tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">样品编号
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.sampleCode }}
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">采样人
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">程琪茵
                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">采样时间
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.sampleTime }}
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">商品名称
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.tradename }}
                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="4">感官检测
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">气味
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">具有鲜猪肉正常气味，煮沸后肉汤透明澄清，脂肪团聚于液面，具有香味
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.sensoryindexq" v-decorator="['sensoryindexq']" style="width: 60%" disabled >
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">色泽
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">肌肉色泽鲜红，有光泽；脂肪呈乳白色或粉白色
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.sensoryindexs" name="sensoryindexs" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">粘度
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">外表微干或微湿润，不粘手
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.stickness" name="stickness" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">弹性
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">指压后的凹陷立即恢复
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.sensoryindext" name="sensoryindext" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="3">理化指标
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">水分
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">≤76%
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.chemicaindexes" name="chemicaindexes" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">挥发性盐基氮
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">≤13mg/100g
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.chemicaindexesdy" name="chemicaindexesdy" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">病害肉特征物
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.microorganism" name="microorganism" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">传染性疫病
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">非洲猪瘟
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.nfectiousdisease" name="nfectiousdisease" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="3">瘦肉精
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">盐酸克伦特罗
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.clenbuterol" name="clenbuterol" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">沙丁胺醇
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.clenbuterold" name="clenbuterold" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">莱多克巴安
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.clenbuterolk" name="clenbuterolk" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="4">禁限药残
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">磺胺类
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">70μg/kg
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.drugresidues" name="drugresidues" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">氯霉素
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.drugresiduesl" name="drugresiduesl" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">四环素
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">70μg/kg
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.coliformgroup" name="coliformgroup" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">氟喹诺酮类
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">

                  <a-checkbox-group v-model="fo.drugresiduesn" name="drugresiduesn" style="width: 60%" disabled>
                    <a-row>
                      <a-col :span="10">
                        <a-checkbox value="1">合格 /</a-checkbox>
                      </a-col>
                      <a-col :span="12">
                        <a-checkbox value="0">不合格</a-checkbox>
                      </a-col>
                    </a-row>
                  </a-checkbox-group>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">检测人
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">
                  <img width="70px" height="30px" src="https://atlas.pingcode.com/files/public/62728d99b98c3149715a05b8">
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">检测时间
                </td><td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">{{ fo.testTime }}
                </td></tr>
            </tbody>
          </table>
          <div style="width:770px;margin-left:90px;">
            审核： <img width="70px" height="30px" src="https://atlas.pingcode.com/files/public/62728d99b98c3149715a05b8">
            <span style="width:170px;margin-left:180px;">盖章：<img width="170px" height="130px" src="https://atlas.pingcode.com/files/public/6272927d83bcb368246be1c1/origin-url"></span>
          </div>
          <br>
          <br>

        </div>

        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item> -->

      </a-form>
      <div style="" align="center"> <a-button type="primary" @click="dayin()">打印</a-button></div>
    </a-spin>
  </a-modal>

</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'batchNo', 'ids', 'tradename', 'suppliername', 'sensoryindexq', 'sensoryindexs', 'sensoryindext', 'chemicaindexes', 'chemicaindexesdy', 'microorganism', 'coliformgroup', 'nfectiousdisease', 'clenbuterol', 'clenbuterold', 'clenbuterolk', 'drugresidues', 'drugresiduesl', 'drugresiduesf', 'drugresiduesn', 'drugresiduesy', 'detectionresult', 'testTime']

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
    },
    isPrint: {
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
    // fields.forEach(v => this.form.getFieldValue(v))
    // fields.forEach(v => this.form.setFieldsValue(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      console.log(this.isPrint)
      if (this.model !== null) {
        this.fo = this.model
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
    },
    printHTML () {
// 打开一个新的浏览器窗口
// win.document.write('sddddddddddddddddddddddddddd')
// win.focus()// 在IE浏览器中使用必须添加这一句
// win.print()
// 写入
      // const report = document.getElementById('div_print')
var win = window.open('print')

            var headstr = '<html><head><title></title></head><body>'
            var footstr = '</body>'
            var printData = document.getElementById('div_print').innerHTML // 获得 div 里的所有 html 数据
win.document.body.innerHTML = headstr + printData + footstr
// win.document.write(content)
// win.document.close()// 在IE浏览器中使用必须添加这一句
// win.focus()// 在IE浏览器中使用必须添加这一句
win.print()
win.close()
}
  }
}
</script>
