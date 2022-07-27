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
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰场名称"> <a-input v-model="queryParam.butcherEntName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="批次"> <a-input v-model="queryParam.batch" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="车牌号"> <a-input v-model="queryParam.plateNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品"> <a-input v-model="queryParam.goodsName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰时间"> <a-input v-model="queryParam.butcherTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰水温"> <a-input v-model="queryParam.butcherWaterTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="凉水池"> <a-input v-model="queryParam.coolPool" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入库时间"> <a-input v-model="queryParam.instockTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入库温度"> <a-input v-model="queryParam.instockTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预冷库温度"> <a-input v-model="queryParam.precoldTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出库时间"> <a-input v-model="queryParam.outstockTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出库温度"> <a-input v-model="queryParam.outstockTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="始发车厢温度"> <a-input v-model="queryParam.takeOffTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出发时间"> <a-input v-model="queryParam.takeOffTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="途中车厢温度"> <a-input v-model="queryParam.onWayTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="途中中心温度"> <a-input v-model="queryParam.onWayCenterTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="到达供广时间"> <a-input v-model="queryParam.arriveTime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="到场车厢温度"> <a-input v-model="queryParam.arriveTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="到场中心温度"> <a-input v-model="queryParam.arriveCenterTemp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="操作员"> <a-input v-model="queryParam.operatorId" placeholder=""/> </a-form-item> </a-col>

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
        <!-- <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
        <a-upload
          name="file"
          :multiple="true"
          :action="importUrl.url"
          :headers="importHeaders"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 导入 </a-button>
        </a-upload>
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
import { newTempMonitor, editTempMonitor, tempMonitorList, tempMonitorApi } from '@/api/tempMonitor'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import { uploadHeaders } from '@/utils/util'

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
      importHeaders: uploadHeaders,
      importUrl: {
        url: tempMonitorApi.importTempMonitor
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
        return tempMonitorList(requestParameters)
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
          title: '屠宰场名称',
          dataIndex: 'butcherEntName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '批次',
          dataIndex: 'batch',
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
          title: '商品',
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
          title: '屠宰时间',
          dataIndex: 'butcherTime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰水温',
          dataIndex: 'butcherWaterTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '凉水池',
          dataIndex: 'coolPool',
          width: 120,
          resizable: 'true'
        },
        {
          title: '入库时间',
          dataIndex: 'instockTime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '入库温度',
          dataIndex: 'instockTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '预冷库温度',
          dataIndex: 'precoldTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出库时间',
          dataIndex: 'outstockTime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出库温度',
          dataIndex: 'outstockTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '始发车厢温度',
          dataIndex: 'takeOffTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出发时间',
          dataIndex: 'takeOffTime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '途中车厢温度',
          dataIndex: 'onWayTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '途中中心温度',
          dataIndex: 'onWayCenterTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '到达供广时间',
          dataIndex: 'arriveTime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '到场车厢温度',
          dataIndex: 'arriveTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '到场中心温度',
          dataIndex: 'arriveCenterTemp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '操作员',
          dataIndex: 'operatorId',
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
            editTempMonitor(values)
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
            newTempMonitor(values)
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
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success === true) {
          this.$message.success(`${info.file.name} 导入成功！`)
          // 刷新表格
          this.$refs.table.refresh(true)
        } else {
          this.$message.error(`${info.file.name} 导入失败.原因：${info.file.response.msg}`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
      }
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
