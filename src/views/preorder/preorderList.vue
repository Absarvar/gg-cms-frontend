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
              <a-col :md="8" :sm="24"> <a-form-item label="预定单号"> <a-input v-model="queryParam.preorderCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="会员id"> <a-input v-model="queryParam.memberId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="预定手机号"> <a-input v-model="queryParam.mobile" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品id"> <a-input v-model="queryParam.goodsId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="规格id"> <a-input v-model="queryParam.skuId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认规格"> <a-input v-model="queryParam.confirmSku" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认数量"> <a-input v-model="queryParam.confirmNum" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="确认价格"> <a-input v-model="queryParam.confirmPrice" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="总额"> <a-input v-model="queryParam.amount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="到货时间"> <a-input v-model="queryParam.arriveTime" placeholder=""/> </a-form-item> </a-col>

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

        <span slot="arriveTime" slot-scope="text">
          {{ text | formateDay }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">编辑</a>
            <template v-if="record.status===PreorderStatus.CONFIRMED">
              <a-divider type="vertical" />
              <a @click="handleGoSend(record)">配货</a>
            </template>
            <!-- <a @click="handleSub(record)">订阅报警</a> -->
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
      <go-send-form
        ref="goSend"
        :visible="goSend"
        :goSend="goSend"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="goodsSend"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { newPreorder, editPreorder, preorderList } from '@/api/preorder'
import { preorderGoSend } from '@/api/mkOrder'

import CreateForm from './modules/CreateForm'
import GoSendForm from './modules/GoSendForm'
import { formateDate } from '@/utils/dateUtil'
import { PreorderStatus, PreorderStatusMap } from '@/config/status.config'
// import { preorderStatusOptions } from '@/api/commonData'

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    GoSendForm
  },
  data () {
    return {
      PreorderStatus: PreorderStatus,
      // create model
      goSend: false,
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
          title: '预定单号',
          dataIndex: 'preorderCode',
          width: 110,
          resizable: 'true'
        },
        {
          title: '会员',
          dataIndex: 'memberName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '预定手机号',
          dataIndex: 'mobile',
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
          title: '单位',
          dataIndex: 'unit',
          width: 60,
          resizable: 'true'
        },
        {
          title: '规格',
          dataIndex: 'skuName',
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
          title: '确认规格',
          dataIndex: 'confirmSku',
          width: 120,
          resizable: 'true'
        },
        {
          title: '确认数量',
          dataIndex: 'confirmNum',
          width: 120,
          resizable: 'true'
        },
        {
          title: '确认价格',
          dataIndex: 'confirmPrice',
          width: 120,
          resizable: 'true'
        },
        {
          title: '总额',
          dataIndex: 'amount',
          width: 120,
          resizable: 'true'
        },
        {
          title: '到货时间',
          dataIndex: 'arriveTime',
          scopedSlots: { customRender: 'arriveTime' },
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
      return PreorderStatusMap[type].text
    },
    statusTypeFilter (type) {
      return PreorderStatusMap[type].status
    },
    formateDate (time) {
      const date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    },
    formateDay (time) {
      const date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd')
    }
  },
  created () {
    this.PreorderStatus = PreorderStatus
    console.log(PreorderStatusMap)
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
      this.goSend = false
    },
    handleEdit (record) {
      this.visible = true
      this.goSend = false
      this.mdl = { ...record }
    },
    handleGoSend (record) {
      this.visible = false
      this.goSend = true
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
              this.goSend = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              if (res.success === true) {
                this.$message.info('确认成功')
              } else {
                this.$message.info('确认失败，' + res.msg)
              }
            })
          } else {
            // 新增
            newPreorder(values)
            .then(res => {
              this.visible = false
              this.goSend = false
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
    goodsSend () {
      const form = this.$refs.goSend.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          if (values.id > 0) {
            // 配货 e.g.
            preorderGoSend(values)
            .then(res => {
              this.visible = false
              this.goSend = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('配货成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.goSend = false

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
