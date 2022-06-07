<template>
  <page-header-wrapper
    :title="info.pinjie"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <template v-slot:content>
      <a-descriptions size="small" :column="isMobile ? 1 : 2">
        <a-descriptions-item label="申报人">{{ info.name }}</a-descriptions-item>
        <a-descriptions-item label="车牌号">{{ info.licenseplatenumber }} </a-descriptions-item>
        <a-descriptions-item label="到达日期">{{ info.arriveDate }}</a-descriptions-item>
        <a-descriptions-item label="司机">{{ info.driver }}</a-descriptions-item>
        <a-descriptions-item label="申报日期">{{ info.addTime }}</a-descriptions-item>
        <a-descriptions-item label="司机电话">{{ info.cellPhoneNumber }}</a-descriptions-item>
      </a-descriptions>
    </template>

    <!-- actions -->
    <template v-slot:extra>
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>

    <template v-slot:extraContent>
      <a-row class="status-list">
        <a-col :xs="12" :sm="12">
          <div class="text">状态</div>
          <div class="heading">
            <template v-if="info.status === 1">
              待入库
            </template>

          </div>
        </a-col>
        <a-col :xs="12" :sm="12">
          <div class="text">申报数量</div>
          <div class="heading">{{ info.number }}</div>
        </a-col>
      </a-row>
    </template>

    <a-card style="margin-top: 24px" :bordered="false">
      <!-- <div class="no-data"><a-icon type="frown-o"/>暂无数据</div> -->
      <template>
        <a-row>
          <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 4, offset: 1 }">
            <a-card type="inner" title="总数量" style="width:100px; text-align:center;">
              <a-descriptions :title="info.number" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 6, offset: 1 }" :lg="{ span: 4, offset: 1 }">
            <a-card type="inner" title="已入库" style="width:100px; text-align:center;">
              <a-descriptions :title="info.number" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 9, offset: 1 }" :lg="{ span: 4, offset: 1 }">
            <a-card type="inner" title="剩余" style="width:100px; text-align:center;">
              <a-descriptions :title="info.number" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 4, offset: 1 }">
            <a-card type="inner" title="已理公斤数" style="width:200px; text-align:center;">
              <a-descriptions :title="info.number" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <!-- <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }" :style="{height: '350px', 'background-color':'grey', 'text-align':'center'}">
            Col
          </a-col>
          <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }" :style="{height: '350px', 'background-color':'grey', 'text-align':'center'}">
            Col
          </a-col> -->
        </a-row>

      </template>

      <!-- <a-card type="inner" title="总数量" style="width:100px; text-align:center;">
        <a-descriptions :title="info.number" size="small">
        </a-descriptions>
      </a-card> -->

    </a-card>

    <!-- <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step>
          <template v-slot:title>
            <span>创建项目</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              曲丽丽<a-icon type="dingding" style="margin-left: 8px;" />
              <div>2016-12-12 12:32</div>
            </div>
          </template>
        </a-step>
        <a-step>
          <template v-slot:title>
            <span>部门初审</span>
          </template>
          <template v-slot:description>
            <div class="antd-pro-pages-profile-advanced-style-stepDescription">
              周毛毛<a-icon type="dingding" style="color: rgb(0, 160, 233); margin-left: 8px;" />
              <div><a>催一下</a></div>
            </div>
          </template>
        </a-step>
        <a-step title="财务复核" />
        <a-step title="完成" />
      </a-steps>
    </a-card> -->

    <a-card style="margin-top: 24px" :bordered="false" title="现场信息">

      <a-card type="inner" title="多层信息组" style="width:500px;">
        <a-descriptions title="组名称" size="small">
          <a-descriptions-item label="负责人">林东东</a-descriptions-item>
          <a-descriptions-item label="角色码">1234567</a-descriptions-item>
          <a-descriptions-item label="所属部门">XX公司-YY部</a-descriptions-item>
          <a-descriptions-item label="过期时间">2018-08-08</a-descriptions-item>
          <a-descriptions-item label="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="组名称" size="small" :col="1">
          <a-descriptions-item label="学名">	Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="组名称" size="small" :col="2">
          <a-descriptions-item label="负责人">付小小</a-descriptions-item>
          <a-descriptions-item label="角色码">1234567</a-descriptions-item>
        </a-descriptions>
      </a-card>

    </a-card>

    <!-- 操作 -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="operationTabList"
      :activeTabKey="operationActiveTabKey"
      @tabChange="(key) => {this.operationActiveTabKey = key}"
    >
      <a-table
        v-if="operationActiveTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation1"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="operationActiveTabKey === '2'"
        :columns="operationColumns"
        :dataSource="operation2"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="operationActiveTabKey === '3'"
        :columns="operationColumns"
        :dataSource="operation3"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
    </a-card>

  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

import { getEnterApply } from '@/api/enterApply'
import { getPageQuery } from '@/utils/util'
import { formateDate } from '@/utils/dateUtil'

export default {
  name: 'ProductInstock',
  mixins: [baseMixin],

  created () {
    this.$nextTick(() => {
        const urlParam = getPageQuery()
        if (urlParam !== undefined) {
          Object.assign(this.queryParam, urlParam)
        //  this.queryParam = urlParam
        }
        // const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getEnterApply(this.queryParam)
          .then(res => {
            console.log(res)
            this.info = res.data.enterApply
            this.info.addTime = formateDate(new Date(this.info.addTime), 'yyyy-MM-dd')
            this.info.arriveDate = formateDate(new Date(this.info.arriveDate), 'yyyy-MM-dd')
            // return res.data
          })
    })
  },
  data () {
    return {
      info: {},
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      // },
      tabList: [
        { key: 'detail', tab: '详情' },
        { key: 'rule', tab: '规则' }
      ],
      tabActiveKey: 'detail',

      operationTabList: [
        {
          key: '1',
          tab: '操作日志一'
        },
        {
          key: '2',
          tab: '操作日志二'
        },
        {
          key: '3',
          tab: '操作日志三'
        }
      ],
      operationActiveTabKey: '1',

      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '执行结果',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark'
        }
      ],
      operation1: [
        {
          key: 'op1',
          type: '订购关系生效',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '创建订单',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      operation2: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        }
      ],
      operation3: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ]
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    handleTabChange (key) {
      console.log('')
      this.tabActiveKey = key
    }
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
