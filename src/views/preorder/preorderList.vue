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
              <a-col :md="8" :sm="24"> <a-form-item label="会员id"> <a-input v-model="queryParam.ouid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="会员名称"> <a-input v-model="queryParam.membername" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="电话"> <a-input v-model="queryParam.phone" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预定商品"> <a-input v-model="queryParam.commodity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品级别"> <a-input v-model="queryParam.rank" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品规格"> <a-input v-model="queryParam.specification" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="添加时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="到货时间"> <a-input v-model="queryParam.thearrivaltime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="业务员"> <a-input v-model="queryParam.salesman" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.number" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认数量"> <a-input v-model="queryParam.qnumber" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认价格"> <a-input v-model="queryParam.price" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认状态"> <a-input v-model="queryParam.type" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预估金额"> <a-input v-model="queryParam.money" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认规格"> <a-input v-model="queryParam.guige" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="备注"> <a-input v-model="queryParam.remarks" placeholder=""/> </a-form-item> </a-col>

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
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        //   width: 60
        // },
        // {
        //   title: '会员id',
        //   dataIndex: 'ouid',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '会员名称',
          dataIndex: 'membername',
          width: 150,
          resizable: 'true'
        },
        {
          title: '电话',
          dataIndex: 'phone',
          width: 120,
          resizable: 'true'
        },
        {
          title: '预定商品',
          dataIndex: 'commodity',
          width: 100,
          resizable: 'true'
        },
        // {
        //   title: '商品级别',
        //   dataIndex: 'rank',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '商品规格',
          dataIndex: 'specification',
          width: 100,
          resizable: 'true'
        },
        {
          title: '添加时间',
          dataIndex: 'addTimeStr',
          width: 120,
          resizable: 'true'
        },
        {
          title: '到货时间',
          dataIndex: 'theArrivalTimeStr',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '业务员',
        //   dataIndex: 'salesman',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '数量',
          dataIndex: 'number',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认数量',
          dataIndex: 'qnumber',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认价格',
          dataIndex: 'price',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认状态',
          dataIndex: 'type',
          width: 100,
          resizable: 'true'
        },
        {
          title: '预估金额',
          dataIndex: 'money',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认规格',
          dataIndex: 'guige',
          width: 100,
          resizable: 'true'
        },
        {
          title: '备注',
          dataIndex: 'remarks',
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
<style >
.table-striped {
  background-color: #fafafa;
}
</style>
