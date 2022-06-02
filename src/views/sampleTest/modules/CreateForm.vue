<template>
  <a-modal
    title="操作"
    :width="1240"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >

    <a-spin :spinning="loading" >
      <a-form :form="form" v-bind="formLayout">

        <br><br><br>

        <div class="text-center">
          <div align="center" class="center" style="text-align:center" ><h2>供广肉类深圳智能交易市场</h2><h2>产品检测报告</h2></div>
          <table align="center" class="mx-auto table table-bordered table-hover heavy_border t2print" style="width:750px;vertical-align:middle">

            <tbody>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;vertical-align:middle;border-width:2px;border-color:#000000; width:100px;">入场批次
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;width:170px;" align="center">
                  <!-- <a-form-item align="center" style="margin-bottom:0px"><a-input v-decorator="['mobilizationbatch']" /></a-form-item> -->
                  <a-form-item align="center" style="margin-bottom:0px">
                    <template>
                      <a-auto-complete
                        :data-source="dataSource"
                        style="width: 170px"
                        placeholder=""
                        v-decorator="['pcID']"
                        @search="handleSearch"
                        @select="onSelect"
                      >
                        <template slot="dataSource">
                          <a-select-option v-for="email in dataSource" :key="email">
                            {{ email }}
                          </a-select-option>
                        </template>
                      </a-auto-complete>
                    </template>

                  </a-form-item>
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;width:180px;">受检单位
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;width:300px;"><a-form-item align="center" style="margin-bottom:0px;"><a-input style="width:300px;" v-decorator="['applierEntName']" /></a-form-item>
                </td>
              </tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">采样基数
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px"><a-input v-decorator="['quantity']" /></a-form-item>
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">检疫证号
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px;"><a-input style="width:150px;" v-decorator="['certificateno']" /></a-form-item>
                </td>
              </tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">样品编号
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px"><a-input v-decorator="['sampleCode']" /></a-form-item>
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">采样人
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">程琪茵
                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">采样时间
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px"><a-input v-decorator="['sampleTime']" /></a-form-item>
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">商品名称
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px;"><a-input style="width:150px;" v-decorator="['animalspecies']" /></a-form-item>
                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="4">感官检测
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">气味
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">具有鲜猪肉正常气味，煮沸后肉汤透明澄清，脂肪团聚于液面，具有香味
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <div >
                    <a-form-item prop="sensoryindexq" align="center" style="margin-bottom:0px;width:300px;">
                      <a-radio-group :default-value="1" v-decorator="['sensoryindexq']">
                        <a-radio value="1" >合格</a-radio>
                        <a-radio value="0">不合格</a-radio>
                      </a-radio-group>
                    </a-form-item>
                  </div>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">色泽
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">肌肉色泽鲜红，有光泽；脂肪呈乳白色或粉白色
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="sensoryindexs">
                    <a-radio-group :default-value="1" v-decorator="['sensoryindexs']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">粘度
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">外表微干或微湿润，不粘手
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="stickness">
                    <a-radio-group :default-value="1" v-decorator="['stickness']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">弹性
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">指压后的凹陷立即恢复
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="sensoryindext">
                    <a-radio-group :default-value="1" v-decorator="['sensoryindext']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>
              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="3">理化指标
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">水分
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">≤76%
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="chemicaindexes">
                    <a-radio-group :default-value="1" v-decorator="['chemicaindexes']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">挥发性盐基氮
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">≤13mg/100g
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="chemicaindexesdy">
                    <a-radio-group :default-value="1" v-decorator="['chemicaindexesdy']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">病害肉特征物
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="microorganism">
                    <a-radio-group :default-value="1" v-decorator="['microorganism']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">传染性疫病
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">非洲猪瘟
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="nfectiousdisease">
                    <a-radio-group :default-value="1" v-decorator="['nfectiousdisease']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="3">瘦肉精
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">盐酸克伦特罗
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="clenbuterol">
                    <a-radio-group :default-value="1" v-decorator="['clenbuterol']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">沙丁胺醇
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="clenbuterold">
                    <a-radio-group :default-value="1" v-decorator="['clenbuterold']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">莱多克巴安
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="clenbuterolk">
                    <a-radio-group :default-value="1" v-decorator="['clenbuterolk']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;vertical-align:middle" rowspan="4">禁限药残
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">磺胺类
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">70μg/kg
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="drugresidues">
                    <a-radio-group :default-value="1" v-decorator="['drugresidues']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">氯霉素
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="drugresiduesl">
                    <a-radio-group :default-value="1" v-decorator="['drugresiduesl']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>
                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">四环素
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">70μg/kg
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="coliformgroup">
                    <a-radio-group :default-value="1" v-decorator="['coliformgroup']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">氟喹诺酮类
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">不得检出
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">

                  <a-form-item prop="drugresiduesn">
                    <a-radio-group :default-value="1" v-decorator="['drugresiduesn']">
                      <a-radio value="1">合格</a-radio>
                      <a-radio value="0">不合格</a-radio>
                    </a-radio-group>
                  </a-form-item>

                </td></tr>

              <tr>
                <td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">检测人
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;">检测时间
                </td><td scope="col" style="text-align:center;vertical-align:middle;border-width:2px;border-color:#000000;"><a-form-item align="center" style="margin-bottom:0px"><a-input v-decorator="['testTime']" /></a-form-item>
                </td></tr>
              <a-form-item align="center" style="margin-bottom:0px;"><a-input style="display:none;" v-decorator="['orderID']" /></a-form-item>
              <a-form-item align="center" style="margin-bottom:0px;"><a-input style="display:none;" v-decorator="['mobilizationbatch']" /></a-form-item>
            </tbody>
          </table>
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

      </a-form>
    </a-spin>
  </a-modal>

</template>

<script>
import pick from 'lodash.pick'
import { enterApplyList } from '@/api/enterApply'

// 表单字段
const fields = ['id', 'mobilizationbatch', 'ids', 'tradename', 'suppliername', 'sensoryindexq', 'sensoryindexs', 'sensoryindext', 'chemicaindexes', 'chemicaindexesdy', 'microorganism', 'coliformgroup', 'nfectiousdisease', 'clenbuterol', 'clenbuterold', 'clenbuterolk', 'drugresidues', 'drugresiduesl', 'drugresiduesf', 'drugresiduesn', 'drugresiduesy', 'detectionresult', 'testTime']

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
      dataSource: [],
      enterList: [],
      result: [],
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
  },
  methods: {
    handleSearch (value) {
      const requestParameters = { 'pinjie': value }
      enterApplyList(requestParameters).then(res => {
            // console.log(res.data.data)
            const pcList = []
            if (res.data != null && res.data.data != null) {
              for (let index = 0; index < res.data.data.length; index++) {
                const element = res.data.data[index]
                pcList.push(element['pinjie'])
              }
            }
            this.dataSource = pcList
          })
    },
    onSelect (value) {
      const requestParameters = { 'pinjie': value }
      enterApplyList(requestParameters).then(res => {
            if (res.data != null && res.data.data != null) {
              const pcDetail = res.data.data[0]
              this.form.setFieldsValue(pick(pcDetail, ['quantity', 'applierEntName', 'certificateno', 'animalspecies', 'orderID', 'mobilizationbatch']))
            }
          })
    }
  }
}
</script>
