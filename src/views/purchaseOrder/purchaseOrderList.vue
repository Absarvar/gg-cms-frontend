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
              <a-col :md="8" :sm="24"> <a-form-item label="供应商名称"> <a-input v-model="queryParam.gname" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品名称"> <a-input v-model="queryParam.sname" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.nmber" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="规格"> <a-input v-model="queryParam.specification" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订货量"> <a-input v-model="queryParam.orderquantity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购数量"> <a-input v-model="queryParam.purchasequantity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="采购重量"> <a-input v-model="queryParam.purchaseweight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="实收量"> <a-input v-model="queryParam.paid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="差量"> <a-input v-model="queryParam.difference" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="制单时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="制单人"> <a-input v-model="queryParam.preparedby" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="状态"> <a-input v-model="queryParam.state" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="单位"> <a-input v-model="queryParam.danwei" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订货日期"> <a-input v-model="queryParam.daddtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="回货日期"> <a-input v-model="queryParam.haddtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预计到货时间"> <a-input v-model="queryParam.yuji" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.orderno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="销售价"> <a-input v-model="queryParam.danjia" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预计费用"> <a-input v-model="queryParam.feiyong" placeholder=""/> </a-form-item> </a-col>

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
        <span slot="state" slot-scope="text">
          <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
        </span>
        <span slot="addtime" slot-scope="text">
          {{ text | formateDate }}
        </span>
        <span slot="haddtime" slot-scope="text">
          {{ text | formateDate }}
        </span>
        <span slot="daddtime" slot-scope="text">
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
import { newPurchaseOrder, editPurchaseOrder, purchaseOrderList } from '@/api/purchaseOrder'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

const stateMap = {
  0: {
    status: 'default',
    text: '禁用中'
  },
  1: {
    status: 'processing',
    text: '启用中'
  },
  2: {
    status: 'processing',
    text: '启用中'
  },
  3: {
    status: 'processing',
    text: '启用中'
  },
  4: {
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
        return purchaseOrderList(requestParameters)
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
          title: '供应商名称',
          dataIndex: 'gname',
          width: 180,
          resizable: 'true'
        },
        {
          title: '商品名称',
          dataIndex: 'sname',
          width: 100,
          resizable: 'true'
        },
        {
          title: '数量',
          dataIndex: 'nmber',
          width: 60,
          resizable: 'true'
        },
        {
          title: '单位',
          dataIndex: 'danwei',
          width: 60,
          resizable: 'true'
        },
        {
          title: '规格',
          dataIndex: 'specification',
          width: 60,
          resizable: 'true'
        },
        {
          title: '销售价',
          dataIndex: 'danjia',
          width: 90,
          resizable: 'true'
        },
        {
          title: '预计费用',
          dataIndex: 'feiyong',
          width: 100,
          resizable: 'true'
        },
        {
          title: '制单人',
          dataIndex: 'preparedby',
          width: 90,
          resizable: 'true'
        },
        // {
        //   title: '订货量',
        //   dataIndex: 'orderquantity',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '采购数量',
        //   dataIndex: 'purchasequantity',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '采购重量',
        //   dataIndex: 'purchaseweight',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '实收量',
        //   dataIndex: 'paid',
        //   width: 120,
        //   resizable: 'true'
        // },
        // {
        //   title: '差量',
        //   dataIndex: 'difference',
        //   width: 120,
        //   resizable: 'true'
        // },
        {
          title: '订货日期',
          scopedSlots: { customRender: 'daddtime' },
          dataIndex: 'daddtime',
          width: 140,
          resizable: 'true'
        },
        {
          title: '回货日期',
          scopedSlots: { customRender: 'haddtime' },
          dataIndex: 'haddtime',
          width: 140,
          resizable: 'true'
        },
        {
          title: '预计到货时间',
          dataIndex: 'yuji',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '订单编号',
        //   dataIndex: 'orderno',
        //   resizable: 'true'
        // },

        {
          title: '状态',
          scopedSlots: { customRender: 'state' },
          width: 100,
          dataIndex: 'state'
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
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  filters: {
    stateFilter (type) {
      return stateMap[type].text
    },
    stateTypeFilter (type) {
      return stateMap[type].status
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
            editPurchaseOrder(values)
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
            newPurchaseOrder(values)
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
      if (record.state !== 0) {
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
