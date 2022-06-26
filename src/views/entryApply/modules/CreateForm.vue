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
        <a-form-item label="批次号"><a-input disabled v-decorator="['batchNo', {rules:[{required: false, message: '请输入批次号'}]}]" /></a-form-item>
        <a-form-item label="检疫证号"><a-input v-decorator="['quarantineNo', {rules:[{required: true, message: '请输入检疫证号'}]}]" /></a-form-item>

        <a-form-item
          label="商品名称"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="select"
              style="width: 120px"
              v-decorator="['goodsId', {initialValue:1, rules:[{required: true, message: '请选择商品名称'}]}]"
              :options="goodsList"
            ></a-select>
          </a-space>
        </a-form-item>
        <!-- <a-form-item label="商品id"><a-input v-decorator="['goodsId', {rules:[{required: true, message: '请输入商品id'}]}]" /></a-form-item> -->
        <a-form-item label="商品数量"><a-input v-decorator="['num', {rules:[{required: true, message: '请输入商品数量'}]}]" /></a-form-item>
        <a-form-item label="总重量"><a-input v-decorator="['weight', {rules:[{required: true, message: '请输入总重量'}]}]" /></a-form-item>

        <a-form-item
          label="屠宰场"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="selectB"
              style="width: 220px"
              v-decorator="['butcherId', {initialValue:37, rules:[{required: true, message: '请选择屠宰场'}]}]"
              :options="butcherEntList"
            ></a-select>
          </a-space>
        </a-form-item>
        <!-- <a-form-item label="屠宰场ID"><a-input v-decorator="['butcherId', {rules:[{required: true, message: '请输入屠宰场ID'}]}]" /></a-form-item> -->

        <a-form-item
          label="养殖场"
        >
          <a-space>
            <a-select
              defaultActiveFirst
              ref="selectF"
              style="width: 220px"
              v-decorator="['farmId', {initialValue:9, rules:[{required: true, message: '请选择屠宰场'}]}]"
              :options="farmEntList"
            ></a-select>
          </a-space>
        </a-form-item>
        <!-- <a-form-item label="养殖场ID"><a-input v-decorator="['farmId', {rules:[{required: true, message: '请输入养殖场ID'}]}]" /></a-form-item> -->
        <a-form-item label="用途"><a-input v-decorator="['usage', {rules:[{required: true, message: '请输入用途'}]}]" /></a-form-item>
        <a-form-item label="承运人"><a-input v-decorator="['carrier', {rules:[{required: true, message: '请输入承运人'}]}]" /></a-form-item>
        <a-form-item label="承运人手机"><a-input v-decorator="['carrierMobile', {rules:[{required: true, message: '请输入承运人手机'}]}]" /></a-form-item>
        <a-form-item label="运输方式"><a-input v-decorator="['transportation', {rules:[{required: true, message: '请输入运输方式'}]}]" /></a-form-item>
        <a-form-item label="车牌号"><a-input v-decorator="['plateNo', {rules:[{required: true, message: '请输入车牌号'}]}]" /></a-form-item>

        <a-form-item
          label="是否已消毒"
        >
          <a-space>
            <a-select
              ref="select"
              style="width: 120px"
              v-decorator="['disinfect', {initialValue:1,rules:[{required: true, message: '请选择是否已消毒'}]}]"
              :options="disinfectOptions"
            ></a-select>
          </a-space>
        </a-form-item>
        <!-- <a-form-item label="是否已消毒"><a-input v-decorator="['disinfect', {rules:[{required: true, message: '请输入是否已消毒'}]}]" /></a-form-item> -->
        <a-form-item label="养殖票证">
          <a-upload
            name="file"
            :multiple="true"
            :action="uploadUrl.ticket"
            :headers="uploadHeaders"
            @change="uploadFarmTicket"
          >
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>

          <a-input v-decorator="['farmTicket', {rules:[{required: true, message: '请输入养殖票证'}]}]" /></a-form-item>
        <a-form-item label="屠宰票证">
          <a-upload
            name="file"
            :multiple="true"
            :action="uploadUrl.ticket"
            :headers="uploadHeaders"
            @change="uploadButcherTicket"
          >
            <a-button> <a-icon type="upload" /> 上传 </a-button>
          </a-upload>

          <a-input v-decorator="['quarantineTicket', {rules:[{required: true, message: '请输入屠宰票证'}]}]" />
        </a-form-item>

        <template v-if="op===''"></template>
        <a-form-item label="地磅初读"><a-input v-decorator="['checkLoad', {rules:[{required: false, message: '请输入地磅初读'}]}]" /></a-form-item>
        <a-form-item label="地磅复读"><a-input v-decorator="['recheckLoad', {rules:[{required: false, message: '请输入地磅复读'}]}]" /></a-form-item>
        <a-form-item label="地磅重量"><a-input v-decorator="['load', {rules:[{required: false, message: '请输入地磅重量'}]}]" /></a-form-item>

        <a-form-item
          label="状态"
        >
          <a-space>
            <a-select
              ref="select"
              style="width: 120px"
              v-decorator="['status', {initialValue:1,rules:[{required: true, message: '请选择状态'}]}]"
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
import { uploadHeaders, uploadUrl, handleUploadInfo } from '@/utils/util'
import { goodsListAll } from '@/api/goods'
import { sourceEntList } from '@/api/butcherEnt'

// 表单字段
const fields = ['id', 'batchNo', 'quarantineNo', 'goodsId', 'num', 'weight', 'butcherId', 'farmId', 'usage', 'carrier', 'carrierMobile', 'transportation', 'plateNo', 'disinfect', 'farmTicket', 'quarantineTicket', 'checkLoad', 'recheckLoad', 'load', 'memberId', 'acceptorId', 'enterTime', 'status']

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
    op: {
      type: String,
      default: () => ''
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
      ddStyle: { width: '500px', height: '600px' },
      daddTimeDefault: '',
      haddTimeDefault: '',
      treeData: [],
      goodsList: [],
      butcherEntList: [],
      farmEntList: [],
      uploadHeaders: uploadHeaders,
      uploadUrl: uploadUrl,
      fo: {},
      form: this.$form.createForm(this),
      options2: [{
        value: 0,
        label: '禁用'
      }, {
        value: 1,
        label: '启用'
      }],
      disinfectOptions: [{
        value: 0,
        label: '否'
      }, {
        value: 1,
        label: '是'
      }]
    }
  },
  methods: {
    uploadFarmTicket (info) {
      var fileName = info.file.response.data.url
      console.log(fileName)
      this.form.setFieldsValue({ farmTicket: fileName })
      return handleUploadInfo(info)
    },
    uploadButcherTicket (info) {
      var fileName = info.file.response.data.url
      this.form.setFieldsValue({ quarantineTicket: fileName })
      return handleUploadInfo(info)
    }
  },
  created () {
    this.$nextTick(() => {
      goodsListAll('').then(res => {
        console.log(res.data[0])
        for (var i = 0; i < res.data.length; i++) {
          this.goodsList.push({ label: res.data[i]['name'], value: res.data[i]['id'] })
        }
      })

      sourceEntList('').then(res => {
        console.log('sourceEnt')
        const dataList = res.data.butcherEntList
        console.log(dataList)
        for (var i = 0; i < dataList.length; i++) {
          this.butcherEntList.push({ label: dataList[i]['name'], value: dataList[i]['id'] })
        }
        const dataList2 = res.data.farmEntList
        for (var j = 0; j < dataList2.length; j++) {
          this.farmEntList.push({ label: dataList2[j]['name'], value: dataList2[j]['id'] })
        }
      })
    })

    if (this.model !== null) {
      this.fo = this.model
      console.log(this.op)
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
