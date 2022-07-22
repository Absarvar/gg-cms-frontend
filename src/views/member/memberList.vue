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
              <a-col :md="8" :sm="24"> <a-form-item label="姓名"> <a-input v-model="queryParam.name" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="手机"> <a-input v-model="queryParam.mobile" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="终端代码"> <a-input v-model="queryParam.terminalCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="类型，0-商户，1-终端，2-源头"> <a-input v-model="queryParam.type" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="余额"> <a-input v-model="queryParam.amount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="冻结余额"> <a-input v-model="queryParam.frozenAmount" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="身份证正面"> <a-input v-model="queryParam.idCardFront" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="身份证反面"> <a-input v-model="queryParam.idCardBack" placeholder=""/> </a-form-item> </a-col>

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
        <template v-if="this.$route.name === 'member-review'">
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        </template>
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
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="createTime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot="type" slot-scope="text">
          <a-tag color="orange" >{{ text | memberTypeFilter }}</a-tag>
        </span>

        <span slot="idCardFront" slot-scope="text">
          <template v-if="text!==''">
            <a :href="'https://mkt.ggmstc.com/static/'+text" target="_blank">查看</a>
          </template>
        </span>
        <span slot="idCardBack" slot-scope="text">
          <template v-if="text!==''">
            <a :href="'https://mkt.ggmstc.com/static/'+text" target="_blank">查看</a>
          </template>
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
import { newMember, editMember, memberList } from '@/api/member'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import { memberTypeOptions } from '@/api/commonData'
import { MemberTypeMap, MEMBER_TYPE } from '@/config/status.config'

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
      memberTypeOptions: memberTypeOptions(),
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
        return memberList(requestParameters)
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
          width: 25
        },
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        //   width: 55
        // },
        {
          title: '名称',
          dataIndex: 'name',
          width: 90,
          resizable: 'true'
        },
        {
          title: '手机',
          dataIndex: 'mobile',
          width: 70,
          resizable: 'true'
        },
        {
          title: '终端代码',
          dataIndex: 'terminalCode',
          width: 55,
          resizable: 'true'
        },
        {
          title: '类型',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' },
          width: 45,
          resizable: 'true'
        },
        {
          title: '余额',
          dataIndex: 'amount',
          width: 50,
          resizable: 'true'
        },
        {
          title: '冻结余额',
          dataIndex: 'frozenAmount',
          width: 55,
          resizable: 'true'
        },
        {
          title: '身份证正面',
          dataIndex: 'idCardFront',
          scopedSlots: { customRender: 'idCardFront' },
          width: 65,
          resizable: 'true'
        },
        {
          title: '身份证反面',
          dataIndex: 'idCardBack',
          scopedSlots: { customRender: 'idCardBack' },
          width: 65,
          resizable: 'true'
        },

        {
          title: '状态',
          scopedSlots: { customRender: 'status' },
          width: 55,
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
    memberTypeFilter (type) {
      return MemberTypeMap[type].text
    },
    formateDate (time) {
      const date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  created () {

  },
  watch: {
    '$route': {
      immediate: true, // true首次加载执行，默认false
      handler () {
        // console.log('单个属性监听')
        // console.log(this.$route.name)
        if (this.$route.name === 'member-review') {
          this.queryParam.status = 0
          this.queryParam.type = null
        } else if (this.$route.name === 'supplier-member') {
          this.queryParam.status = 1
          this.queryParam.type = MEMBER_TYPE.SUPPLIER
        } else if (this.$route.name === 'merchant-member') {
          this.queryParam.status = 1
          this.queryParam.type = MEMBER_TYPE.MERCHANT
        } else if (this.$route.name === 'outside-merchant-member') {
          this.queryParam.status = 1
          this.queryParam.type = MEMBER_TYPE.OUTSIDE_MERCHANT
        } else if (this.$route.name === 'source-member') {
          this.queryParam.status = 1
          this.queryParam.type = MEMBER_TYPE.SOURCE
        } else if (this.$route.name === 'terminal-member') {
          this.queryParam.status = 1
          this.queryParam.type = MEMBER_TYPE.TERMINAL
        } else if (this.$route.name === 'member-list') {
          this.queryParam.status = null
          this.queryParam.type = null
        }
        if (this.$refs.table) {
          this.$refs.table.refresh()
        }
      }

    }
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
            editMember(values)
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
            newMember(values)
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
