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
              <a-col :md="8" :sm="24"> <a-form-item label="批次号"> <a-input v-model="queryParam.batchNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.quarantineNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品id"> <a-input v-model="queryParam.goodsId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰场ID"> <a-input v-model="queryParam.butcherId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="养殖场ID"> <a-input v-model="queryParam.farmId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="用途"> <a-input v-model="queryParam.usage" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="承运人"> <a-input v-model="queryParam.carrier" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="承运人手机"> <a-input v-model="queryParam.carrierMobile" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="运输方式"> <a-input v-model="queryParam.transportation" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="车牌号"> <a-input v-model="queryParam.plateNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="申报用户id"> <a-input v-model="queryParam.memberId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="审核人"> <a-input v-model="queryParam.acceptorId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入场时间"> <a-input v-model="queryParam.enterTime" placeholder=""/> </a-form-item> </a-col>

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
        <span slot="enterTime" slot-scope="text">
          {{ text | formateDate }}
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot="farmTicket" slot-scope="text">
          <a :href="'http://cdn.ggmstc.com/'+text" target="_blank">查看</a>
        </span>

        <span slot="quarantineTicket" slot-scope="text">
          <a :href="'http://cdn.ggmstc.com/'+text" target="_blank">查看</a>
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">查看</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a> -->
            <template v-if="queryParam.op==='instock'">
              <a-divider type="vertical" />
              <router-link :to="{path: '/trade-center/ground-manage/productInstock', query: {'id':record.id }}">
                理货入库
              </router-link>
            </template>
          </template>
        </span>
      </s-table>

      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :op="queryParam.op"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { newEntryApply, editEntryApply, entryApplyList } from '@/api/entryApply'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import { getPageQuery } from '@/utils/util'

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
        const urlParam = getPageQuery()
        if (urlParam !== undefined) {
          Object.assign(this.queryParam, urlParam)
        //  this.queryParam = urlParam
        }
        console.log(this.queryParam)
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return entryApplyList(requestParameters)
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
          title: '批次号',
          dataIndex: 'batchNo',
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
          title: '商品id',
          dataIndex: 'goodsId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品数量',
          dataIndex: 'num',
          width: 120,
          resizable: 'true'
        },
        {
          title: '总重量',
          dataIndex: 'weight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰场ID',
          dataIndex: 'butcherId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖场ID',
          dataIndex: 'farmId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '用途',
          dataIndex: 'usage',
          width: 120,
          resizable: 'true'
        },
        {
          title: '承运人',
          dataIndex: 'carrier',
          width: 120,
          resizable: 'true'
        },
        {
          title: '承运人手机',
          dataIndex: 'carrierMobile',
          width: 120,
          resizable: 'true'
        },
        {
          title: '运输方式',
          dataIndex: 'transportation',
          width: 120,
          resizable: 'true'
        },
        {
          title: '车牌号',
          dataIndex: 'plateNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '是否已消毒',
          dataIndex: 'disinfect',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖票证',
          dataIndex: 'farmTicket',
          width: 120,
          resizable: 'true',
          scopedSlots: { customRender: 'farmTicket' }
        },
        {
          title: '屠宰票证',
          dataIndex: 'quarantineTicket',
          width: 120,
          resizable: 'true',
          scopedSlots: { customRender: 'quarantineTicket' }
        },
        {
          title: '地磅初读',
          dataIndex: 'checkLoad',
          width: 120,
          resizable: 'true'
        },
        {
          title: '地磅复读',
          dataIndex: 'recheckLoad',
          width: 120,
          resizable: 'true'
        },
        {
          title: '地磅重量',
          dataIndex: 'load',
          width: 120,
          resizable: 'true'
        },
        {
          title: '申报用户id',
          dataIndex: 'memberId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '审核人',
          dataIndex: 'acceptorId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '入场时间',
          scopedSlots: { customRender: 'enterTime' },
          dataIndex: 'enterTime',
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
          fixed: 'right',
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
      this.$nextTick(() => {
        const urlParam = getPageQuery()
        if (urlParam !== undefined) {
          Object.assign(this.queryParam, urlParam)
        //  this.queryParam = urlParam
        }
        console.log(this.queryParam)
      })
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
            editEntryApply(values)
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
            newEntryApply(values)
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
