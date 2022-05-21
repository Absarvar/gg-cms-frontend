<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24"> <a-form-item label="流向地址"> <a-input v-model="queryParam.flowaddress" placeholder=""/> </a-form-item> </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建日期">
                <a-range-picker
                  style="width: 400px"
                  format="YYYY-MM-DD"
                  @change="timeChange"
                />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24"> <a-form-item label="会员id"> <a-input v-model="queryParam.memberid" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="产品名称"> <a-input v-model="queryParam.productname" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.merchandisequantity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产单位"> <a-input v-model="queryParam.productionunit" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.orderno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="物种"> <a-input v-model="queryParam.animalspecies" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="屠宰单位"> <a-input v-model="queryParam.business" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="原检疫证号"> <a-input v-model="queryParam.certificateno" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.quantity" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.number" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="上级供应商"> <a-input v-model="queryParam.sjgys" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入场批次号"> <a-input v-model="queryParam.mobilizationbatch" placeholder=""/> </a-form-item> </a-col>

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
            <!-- <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item> -->
          </a-menu>
          <a-button type="primary" @click="batchPrint">打印</a-button>
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
        <!-- <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span> -->
        <span slot="addtime" slot-scope="text">
          {{ text | formateDate }}
        </span>

        <span slot-scope="record">
          {{ record.business }}
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">打印预览</a>
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
import { newSellTicket, editSellTicket, sellTicketList } from '@/api/sellTicket'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'

const statusMap = {
  '0': {
    status: 'default',
    text: '禁用中'
  },
  '1': {
    status: 'processing',
    text: '启用中'
  },
  null: {
    status: 'default',
    text: '禁用中'
  },
  undefined: {
    status: 'default',
    text: '禁用中'
  },
  '': {
    status: 'default',
    text: '禁用中'
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
        // console.log('loadData request parameters:', requestParameters)
        return sellTicketList(requestParameters)
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
          title: '产品名称',
          dataIndex: 'productname',
          width: 100,
          resizable: 'true'
        },
        {
          title: '生产单位',
          dataIndex: 'productionunit',
          width: 150,
          resizable: 'true'
        },
        {
          title: '流向地址',
          dataIndex: 'flowaddress',
          width: 150,
          resizable: 'true'
        },
        {
          title: '物种',
          dataIndex: 'animalspecies',
          width: 100,
          resizable: 'true'
        },
        {
          title: '屠宰单位',
          dataIndex: 'business',
          width: 100,
          resizable: 'true'
        },
        {
          title: '原检疫证号',
          dataIndex: 'certificateno',
          width: 100,
          resizable: 'true'
        },
        {
          title: '数量',
          dataIndex: 'number',
          width: 100,
          resizable: 'true'
        },
        {
          title: '重量',
          dataIndex: 'quantity',
          width: 100,
          resizable: 'true'
        },
        {
          title: '上级供应商',
          dataIndex: 'sjgys',
          width: 150,
          resizable: 'true'
        },
        {
          title: '入场批次号',
          dataIndex: 'mobilizationbatch',
          width: 100,
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
            editSellTicket(values)
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
            newSellTicket(values)
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
    },
    batchPrint () {
      const nowDate = new Date()
      const yy = nowDate.getFullYear()
      const mm = nowDate.getMonth() + 1
      const dd = nowDate.getDate()
      const hh = nowDate.getHours()
      const mf = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes()
        : nowDate.getMinutes()
      // const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
      //   : new Date().getSeconds()
      const dateTime = yy + '年' + mm + '月' + dd + '日' + hh + '时' + mf + '分'
		// var str = ''
		// var arr = []
    const datas = this.selectedRows
		var ticketHtml = `
			<html>
			<style>
			</style>
				<body>`
		for (var i = 0; i < datas.length; i++) {
			ticketHtml +=
      `
			<div class="text-center" style="width:750px;height:417px;margin-top:-1px;" align="center" >
       <br>
      <div style="margin-top:0px;">
        <div style="float:left;margin-left:50px;" align="left" >
          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;` + datas[i].flowaddress + `</div>
          <div> </div>
        </div>
        <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;` + dateTime + `</div>
      </div>
	      <table
	        class="table table-bordered table-hover heavy_border t2print"
	        style="padding-top:15px;margin-bottom:1px;float:left;width:750px;">
	        <tbody >
	        
	          <tr>
	            <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
	          </tr>
	          <tr>
	            <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
	          </tr>
	          
	          <tr>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:70px;height:120px;">    ` + datas[i].productname + `</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:115px;height:120px;">     ` + datas[i].business + `</td>
	            <td style="text-align:left;border-width:0px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:105px;height:130px;"> ` + datas[i].certificateno + `</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:110px;height:110px;visibility:hidden;">{上级供应商	}</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:120px;height:100px;visibility:hidden;">{	分销凭证号	}</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:50px;height:120px;visibility:hidden;">{规格}</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:55px;height:120px;"> &nbsp;&nbsp;&nbsp; ` + datas[i].number + `</td>
	            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:100px;height:120px;">&nbsp; ` + datas[i].quantity + `</td>
	          </tr>
	          <tr>
	            <td colspan="2" style="height:40px;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
	          </tr>
	          <tr>
	            <td style="border-width:1px;border-color:#000000;text-align:left;" colspan="7">&nbsp;&nbsp;&nbsp;</td>
	            <td style="border-width:1px;border-color:#000000;" align="center">     ` + datas[i].quantity + `</td>
	          </tr>
	        </tbody>
	      </table>
	      </table>
			      <div style="margin-top:60px;">
		        <div style="float:left;margin-left:50px;" align="left" >
		          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b> 供广深圳肉类智能交易市场有限公司</b></div>
		          <div> </div>
		        </div>
		      <div style="float:right;margin-right:70px;margin-top:10px;"><div> &nbsp;</div> <div> &nbsp;</div>&nbsp; &nbsp; &nbsp; &nbsp;莫洋飞</div>
		      </div>
	    </div>`
		}

		// ticketHtml += `</body>
		// </html>
		// `

		// console.log(ticketHtml)
		// 打开一个新的浏览器窗口
		var win = window.open('1')
		// win.document.write('sddddddddddddddddddddddddddd')
		// win.focus()// 在IE浏览器中使用必须添加这一句
		// win.print()
		// 写入
		win.document.write(ticketHtml)
		win.document.close()// 在IE浏览器中使用必须添加这一句
		win.focus()// 在IE浏览器中使用必须添加这一句
		win.print()
		win.close()
	}
  }
}
</script>
<style >
.table-striped {
  background-color: #fafafa;
}
</style>
