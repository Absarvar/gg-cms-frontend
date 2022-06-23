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
            <template v-if="advanced">
            <a-col :md="8" :sm="24"> <a-form-item label="分销证号"> <a-input v-model="queryParam.fxNo" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="批次号"> <a-input v-model="queryParam.batchNo" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="生产单位"> <a-input v-model="queryParam.butcherEnt" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="生产单位地址"> <a-input v-model="queryParam.butcherAddress" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.quarantineNo" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="供应商企业"> <a-input v-model="queryParam.supplierEnt" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="供货商"> <a-input v-model="queryParam.goodsSupplier" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="流向企业"> <a-input v-model="queryParam.flowtoEnt" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="流向企业地址"> <a-input v-model="queryParam.flowtoEntAddress" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="商品名称"> <a-input v-model="queryParam.goodsName" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.weight" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="备注"> <a-input v-model="queryParam.remark" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.orderCode" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="生产企业ID"> <a-input v-model="queryParam.butcherEntId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="供应商企业ID"> <a-input v-model="queryParam.supplierEntId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="流向企业ID"> <a-input v-model="queryParam.flowtoEntId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="入场ID"> <a-input v-model="queryParam.entryApplyId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="订单ID"> <a-input v-model="queryParam.orderId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="换算参数"> <a-input v-model="queryParam.convertFact" placeholder=""/> </a-form-item> </a-col>

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
        <span slot="createTime" slot-scope="text">
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
import { newSellTicket, editSellTicket, sellTicketList } from '@/api/sellTicket'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

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
        return sellTicketList(requestParameters)
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
          title: '分销证号',
          dataIndex: 'fxNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '批次号',
          dataIndex: 'batchNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产单位',
          dataIndex: 'butcherEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产单位地址',
          dataIndex: 'butcherAddress',
          width: 120,
          resizable: 'true'
        },
        {
          title: '检疫证号',
          dataIndex: 'quarantineNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商企业',
          dataIndex: 'supplierEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供货商',
          dataIndex: 'goodsSupplier',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业',
          dataIndex: 'flowtoEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业地址',
          dataIndex: 'flowtoEntAddress',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '数量',
          dataIndex: 'num',
          width: 120,
          resizable: 'true'
        },
        {
          title: '重量',
          dataIndex: 'weight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          width: 120,
          resizable: 'true'
        },
        {
          title: '订单编号',
          dataIndex: 'orderCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产企业ID',
          dataIndex: 'butcherEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商企业ID',
          dataIndex: 'supplierEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业ID',
          dataIndex: 'flowtoEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '入场ID',
          dataIndex: 'entryApplyId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '订单ID',
          dataIndex: 'orderId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '换算参数',
          dataIndex: 'convertFact',
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
          scopedSlots: { customRender: 'createTime' },
          width: 200,
          dataIndex: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
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
            editSellTicket(values)
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
            newSellTicket(values)
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
