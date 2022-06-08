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
              <a-col :md="8" :sm="24"> <a-form-item label="仓库"> <a-input v-model="queryParam.depository" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="分组"> <a-input v-model="queryParam.grp" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品名称"> <a-input v-model="queryParam.goodsName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="领用原料出库量（原单位）"> <a-input v-model="queryParam.drawMtrlOri" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="领用原料出库重量"> <a-input v-model="queryParam.drawMtrlWeight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产领料退回入库量（原单位）"> <a-input v-model="queryParam.returnMtrlOri" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产领料退回入库重量"> <a-input v-model="queryParam.returnMtrlWeightOri" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="实际领用量（原单位）"> <a-input v-model="queryParam.actDrawMtrlOri" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="实际领用重量"> <a-input v-model="queryParam.actDrawMtrlWeight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="原料单价"> <a-input v-model="queryParam.mtrlPrice" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="原料金额"> <a-input v-model="queryParam.mtrlAmount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="明细日期"> <a-input v-model="queryParam.effectTime" placeholder=""/> </a-form-item> </a-col>

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

      <template>

        <!-- <div>
          <a-descriptions
            title="汇总信息"
            bordered
            :column="{ xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 4 }"
          >
            <a-descriptions-item label="领用重量">
              发货重量
            </a-descriptions-item>
            <a-descriptions-item label="损耗量">
              损耗率
            </a-descriptions-item>
            <a-descriptions-item label="领用成本金额">
              加工金额
            </a-descriptions-item>
            <a-descriptions-item label="加工毛利">
              加工毛利率
            </a-descriptions-item>

            <a-descriptions-item label="?">
              ?
            </a-descriptions-item>
            <a-descriptions-item label="?">
              ?
            </a-descriptions-item>
            <a-descriptions-item label="?">
              ?
            </a-descriptions-item>
            <a-descriptions-item label="?">
              ?
            </a-descriptions-item>
          </a-descriptions>
        </div> -->
      </template>
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>

        <a-upload
          name="file"
          :multiple="true"
          :action="importUrl.url"
          :headers="headers"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> Click to Upload </a-button>
        </a-upload>
        <!-- <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown> -->
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
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span> -->
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

      汇总数据
      <s-table
        ref="table_sta"
        size="default"
        rowKey="key"
        bordered
        :columns="columns_sta"
        :data="loadDataSta"
        :showPagination="false"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      >
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
import { newDrawDetail, editDrawDetail, drawDetailList, drawDetailApi, drawDetailStatistic } from '@/api/drawDetail'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// const statusMap = {
//   0: {
//     status: 'default',
//     text: '禁用中'
//   },
//   1: {
//     status: 'processing',
//     text: '启用中'
//   }
// }

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm
  },
  data () {
    return {
      headers: {
        Authorization: storage.get(ACCESS_TOKEN)
      },
      importUrl: {
        url: drawDetailApi.importDrawDetail
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
        return drawDetailList(requestParameters)
          .then(res => {
            return res.data
          })
      },
      // 加载数据方法 必须为 Promise 对象
      loadDataSta: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return drawDetailStatistic(requestParameters)
          .then(res => {
            console.log(res)
            return res.data
          })
      },
      selectedRowKeys: [],
      selectedRows: [],
      columns_sta: [
        {
          title: '分组',
          dataIndex: 'grp',
          width: 60
        },
        {
          title: '领用重量',
          dataIndex: 'drawWeight',
          width: 60
        },
        {
          title: '发货重量',
          dataIndex: 'sendWeight',
          width: 60
        },
        {
          title: '损耗量',
          dataIndex: 'costWeight',
          width: 60
        },
        {
          title: '损耗率',
          dataIndex: 'costRate',
          width: 60
        },
        {
          title: '领用成本金额',
          dataIndex: 'drawAmount',
          width: 60
        },
        {
          title: '加工金额',
          dataIndex: 'processAmount',
          width: 60
        },
        {
          title: '加工毛利',
          dataIndex: 'processProfit',
          width: 60
        },
        {
          title: '加工毛利率',
          dataIndex: 'processProfitRate',
          width: 60
        }
      ],
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
          title: '仓库',
          dataIndex: 'depository',
          width: 120,
          resizable: 'true'
        },
        {
          title: '分组',
          dataIndex: 'grp',
          width: 120,
          resizable: 'true'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName',
          width: 120,
          resizable: 'true'
        },
        {
          title: '领用原料出库量（原单位）',
          dataIndex: 'drawMtrlOri',
          width: 120,
          resizable: 'true'
        },
        {
          title: '领用原料出库重量',
          dataIndex: 'drawMtrlWeight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产领料退回入库量（原单位）',
          dataIndex: 'returnMtrlOri',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产领料退回入库重量',
          dataIndex: 'returnMtrlWeightOri',
          width: 120,
          resizable: 'true'
        },
        {
          title: '实际领用量（原单位）',
          dataIndex: 'actDrawMtrlOri',
          width: 120,
          resizable: 'true'
        },
        {
          title: '实际领用重量',
          dataIndex: 'actDrawMtrlWeight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '原料单价',
          dataIndex: 'mtrlPrice',
          width: 120,
          resizable: 'true'
        },
        {
          title: '原料金额',
          dataIndex: 'mtrlAmount',
          width: 120,
          resizable: 'true'
        },
        {
          title: '明细日期',
          dataIndex: 'effectTime',
          width: 120,
          resizable: 'true'
        },

        // {
        //   title: '状态',
        //   scopedSlots: { customRender: 'status' },
        //   width: 100,
        //   dataIndex: 'status'
        // },
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
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  filters: {
    // statusFilter (type) {
    //   return statusMap[type].text
    // },
    // statusTypeFilter (type) {
    //   return statusMap[type].status
    // },
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
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
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
            editDrawDetail(values)
            .then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()
              this.$refs.table_sta.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            newDrawDetail(values)
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
