<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24"> <a-form-item label="预定单号"> <a-input v-model="queryParam.preorderCode" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="用户id"> <a-input v-model="queryParam.memberId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="手机号"> <a-input v-model="queryParam.mobile" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="商品id"> <a-input v-model="queryParam.goodsId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="规格"> <a-input v-model="queryParam.skuId" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="确认规格"> <a-input v-model="queryParam.confirmSku" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="确认数量"> <a-input v-model="queryParam.confirmNum" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="确认价格"> <a-input v-model="queryParam.confirmPrice" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="合计总额"> <a-input v-model="queryParam.amount" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="预计到货时间"> <a-input v-model="queryParam.arriveTime" placeholder=""/> </a-form-item> </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">禁用</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="创建日期">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入创建日期"/>
                </a-form-item>
              </a-col>
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
        :scroll="{ x: 1800, y: 600 }"
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
import { newPreorder, editPreorder, preorderList } from '@/api/preorder'

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
        return preorderList(requestParameters)
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
          width: 60,
          dataIndex: 'id'
        },
        {
          title: '预定单号',
          dataIndex: 'preorderCode',
          width: 100,
          resizable: 'true'
        },
        {
          title: '用户id',
          dataIndex: 'memberId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品id',
          dataIndex: 'goodsId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '规格',
          dataIndex: 'skuId',
          width: 100,
          resizable: 'true'
        },
        {
          title: '数量',
          dataIndex: 'num',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认规格',
          dataIndex: 'confirmSku',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认数量',
          dataIndex: 'confirmNum',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认价格',
          dataIndex: 'confirmPrice',
          width: 100,
          resizable: 'true'
        },
        {
          title: '合计总额',
          dataIndex: 'amount',
          width: 100,
          resizable: 'true'
        },
        {
          title: '预计到货时间',
          dataIndex: 'arriveTime',
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
          width: 200,
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
            editPreorder(values)
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
            newPreorder(values)
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
