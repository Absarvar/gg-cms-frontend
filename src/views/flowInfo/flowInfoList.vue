<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="12" :sm="24">
              <a-form-item label="创建日期">
                <a-range-picker
                  style="width: 400px"
                  format="YYYY-MM-DD"
                  @change="timeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="状态"> <a-input v-model="queryParam.status" placeholder=""/> </a-form-item> </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24"> <a-form-item label="供应商"> <a-input v-model="queryParam.supplierEntName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰单位"> <a-input v-model="queryParam.butcherEntName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.quarantineCertNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证类型"> <a-input v-model="queryParam.quarantineCertType" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="批次重量"> <a-input v-model="queryParam.batchWeight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="产品名称"> <a-input v-model="queryParam.productName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向企业"> <a-input v-model="queryParam.flowtoEntName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="进场批次号"> <a-input v-model="queryParam.batchCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出场重量"> <a-input v-model="queryParam.batchOutWeight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出场价格"> <a-input v-model="queryParam.batchOutPrice" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="进场价格"> <a-input v-model="queryParam.batchInPrice" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="分销流水号"> <a-input v-model="queryParam.fxCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="产品类别编号"> <a-input v-model="queryParam.productCategoryCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="进场日期"> <a-input v-model="queryParam.batchInDate" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出场日期"> <a-input v-model="queryParam.batchOutDate" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="产品图片"> <a-input v-model="queryParam.productImg" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检测报告"> <a-input v-model="queryParam.batchCheckReport" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商信用代码"> <a-input v-model="queryParam.supplierEntUnifCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰场信用代码"> <a-input v-model="queryParam.butcherEntUnifCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向企业信用代码"> <a-input v-model="queryParam.flowtoEntUnifCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="二维码地址"> <a-input v-model="queryParam.qrcodeUrl" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="进场重量"> <a-input v-model="queryParam.batchInWeight" placeholder=""/> </a-form-item> </a-col>

            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>

        <a-upload
          name="file"
          :multiple="true"
          :action="importUrl.url"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 导入 </a-button>
        </a-upload>

        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="true"
        :rowSelection="rowSelection"
        showPagination="auto"
        :scroll="{ x: 2000, y: 600 }"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="addtime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a> -->
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { newFlowInfo, editFlowInfo, flowInfoList, flowInfoApi } from '@/api/flowInfo'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import storage from 'store'

const statusMap = {
  0: {
    status: 'default',
    text: '禁用中'
  },
  1: {
    status: 'processing',
    text: '启用中'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    return {
      headers: {
        Authorization: storage.get(ACCESS_TOKEN)
      },
      importUrl: {
        url: flowInfoApi.importFlowInfo
      },
      // create model
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return flowInfoList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      columns: [
        {
          key: 'serial',
          title: '#',
          scopedSlots: { customRender: 'serial' },
          width: 60
        },
        {
          title: 'id',
          dataIndex: 'id',
          width: 60
        },
        {
          title: '供应商',
          dataIndex: 'supplierEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰单位',
          dataIndex: 'butcherEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '检疫证号',
          dataIndex: 'quarantineCertNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '检疫证类型',
          dataIndex: 'quarantineCertType',
          width: 120,
          resizable: 'true'
        },
        {
          title: '批次重量',
          dataIndex: 'batchWeight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '产品名称',
          dataIndex: 'productName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业',
          dataIndex: 'flowtoEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场批次号',
          dataIndex: 'batchCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出场重量',
          dataIndex: 'batchOutWeight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出场价格',
          dataIndex: 'batchOutPrice',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场价格',
          dataIndex: 'batchInPrice',
          width: 120,
          resizable: 'true'
        },
        {
          title: '分销流水号',
          dataIndex: 'fxCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '产品类别编号',
          dataIndex: 'productCategoryCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场日期',
          dataIndex: 'batchInDate',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出场日期',
          dataIndex: 'batchOutDate',
          width: 120,
          resizable: 'true'
        },
        {
          title: '产品图片',
          dataIndex: 'productImg',
          width: 120,
          resizable: 'true'
        },
        {
          title: '检测报告',
          dataIndex: 'batchCheckReport',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商信用代码',
          dataIndex: 'supplierEntUnifCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰场信用代码',
          dataIndex: 'butcherEntUnifCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业信用代码',
          dataIndex: 'flowtoEntUnifCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '二维码地址',
          dataIndex: 'qrcodeUrl',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场重量',
          dataIndex: 'batchInWeight',
          width: 120,
          resizable: 'true'
        },

        {
          title: '状态',
          scopedSlots: { customRender: 'status' },
          width: 100,
          dataIndex: 'status'
        },
        {
          title: '创建时间',
          scopedSlots: { customRender: 'addtime' },
          width: 200,
          dataIndex: 'addtime'
        },
        {
          key: 'action',
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    formateDate (time) {
      const date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {

  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    }
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    timeChange (date, dateStr) {
      this.queryParam.startTime = dateStr[0]
      this.queryParam.endTime = dateStr[1]
    },
    handleAdd () {
      this.mdl = null
      this.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id > 0) {
            // 修改 e.g.
            editFlowInfo(values)
            .then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            newFlowInfo(values)
            .then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
<style >
.table-striped {
  background-color: #fafafa;
}
</style>
