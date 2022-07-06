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
              <a-col :md="8" :sm="24"> <a-form-item label="订单号"> <a-input v-model="queryParam.outTradeNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总金额"> <a-input v-model="queryParam.amount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.weight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购商家"> <a-input v-model="queryParam.memberId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="实收金额"> <a-input v-model="queryParam.actAmount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="地址"> <a-input v-model="queryParam.address" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="联系人"> <a-input v-model="queryParam.linkMan" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="联系人电话"> <a-input v-model="queryParam.linkMobile" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="支付类型"> <a-input v-model="queryParam.payType" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="支付时间"> <a-input v-model="queryParam.payTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="库存状态"> <a-input v-model="queryParam.stockStatus" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预定单号"> <a-input v-model="queryParam.preorderCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单类型"> <a-input v-model="queryParam.fromType" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.orderCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="销售商家"> <a-input v-model="queryParam.supplier" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购商家"> <a-input v-model="queryParam.buyer" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单时间"> <a-input v-model="queryParam.orderTime" placeholder=""/> </a-form-item> </a-col>

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
        <!-- <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button> -->
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <!-- <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item> -->
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
        <span slot="createTime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查看</a>
            <a-divider type="vertical" />
            <a @click="handleDetail(record)">明细</a>
            <a-divider type="vertical" />
            <router-link :to="{path: '/trade-center/ground-manage/productOutStock', query: {'orderId':record.id, 'applyId':record.applyId, 'consumerNo':consumerNo }}">
              出库
            </router-link>
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
import { newMkOrder, editMkOrder, mkOrderList } from '@/api/mkOrder'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
// import { getPageQuery } from '@/utils/util'

const statusMap = {
  0: {
    status: 'default',
    text: '未支付'
  },
  5: {
    status: 'processing',
    text: '未支付'
  },
  10: {
    status: 'processing',
    text: '已支付'
  },
  15: {
    status: 'success',
    text: '已出库'
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
      consumerNo: 'c6037',
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
        // const urlParam = getPageQuery()
        // if (urlParam.status > 0) {
        //  this.queryParam.status = urlParam.status
        // } else {
        //   this.queryParam.status = null
        // }
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return mkOrderList(requestParameters)
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
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        //   width: 60
        // },
        {
          title: '订单号',
          dataIndex: 'orderCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          width: 90,
          resizable: 'true'
        },
        {
          title: '屠宰单位',
          dataIndex: 'butcherEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖单位',
          dataIndex: 'farmEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场批次号',
          dataIndex: 'batchNoStr',
          width: 150,
          resizable: 'true'
        },
        {
          title: '预定单号',
          dataIndex: 'preorderCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '总金额',
          dataIndex: 'amount',
          width: 80,
          resizable: 'true'
        },
        {
          title: '总重量',
          dataIndex: 'weight',
          width: 80,
          resizable: 'true'
        },
        {
          title: '总数量',
          dataIndex: 'num',
          width: 80,
          resizable: 'true'
        },
        {
          title: '销售商家',
          dataIndex: 'supplier',
          width: 150,
          resizable: 'true'
        },
        {
          title: '采购商家',
          dataIndex: 'buyer',
          width: 150,
          resizable: 'true'
        },
        // {
        //   title: '实收金额',
        //   dataIndex: 'actAmount',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '地址',
        //   dataIndex: 'address',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '联系人',
          dataIndex: 'linkMan',
          width: 80,
          resizable: 'true'
        },
        // {
        //   title: '联系人电话',
        //   dataIndex: 'linkMobile',
        //   width: 60,
        //   resizable: 'true'
        // },
        // {
        //   title: '支付类型',
        //   dataIndex: 'payType',
        //   width: 60,
        //   resizable: 'true'
        // },
        // {
        //   title: '支付时间',
        //   dataIndex: 'payTime',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '库存状态',
        //   dataIndex: 'stockStatus',
        //   width: 60,
        //   resizable: 'true'
        // },
        // {
        //   title: '预定单号',
        //   dataIndex: 'preorderCode',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '订单类型',
        //   dataIndex: 'fromType',
        //   width: 60,
        //   resizable: 'true'
        // },
        // {
        //   title: '订单编号',
        //   dataIndex: 'orderCode',
        //   width: 60,
        //   resizable: 'true'
        // },

        {
          title: '状态',
          scopedSlots: { customRender: 'status' },
          width: 90,
          dataIndex: 'status'
        },
        // {
        //   title: '订单时间',
        //   dataIndex: 'orderTime',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '订单日期',
          scopedSlots: { customRender: 'createTime' },
          width: 160,
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
      return formateDate(date, 'yyyy-MM-dd')
    }
  },
  created () {

  },
  watch: {
    '$route': {
      immediate: true, // true首次加载执行，默认false
      handler () {
        // console.log('单个属性监听')
        // console.log(this.$route.name)
        if (this.$route.name === 'orderOutStock') {
          this.queryParam.status = 10
        } else if (this.$route.name === 'gs-bill-list') {
          this.queryParam.status = 10
        } else if (this.$route.name === 'outStock-list') {
          this.queryParam.status = 15
        }

        if (this.$refs.table) {
          this.$refs.table.refresh()
        }
      }

    }
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
            editMkOrder(values)
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
            newMkOrder(values)
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
