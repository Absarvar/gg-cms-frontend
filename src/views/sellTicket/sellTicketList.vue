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
              <a-col :md="8" :sm="24"> <a-form-item label="分销证号"> <a-input v-model="queryParam.fxNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="批次号"> <a-input v-model="queryParam.batchNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产单位"> <a-input v-model="queryParam.butcherEnt" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产单位地址"> <a-input v-model="queryParam.butcherAddress" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="检疫证号"> <a-input v-model="queryParam.quarantineNo" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商企业"> <a-input v-model="queryParam.supplierEnt" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供货商"> <a-input v-model="queryParam.goodsSupplier" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向企业"> <a-input v-model="queryParam.flowtoEnt" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向企业地址"> <a-input v-model="queryParam.flowtoEntAddress" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="商品名称"> <a-input v-model="queryParam.goodsName" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="数量"> <a-input v-model="queryParam.num" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="重量"> <a-input v-model="queryParam.weight" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="备注"> <a-input v-model="queryParam.remark" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单编号"> <a-input v-model="queryParam.orderCode" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="生产企业ID"> <a-input v-model="queryParam.butcherEntId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="供应商企业ID"> <a-input v-model="queryParam.supplierEntId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="流向企业ID"> <a-input v-model="queryParam.flowtoEntId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="入场ID"> <a-input v-model="queryParam.entryApplyId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="订单ID"> <a-input v-model="queryParam.orderId" placeholder=""/> </a-form-item> </a-col>
              <a-col :md="8" :sm="24"> <a-form-item label="换算参数"> <a-input v-model="queryParam.convertFact" placeholder=""/> </a-form-item> </a-col>

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
        <template>
          <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
          <a-divider type="vertical" />
          <a type="primary" href="http://cdn.ggmstc.com/common/%E4%BF%A1%E6%81%AF%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF-%E5%88%86%E9%94%80%E7%A5%A8%E4%B8%93%E7%94%A8.xls">模板下载</a>
          <a-divider type="vertical" />
          &nbsp;
        </template>

        <a-upload
          name="file"
          :multiple="true"
          :action="importUrl.url"
          :headers="importHeaders"
          @change="handleChange"
        >
          <a-button> <a-icon type="upload" /> 导入 </a-button>
        </a-upload>

        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">

          <a-button type="primary" @click="batchPrint">打印</a-button>
          <!-- <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu> -->
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

        <span slot="qrcodeUrl" slot-scope="text">
          <img width="50px" height="50px" :src="text">
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
import { newSellTicket, editSellTicket, sellTicketList, sellTicketApi } from '@/api/sellTicket'

import CreateForm from './modules/CreateForm'
import { formateDate } from '@/utils/dateUtil'
import { uploadHeaders, getNowTime } from '@/utils/util'

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
        url: sellTicketApi.importSellTicket
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
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        //   width: 60
        // },
        {
          title: '分销证号',
          dataIndex: 'fxNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '批次号',
          dataIndex: 'batchNo',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产单位',
          dataIndex: 'butcherEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产单位地址',
          dataIndex: 'butcherAddress',
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
          title: '供应商企业',
          dataIndex: 'supplierEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供货商',
          dataIndex: 'goodsSupplier',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业',
          dataIndex: 'flowtoEnt',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业地址',
          dataIndex: 'flowtoEntAddress',
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
          title: '数量',
          dataIndex: 'num',
          width: 120,
          resizable: 'true'
        },
        {
          title: '重量',
          dataIndex: 'weight',
          width: 120,
          resizable: 'true'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          width: 120,
          resizable: 'true'
        },
        {
          title: '二维码',
          dataIndex: 'qrcodeUrl',
          width: 120,
          scopedSlots: { customRender: 'qrcodeUrl' },
          resizable: 'true'
        },
        {
          title: '订单编号',
          dataIndex: 'orderCode',
          width: 120,
          resizable: 'true'
        },
        {
          title: '生产企业ID',
          dataIndex: 'butcherEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '供应商企业ID',
          dataIndex: 'supplierEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '流向企业ID',
          dataIndex: 'flowtoEntId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '入场ID',
          dataIndex: 'entryApplyId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '订单ID',
          dataIndex: 'orderId',
          width: 120,
          resizable: 'true'
        },
        {
          title: '换算参数',
          dataIndex: 'convertFact',
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
    handleChange (info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file.response.success === true) {
          this.$message.success(`${info.file.name} 导入成功！`)
        } else {
          this.$message.error(`${info.file.name} 导入失败.原因：${info.file.response.msg}`)
        }
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败.`)
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
      const nowTime = getNowTime()
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
		<div class="text-center" style="width:750px;height:386px;" align="center" >
      <div style="margin-top:35px;height:70px;">
              <div style="margin-left:0px;" align="left" >
                <div style="margin-top:20px;padding-left:80px;padding-top:15px;"> ` + datas[i].fxNo + `</div>
              </div>
              <div style="float:right;margin-top:-70px;"> <img width="70px" height="80px" src="https://sy.ggmstc.com/szszdistfile/8c7ea05c-8b80-4190-a527-79126c6073f1.jpg"></div>
              <!-- <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;{{ this.nowTime }}</div> -->
            </div>
      <table 
              class="table table-bordered table-hover heavy_border t2print"
              style="vertical-align:middle;padding-top:15px;margin-top:-35px;">
              <tbody >
               
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="1"> </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" colspan="3">供广深圳肉类智能交易市场有限公司</td>
                </tr>
                <tr style="width:750px;">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:150px;visibility:hidden;" > 生产单位</td>
                  <td scope="col" style="text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:230px;padding-left:-0px;font-size:15px; " >` + datas[i].butcherEnt + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:120px;visibility:hidden;" > -</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:250px;font-size:8px;padding-left:25px;" >` + datas[i].butcherAddress + `购货单位地址购</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;font-size:15px;" >` + datas[i].flowtoEnt + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;width:200px;font-size:8px;padding-left:25px;" >` + datas[i].flowtoEntAddress + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" >` + datas[i].batchNo + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" > &nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:25px;" >` + datas[i].quarantineNo + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;" >` + datas[i].goodsName + `</td>
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >&nbsp;&nbsp;&nbsp;&nbsp; </td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:25px;" >` + datas[i].weight + `公斤</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">检测结果</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="3">本批次产品经抽样进行感官、理化、瘦肉精、非洲猪瘟病毒及禁限药物残留检测，结果合格。</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;visibility:hidden;" colspan="1">备注</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:55px;" colspan="3"><br>` + datas[i].remark + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:bottom;padding-left:45px;width:90px;" colspan="1">&nbsp;&nbsp;&nbsp;&nbsp;莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;padding-left:0px;visibility:hidden;" colspan="1"> 莫洋飞</td>
                  <td scope="col" style="height:32px;text-align:right;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;font-size:12px;" colspan="2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ` + nowTime + `</td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4"></td>
                </tr>
                <tr style="">
                  <td scope="col" style="height:32px;text-align:left;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" colspan="4"></td>
                </tr>
              </tbody>
            </table>
      </div></div>`
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
