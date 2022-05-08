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
            <a-col :md="8" :sm="24"> <a-form-item label="供应商名称"> <a-input v-model="queryParam.corporatename" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="相关认证"> <a-input v-model="queryParam.certificationtypeyz" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="信用代码"> <a-input v-model="queryParam.businesslicensenumber" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="屠宰营业执照上传"> <a-input v-model="queryParam.businesslicense" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="屠宰单位"> <a-input v-model="queryParam.namefarm" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="屠宰地址"> <a-input v-model="queryParam.farmaddress" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="联系人"> <a-input v-model="queryParam.personincharge" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="电话"> <a-input v-model="queryParam.contactinformation" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="信用代码"> <a-input v-model="queryParam.creditcode" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="场地人数"> <a-input v-model="queryParam.people" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="养殖种类"> <a-input v-model="queryParam.breedingspecies" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="出栏量"> <a-input v-model="queryParam.stock" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="占地面积"> <a-input v-model="queryParam.areacovered" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="行政许可动物防疫合格证号"> <a-input v-model="queryParam.animalepidemic" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="养殖场备案号"> <a-input v-model="queryParam.farmrecordno" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="审核报告上传"> <a-input v-model="queryParam.auditreport" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="审核时间"> <a-input v-model="queryParam.constructiontime" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="添加时间"> <a-input v-model="queryParam.addtime" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="审核人"> <a-input v-model="queryParam.reviewer" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24"> <a-form-item label="提交人id"> <a-input v-model="queryParam.operatorid" placeholder=""/> </a-form-item> </a-col>

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
import { newSlaughterHouse, editSlaughterHouse, slaughterHouseList } from '@/api/slaughterHouse'

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
        return slaughterHouseList(requestParameters)
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
          title: '供应商名称',
          dataIndex: 'corporatename',
          width: 120,
          resizable: 'true'
        },
        {
          title: '相关认证',
          dataIndex: 'certificationtypeyz',
          width: 120,
          resizable: 'true'
        },
        {
          title: '信用代码',
          dataIndex: 'businesslicensenumber',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰营业执照上传',
          dataIndex: 'businesslicense',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰单位',
          dataIndex: 'namefarm',
          width: 120,
          resizable: 'true'
        },
        {
          title: '屠宰地址',
          dataIndex: 'farmaddress',
          width: 120,
          resizable: 'true'
        },
        {
          title: '联系人',
          dataIndex: 'personincharge',
          width: 120,
          resizable: 'true'
        },
        {
          title: '电话',
          dataIndex: 'contactinformation',
          width: 120,
          resizable: 'true'
        },
        {
          title: '信用代码',
          dataIndex: 'creditcode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '场地人数',
          dataIndex: 'people',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖种类',
          dataIndex: 'breedingspecies',
          width: 120,
          resizable: 'true'
        },
        {
          title: '出栏量',
          dataIndex: 'stock',
          width: 120,
          resizable: 'true'
        },
        {
          title: '占地面积',
          dataIndex: 'areacovered',
          width: 120,
          resizable: 'true'
        },
        {
          title: '行政许可动物防疫合格证号',
          dataIndex: 'animalepidemic',
          width: 120,
          resizable: 'true'
        },
        {
          title: '养殖场备案号',
          dataIndex: 'farmrecordno',
          width: 120,
          resizable: 'true'
        },
        {
          title: '审核报告上传',
          dataIndex: 'auditreport',
          width: 120,
          resizable: 'true'
        },
        {
          title: '审核时间',
          dataIndex: 'constructiontime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '添加时间',
          dataIndex: 'addtime',
          width: 120,
          resizable: 'true'
        },
        {
          title: '审核人',
          dataIndex: 'reviewer',
          width: 120,
          resizable: 'true'
        },
        {
          title: '提交人id',
          dataIndex: 'operatorid',
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
            editSlaughterHouse(values)
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
            newSlaughterHouse(values)
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
