<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">禁用</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="创建日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入创建日期"/>
                </a-form-item>
              </a-col>
            <template v-if="advanced">
            <a-col :md="8" :sm="24"> <a-form-item label="名称"> <a-input v-model="queryParam.name" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="轨道编号"> <a-input v-model="queryParam.orbitCode" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="商品id"> <a-input v-model="queryParam.goodsId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="skuID"> <a-input v-model="queryParam.skuId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="订单id"> <a-input v-model="queryParam.orderId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="会员id"> <a-input v-model="queryParam.memberId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="地址id"> <a-input v-model="queryParam.addressId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="入场申请id"> <a-input v-model="queryParam.applyId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="来源id"> <a-input v-model="queryParam.sourceId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="终端id"> <a-input v-model="queryParam.terminalId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="等级"> <a-input v-model="queryParam.level" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.weight" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="实际价格"> <a-input v-model="queryParam.price" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="预定价格"> <a-input v-model="queryParam.priceT" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="入库时间"> <a-input v-model="queryParam.instockTime" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="出库时间"> <a-input v-model="queryParam.outstockTime" placeholder=""/> </a-form-item> </a-col>

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
import { newProduct, editProduct, productList } from '@/api/product'

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
        return productList(requestParameters)
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
          title: '名称',
          dataIndex: 'name',
          width: 100,
          resizable: 'true'
        },
        {
          title: '轨道编号',
          dataIndex: 'orbitCode',
          width: 100,
          resizable: 'true'
        },
        {
          title: '商品id',
          dataIndex: 'goodsId',
          width: 100,
          resizable: 'true'
        },
        {
          title: 'skuID',
          dataIndex: 'skuId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '订单id',
          dataIndex: 'orderId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '会员id',
          dataIndex: 'memberId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '地址id',
          dataIndex: 'addressId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '入场申请id',
          dataIndex: 'applyId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '来源id',
          dataIndex: 'sourceId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '终端id',
          dataIndex: 'terminalId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '等级',
          dataIndex: 'level',
          width: 100,
          resizable: 'true'
        },
        {
          title: '重量',
          dataIndex: 'weight',
          width: 100,
          resizable: 'true'
        },
        {
          title: '实际价格',
          dataIndex: 'price',
          width: 100,
          resizable: 'true'
        },
        {
          title: '预定价格',
          dataIndex: 'priceT',
          width: 100,
          resizable: 'true'
        },
        {
          title: '入库时间',
          dataIndex: 'instockTime',
          width: 100,
          resizable: 'true'
        },
        {
          title: '出库时间',
          dataIndex: 'outstockTime',
          width: 100,
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
          dataIndex: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
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
            editProduct(values)
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
            newProduct(values)
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
