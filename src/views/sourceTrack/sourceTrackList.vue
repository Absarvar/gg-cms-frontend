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
              <a-col :md="8" :sm="24"> <a-form-item label="会员名称"> <a-input v-model="queryParam.namess" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.outtradeno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品名称"> <a-input v-model="queryParam.devicename" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="轨道编号"> <a-input v-model="queryParam.devicecode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="等级"> <a-input v-model="queryParam.rank" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="溯源批次号(编号)"> <a-input v-model="queryParam.orderid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商名字"> <a-input v-model="queryParam.gyname" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="申报时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="进场时间"> <a-input v-model="queryParam.jtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="车牌号"> <a-input v-model="queryParam.licenseplatenumber" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="验收人"> <a-input v-model="queryParam.register" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="养殖户"> <a-input v-model="queryParam.farmers" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰场名称"> <a-input v-model="queryParam.logisticianname" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰票证"> <a-input v-model="queryParam.ticket" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="养殖票证"> <a-input v-model="queryParam.wphoto" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="溯源码"> <a-input v-model="queryParam.sycode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向时间"> <a-input v-model="queryParam.lxaddtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向地址"> <a-input v-model="queryParam.flowaddress" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.certificateno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="批发市场名字"> <a-input v-model="queryParam.logistician" placeholder=""/> </a-form-item> </a-col>

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
        <a-button type="primary" icon="plus" @click="handleAdd">新222222222建</a-button>
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
import { newSourceTrack, editSourceTrack, sourceTrackList } from '@/api/sourceTrack'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

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
        return sourceTrackList(requestParameters)
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
          title: '会员名称',
          dataIndex: 'namess',
          width: 120,
          resizable: 'true'
        },
        {
          title: '订单编号',
          dataIndex: 'outtradeno',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品名称',
          dataIndex: 'devicename',
          width: 120,
          resizable: 'true'
        },
        {
          title: '轨道编号',
          dataIndex: 'devicecode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '等级',
          dataIndex: 'rank',
          width: 120,
          resizable: 'true'
        },
        {
          title: '溯源批次号(编号)',
          dataIndex: 'orderid',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商名字',
          dataIndex: 'gyname',
          width: 120,
          resizable: 'true'
        },
        {
          title: '申报时间',
          scopedSlots: { customRender: 'addtime' },
          dataIndex: 'addtime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '进场时间',
          dataIndex: 'jtime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '车牌号',
          dataIndex: 'licenseplatenumber',
          width: 120,
          resizable: 'true'
        },
        {
          title: '验收人',
          dataIndex: 'register',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖户',
          dataIndex: 'farmers',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰场名称',
          dataIndex: 'logisticianname',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰票证',
          dataIndex: 'ticket',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖票证',
          dataIndex: 'wphoto',
          width: 120,
          resizable: 'true'
        },
        {
          title: '溯源码',
          dataIndex: 'sycode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向时间',
          dataIndex: 'lxaddtime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向地址',
          dataIndex: 'flowaddress',
          width: 120,
          resizable: 'true'
        },
        {
          title: '检疫证号',
          dataIndex: 'certificateno',
          width: 120,
          resizable: 'true'
        },
        {
          title: '批发市场名字',
          dataIndex: 'logistician',
          width: 120,
          resizable: 'true'
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
            editSourceTrack(values)
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
            newSourceTrack(values)
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
