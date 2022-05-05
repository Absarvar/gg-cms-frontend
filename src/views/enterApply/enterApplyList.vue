<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="创建日期">
                <a-range-picker
                  style="width: 400px"
                  :ranges="ranges"
                  format="YYYY-MM-DD"
                  @change="timeChange"
                />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24"> <a-form-item label="ID"> <a-input v-model="queryParam.orderid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入场批次号"> <a-input v-model="queryParam.pinjie" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="动物种类"> <a-input v-model="queryParam.animalspecies" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="车牌号"> <a-input v-model="queryParam.licenseplatenumber" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认状态"> <a-input v-model="queryParam.statusok" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="申报人"> <a-input v-model="queryParam.name" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="联系方式"> <a-input v-model="queryParam.consigneephonenum" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预报规格"> <a-input v-model="queryParam.standards" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预报数量"> <a-input v-model="queryParam.number" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="申报重量"> <a-input v-model="queryParam.quantity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.certificateno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰单位"> <a-input v-model="queryParam.destination" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="养殖单位"> <a-input v-model="queryParam.farmers" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="司机"> <a-input v-model="queryParam.driver" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="司机手机号"> <a-input v-model="queryParam.cellphonenumber" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰场ID"> <a-input v-model="queryParam.logisticianid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商id"> <a-input v-model="queryParam.fid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商家类型 1.生产者 2.供应商"> <a-input v-model="queryParam.factorytype" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="车辆是否消毒 1-是  2-否"> <a-input v-model="queryParam.disinfected" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="养殖户ID"> <a-input v-model="queryParam.outletsid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品id"> <a-input v-model="queryParam.shoppingid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="启动地点"> <a-input v-model="queryParam.address" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="运输方式"> <a-input v-model="queryParam.typeofshipping" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入场申报票证"> <a-input v-model="queryParam.wphoto" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入库计重"> <a-input v-model="queryParam.warehousing" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="出库时间"> <a-input v-model="queryParam.exwarehousetime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="添加时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="复核时间"> <a-input v-model="queryParam.futime" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="登记员"> <a-input v-model="queryParam.register" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="销售入库0，定向入库1"> <a-input v-model="queryParam.type" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰票证"> <a-input v-model="queryParam.ticket" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="备注"> <a-input v-model="queryParam.remark" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="合格（1合格2不合格）"> <a-input v-model="queryParam.qualified" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="初始读数"> <a-input v-model="queryParam.initialreading" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="复核读数"> <a-input v-model="queryParam.recheckreading" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="复核重量"> <a-input v-model="queryParam.recheckweight" placeholder=""/> </a-form-item> </a-col>

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

        <span slot="statusok" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="wphoto" slot-scope="text">
          <a :href="'https://sy.ggmstc.com/szszdistfile/'+text" target="_blank">查看</a>
        </span>
        <span slot="ticket" slot-scope="text">
          <a :href="'https://sy.ggmstc.com/szszdistfile/'+text" target="_blank">查看</a>
        </span>

        <span slot="number" slot-scope="text, record">
          <router-link :to="{path: '/pdProduct-manage/pdProduct-list', query: {'outletsid':record.orderID }}">
            {{ text }}
          </router-link>
        </span>

        <span slot="addTime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <!-- <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a> -->
            <a-divider type="vertical" />
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
import { newEnterApply, editEnterApply, enterApplyList } from '@/api/enterApply'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

const statusMap = {
  0: {
    status: 'default',
    text: '未确认'
  },
  1: {
    status: 'processing',
    text: '已确认'
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
        return enterApplyList(requestParameters)
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
          title: 'ID',
          dataIndex: 'orderID',
          width: 100,
          resizable: 'true'
        },
        {
          title: '入场批次号',
          dataIndex: 'pinjie',
          width: 120,
          resizable: 'true'
        },
        {
          title: '动物种类',
          dataIndex: 'animalspecies',
          width: 100,
          resizable: 'true'
        },
        {
          title: '车牌号',
          dataIndex: 'licenseplatenumber',
          width: 100,
          resizable: 'true'
        },
        {
          title: '确认状态',
          dataIndex: 'statusok',
          width: 100,
          resizable: 'true',
          scopedSlots: { customRender: 'statusok' }
        },
        {
          title: '申报人',
          dataIndex: 'applierPersonName',
          width: 80,
          resizable: 'true'
        },
        {
          title: '申报公司',
          dataIndex: 'applierEntName',
          width: 200,
          resizable: 'true'
        },
        {
          title: '联系方式',
          dataIndex: 'applierMobile',
          width: 120,
          resizable: 'true'
        },
        {
          title: '申报规格',
          dataIndex: 'standards',
          width: 100,
          resizable: 'true'
        },
        {
          title: '申报数量',
          dataIndex: 'number',
          width: 100,
          resizable: 'true',
          scopedSlots: { customRender: 'number' }
        },
        {
          title: '申报重量',
          dataIndex: 'quantity',
          width: 100,
          resizable: 'true'
        },
        {
          title: '检疫证号',
          dataIndex: 'certificateno',
          width: 110,
          resizable: 'true'
        },
        {
          title: '屠宰单位',
          dataIndex: 'destination',
          width: 150,
          resizable: 'true'
        },
        {
          title: '负责人',
          dataIndex: 'slaughterBoss',
          width: 100,
          resizable: 'true'
        },
        {
          title: '联系电话',
          dataIndex: 'slaughterMobile',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖单位',
          dataIndex: 'farmers',
          width: 150,
          resizable: 'true'
        },
        {
          title: '司机',
          dataIndex: 'driver',
          width: 100,
          resizable: 'true'
        },
        {
          title: '司机手机号',
          dataIndex: 'cellPhoneNumber',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商id',
          dataIndex: 'fid',
          width: 100,
          resizable: 'true'
        },
        // {
        //   title: '商家类型 1.生产者 2.供应商',
        //   dataIndex: 'factorytype',
        //   width: 100,
        //   resizable: 'true'
        // },
        // {
        //   title: '车辆是否消毒 1-是  2-否',
        //   dataIndex: 'disinfected',
        //   width: 100,
        //   resizable: 'true'
        // },
        // {
        //   title: '养殖户ID',
        //   dataIndex: 'outletsid',
        //   width: 100,
        //   resizable: 'true'
        // },
        // {
        //   title: '商品id',
        //   dataIndex: 'shoppingid',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '启动地点',
          dataIndex: 'address',
          width: 300,
          resizable: 'true'
        },
        {
          title: '运输方式',
          dataIndex: 'typeofshipping',
          width: 100,
          resizable: 'true'
        },
        {
          title: '申报票证',
          dataIndex: 'wphoto',
          width: 100,
          resizable: 'true',
          scopedSlots: { customRender: 'wphoto' }
        },
        {
          title: '入库计重',
          dataIndex: 'warehousing',
          width: 100,
          resizable: 'true'
        },
        {
          title: '出库时间',
          dataIndex: 'exwarehousetime',
          width: 100,
          resizable: 'true'
        },
        {
          title: '复核时间',
          dataIndex: 'futime',
          width: 150,
          resizable: 'true'
        },
        {
          title: '登记员',
          dataIndex: 'register',
          width: 120,
          resizable: 'true'
        },
        // {
        //   title: '销售入库0，定向入库1',
        //   dataIndex: 'type',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '屠宰票证',
          dataIndex: 'ticket',
          width: 100,
          resizable: 'true',
          scopedSlots: { customRender: 'ticket' }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          width: 100,
          resizable: 'true'
        },
        // {
        //   title: '合格（1合格2不合格）',
        //   dataIndex: 'qualified',
        //   width: 100,
        //   resizable: 'true'
        // },
        {
          title: '初始读数',
          dataIndex: 'initialreading',
          width: 100,
          resizable: 'true'
        },
        {
          title: '复核读数',
          dataIndex: 'recheckreading',
          width: 100,
          resizable: 'true'
        },
        {
          title: '复核重量',
          dataIndex: 'recheckweight',
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
          scopedSlots: { customRender: 'addTime' },
          width: 200,
          dataIndex: 'addTime'
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
            editEnterApply(values)
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
            newEnterApply(values)
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
