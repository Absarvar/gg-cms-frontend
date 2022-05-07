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
              <!-- <a-col :md="8" :sm="24"> <a-form-item label="ID"> <a-input v-model="queryParam.orderid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总金额：单位元  参考价格"> <a-input v-model="queryParam.totalamount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总重量"> <a-input v-model="queryParam.totalweight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="下单时间"> <a-input v-model="queryParam.ordertime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="支付时间"> <a-input v-model="queryParam.paytime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="第三方交易流水号"> <a-input v-model="queryParam.transactionid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商户系统单号"> <a-input v-model="queryParam.outtradeno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="添加时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="配送地址"> <a-input v-model="queryParam.address" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购人姓名"> <a-input v-model="queryParam.name" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="销售商家"> <a-input v-model="queryParam.factoryid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购商家"> <a-input v-model="queryParam.logisticianid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品iD"> <a-input v-model="queryParam.sid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="单选 0 false 1 true 2供应商发送订单标识 3采购商支付4加入购物车后已购买5加入购物车取消"> <a-input v-model="queryParam.ischecked" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="申请出库3待出库0已出库1 状态"> <a-input v-model="queryParam.stockstatus" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购商未支付0"> <a-input v-model="queryParam.type" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="图片商品id"> <a-input v-model="queryParam.shoppingid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="轨道编号"> <a-input v-model="queryParam.devicecode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商名称"> <a-input v-model="queryParam.gyname" placeholder=""/> </a-form-item> </a-col> -->

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
        :scroll="{ x: 1700, y: 600 }"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查看</a>
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
import { newSaleOrder, editSaleOrder, saleOrderList } from '@/api/saleOrder'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

const statusMap = {
  0: {
    status: 'default',
    text: '加入购物车'
  },
  1: {
    status: 'default',
    text: '未支付'
  },
  2: {
    status: 'processing',
    text: '已支付'
  },
  3: {
    status: 'default',
    text: '订单取消'
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
        return saleOrderList(requestParameters)
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
          title: '订单编号',
          dataIndex: 'outtradeno',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: 'ID',
        //   dataIndex: 'orderid',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '总金额',
          dataIndex: 'totalamount',
          width: 120,
          resizable: 'true'
        },
        {
          title: '总重量',
          dataIndex: 'totalweight',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '下单时间',
        //   dataIndex: 'ordertime',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '支付时间',
        //   dataIndex: 'paytime',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '第三方交易流水号',
        //   dataIndex: 'transactionid',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '配送地址',
        //   dataIndex: 'address',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '采购人姓名',
        //   dataIndex: 'name',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '销售商家',
          dataIndex: 'providerName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '采购商家',
          dataIndex: 'merchantName',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '商品iD',
        //   dataIndex: 'sid',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '单选 0 false 1 true 2供应商发送订单标识 3采购商支付4加入购物车后已购买5加入购物车取消',
        //   dataIndex: 'ischecked',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '申请出库3待出库0已出库1 状态',
        //   dataIndex: 'stockstatus',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '采购商未支付0',
        //   dataIndex: 'type',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '图片商品id',
        //   dataIndex: 'shoppingid',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '总数量',
          dataIndex: 'goodsCount',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '供应商名称',
        //   dataIndex: 'gyname',
        //   width: 120,
        //   resizable: 'true'
        // },

        {
          title: '状态',
          scopedSlots: { customRender: 'status' },
          width: 100,
          dataIndex: 'status'
        },
        {
          title: '添加时间',
          dataIndex: 'createTime',
          width: 120,
          resizable: 'true'
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
            editSaleOrder(values)
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
            newSaleOrder(values)
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
