<template>
  <page-header-wrapper
    :title="info.pinjie"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    @tabChange="handleTabChange"
  >
    <template v-slot:content>
      <a-descriptions size="small" :column="isMobile ? 1 : 2">
        <a-descriptions-item label="申报人">{{ info.memberName }}</a-descriptions-item>
        <a-descriptions-item label="车牌号">{{ info.plateNo }} </a-descriptions-item>
        <a-descriptions-item label="到达日期">{{ info.enterTime }}</a-descriptions-item>
        <a-descriptions-item label="司机">{{ info.carrier }}</a-descriptions-item>
        <a-descriptions-item label="申报日期">{{ info.createTime }}</a-descriptions-item>
        <a-descriptions-item label="司机电话">{{ info.carrierMobile }}</a-descriptions-item>
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
          <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 2, offset: 1 }">
            <a-card type="inner" title="商品名称" style="width:200px; text-align:center;">
              <a-descriptions :title="info.goodsId" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 3, offset: 3 }" :lg="{ span: 2, offset: 3 }">
            <a-card type="inner" title="总数量" style="width:100px; text-align:center;">
              <a-descriptions :title="info.num" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 2, offset: 1 }">
            <a-card type="inner" title="已入库" style="width:100px; text-align:center;">
              <a-descriptions :title="info.num" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 2, offset: 1 }">
            <a-card type="inner" title="剩余" style="width:100px; text-align:center;">
              <a-descriptions :title="info.num" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 2, offset: 1 }">
            <a-card type="inner" title="已理公斤数" style="width:200px; text-align:center;">
              <a-descriptions :title="info.instockWeight" size="small">
              </a-descriptions>
            </a-card>
          </a-col>
          <!-- <a-col :xs="{ span: 3, offset: 1 }" :lg="{ span: 2, offset: 1 }">
            <a-card type="inner" title="商品名称" style="width:120px; text-align:center;">
              <a-descriptions :title="info.animalspecies" size="small">
              </a-descriptions>
            </a-card>
          </a-col> -->
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

    <a-card style="margin-top: 24px" :bordered="false" title="现场信息">
      <a-card type="inner" title="轨道信息" style="width:300px;float:left;">
        <a-descriptions title="价格" size="small">
          <a-descriptions-item label="一级">
            <a-input v-model="price" ></a-input>
          </a-descriptions-item>
          <!-- <a-descriptions-item label="二级">
            <a-input :value="price" ></a-input>
          </a-descriptions-item> -->
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="重量" size="small" :col="1">
          <a-descriptions-item label="">
            <span style="font-size:30px;" class="classp1">{{ this.weight }}</span>
            <a-input id="weighti" v-model="weight" ></a-input>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-descriptions title="轨道编号" size="small" :col="2">
          <a-descriptions-item label="">
            <span style="font-size:30px;" class="classp2" id="orbitCodeLabel" >{{ this.orbitCode }}</span>

            <a-input id="orbitCode" v-model="orbitCode" ></a-input>
          </a-descriptions-item>
        </a-descriptions>
        <a-divider style="margin: 16px 0" />
        <a-button type="primary" @click="handleAdd()">提交</a-button>
        <!-- <a-button type="primary" @click="startWx()">ws</a-button> -->
        <a-divider style="margin: 16px 0" />
        <a-button type="primary" @click="serialPort()">电子秤</a-button>
        <a-divider style="margin: 16px 0" />
        <!-- <a-button type="primary" @click="getRfid()">rfid</a-button> -->
        <a-divider style="margin: 16px 0" />

        <span id="userno" style="display: flex;font-size:5px;color:red"></span>
        轨道信息：
        <span style="font-size:30px;" id="message"></span>
        重量信息：
        <div style="display: flex;justify-content: space-between;align-items:center;margin-top:5%;">
          <div class="divButtonMax">
            <span class="classp" style="display:inline;font-size:20px">净重: </span>
          </div>
        </div>
      </a-card>

      <a-card type="inner" title="入库日志" style="width:700px;float:right;">

        <s-table
          ref="table"
          size="default"
          rowKey="key"
          :columns="columns"
          :data="loadData"
          :showPagination="false"
          :pageSize="productPageSize"
          :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        >
          <span slot="createTime" slot-scope="text">
            {{ text | formateDate }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleDelete(record)">删除</a>
            </template>
          </span>
        </s-table>
      </a-card>
    </a-card>

    <!-- 操作 -->
    <!-- <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="operationTabList"
      :activeTabKey="operationActiveTabKey"
      @tabChange="(key) => {this.operationActiveTabKey = key}"
    >

      <a-table
        v-if="operationActiveTabKey === '1'"
        :columns="columns"
        :data="loadData"
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
    </a-card> -->

  </page-header-wrapper>
</template>

<script>
import { baseMixin } from '@/store/app-mixin'

import { getEntryApply } from '@/api/entryApply'
import { getPageQuery } from '@/utils/util'
import { formateDate } from '@/utils/dateUtil'
import { productList, deleteProduct, newProduct } from '@/api/product'
import { STable } from '@/components'
import { GG_WS_PREFIX } from '@/config/common.config'

 const Uint8ArrayToString = (fileData) => {
    var dataString = ''
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i])
    }
    return dataString
    }

export default {
  components: {
    STable
  },
  name: 'ProductInstock',
  mixins: [baseMixin],

  created () {
    this.$nextTick(() => {
        const urlParam = getPageQuery()
        if (urlParam !== undefined) {
          Object.assign(this.queryParam, urlParam)
          this.consumerNo = urlParam.consumerNo
          console.log(this.consumerNo)
        //  this.queryParam = urlParam
        }
        this.startWx()
        // const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getEntryApply(this.queryParam)
          .then(res => {
            console.log(res)
            this.info = res.data.entryApply
            this.info.createTime = formateDate(new Date(this.info.createTime), 'yyyy-MM-dd')
            this.info.arriveDate = formateDate(new Date(this.info.arriveDate), 'yyyy-MM-dd')
            // return res.data
          })
    })
  },
  data () {
    return {
      consumerNo: 'c1037',
      productPageSize: 100,
      keepReading: true,
      entryApplyId: 0,
      orbitCode: 0,
      weight: 0,
      rank: 1,
      price: 0,
      product: { },
      info: {},
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      tabList: [
        { key: 'detail', tab: '详情' }
        // { key: 'rule', tab: '规则' }
      ],
      tabActiveKey: 'detail',

      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const urlParam = getPageQuery()
        if (urlParam !== undefined) {
          Object.assign(this.queryParam, urlParam)
        //  this.queryParam = urlParam
        }
        this.queryParam.applyId = urlParam.id
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return productList(requestParameters)
          .then(res => {
            console.log(res)
            return res.data
          })
      },
      columns: [
        {
          title: '轨道编号',
          dataIndex: 'orbitCode',
          width: 100,
          resizable: 'true'
        },
        {
          title: '重量',
          dataIndex: 'weight',
          width: 100,
          resizable: 'true'
        },
        {
          title: '价格',
          dataIndex: 'price',
          width: 100,
          resizable: 'true'
        },
        {
          title: '入库时间',
          scopedSlots: { customRender: 'createTime' },
          width: 180,
          dataIndex: 'createTime'
        },
        {
          key: 'action',
          title: '操作',
          dataIndex: 'action',
          width: '100px',
          scopedSlots: { customRender: 'action' }
        }
      ],

      operationTabList: [
        {
          key: '1',
          tab: '入库日志'
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
      ]
    }
  },
  filters: {
    formateDate (time) {
      const date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
      serial: async () => {
        console.log('serial')
      // 浏览器支持serial
      if ('serial' in navigator) {
          console.log('当前浏览器支持serial')
          const port = await navigator.serial.requestPort()
          // 设置波特率，发和收的波特率要一致
          await port.open({ baudRate: 9600 })
          const reader = port.readable.getReader()
          try {
            while (true) {
              const { value, done } = await reader.read()
              if (done) {
                reader.releaseLock()
                break
              }
              // 解码
              var weight = Uint8ArrayToString(value)
              console.log(weight)
            }
          } catch (error) {
            console.error(error)
          } finally {
            reader.releaseLock()
            console.log('允许稍后关闭串口。')
            await port.close()
          }
      }
  },
    handleTabChange (key) {
      this.tabActiveKey = key
    },
    handleDelete (record) {
      deleteProduct({ id: record.id }).then(res => {
        this.$refs.table.refresh()
      })
    },
    handleAdd () {
      this.product.orbitCode = this.orbitCode
      this.product.weight = this.weight
      this.product.level = this.rank
      this.product.price = this.price
      this.product.goodsId = this.info.goodsId
      this.product.applyId = this.info.id
      newProduct(this.product).then(res => {
        this.$refs.table.refresh()
      })
    },
    // 串口设备

    async serialPort () {
//       const tds = {
//   start () {
//     this.decoder = new TextDecoder(this.encoding, this.options)
//   },
//   transform (chunk, controller) {
//     controller.enqueue(this.decoder.decode(chunk))
//   }
// }
				const port = await navigator.serial.requestPort()
				await port.open({
					baudRate: 9600
				}) // set baud rate
				/* reader = port.readable.getReader(); */

				const writer = port.writable.getWriter()

				// set how to write to device intervally
				setInterval(async () => {
					const commandframe = new Uint8Array([
						0x00,
						0xff
						/* ...some bytes to be sent */
					])
					await writer.write(commandframe)
				}, 3000) // send a frame every 3000ms

				// 流与变换。
				const textDecoder = new TextDecoderStream()
				const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
				const reader = textDecoder.readable.getReader()
				let checksum = 0
				var all = ''
				// 监听来自串行设备的数据。
				var arrays = []

				while (true) {
					const {
						value,
						done
					} = await reader.read()
					if (done) {
						reader.releaseLock()
						break
					}
					const re = /(\n(?=(\n+)))+/g

					var valuea = value
					var str = value.replace(re, '')
					// console.log("+++++",value);
					if ((str !== ' ' && str !== '') && (str !== '\r' && str !== '\n') && str.length < 7) {
						all = all + value
						// console.log("拼接", all)
						checksum = checksum + 0.5

						if (value === 'g') {
							var a = all.slice(2)
							// console.log("未截取重量-",a)
							var numArr = a.replace(/[^\d.]/g, '')
							// console.log('截取前重量-', numArr)
							var qqqww = numArr.substring(0, numArr.indexOf('.') + 2)
							// console.log('截取中重量-', qqqww)

							// console.log("重量-",qqqww)
							/* $(".weight").text(qqqww); */
							// var aaaaa = parseFloat(qqqww) + 0.5
							// qqqww += 'kg'
							// aaaaa += 'kg'
              this.weight = qqqww
							// $('.classp1').text(qqqww)
							// $('.classp2').text(aaaaa)

							checksum = 0
							arrays.push(all)
							all = ''

							/* 	console.log("shu", arrays) */
						}
					}
					if (valuea != null && valuea !== undefined && valuea.length > 9) {
						// console.log("一条", valuea)

						valuea = valuea.replace(/w/g, '')
						valuea = valuea.replace(/n/g, '')
						valuea = valuea.replace(/\s+/g, '')
						valuea = valuea.replace(/k/g, '')
						valuea = valuea.replace(/g/g, '')

						// console.log(">>>>>>>>>",valuea)
            this.weight = valuea
            document.getElementById('weighti').value = (valuea)
						// $('.classp1').text(valuea)
						// $('.classp2').text(parseFloat(valuea) + 0.5)

            setTimeout(() => {

            }, 100)
					}
					// value 是一个 string.
					/* 	console.log(value); */
				}

				const textEncoder = new TextEncoderStream()
				const writableStreamClosed = textEncoder.readable.pipeTo(port.writable)

				reader.cancel()
				await readableStreamClosed.catch(() => { /* Ignore the error */ })

				writer.close()
				await writableStreamClosed

				await port.close()
			},
    // async getRfid () {
		// 		const port = await navigator.serial.requestPort()
    //     await port.open({ baudRate: 115200 }) // set baud rate
    //     // var keepReading = true
    //     const reader = port.readable.getReader()
    //     const writer = port.writable.getWriter()

    //     // const tagExistCmd = new Uint8Array([0x01, 0x03, 0x60, 0x08, 0x00, 0x01, 0xC8, 0x1B])
    //       const tagCmd = new Uint8Array([0x01, 0x03, 0x00, 0x00, 0x00, 0x02, 0x0B, 0xC4])

    //     // set how to write to device intervally
    //     const writeInt = setInterval(async () => {
    //       const commandframe = tagCmd
    //       await writer.write(commandframe)
    //     }, 1000) // send a frame every 3000ms

    //       // const textDecoder = new TextDecoderStream()
    //       // const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
    //       // const reader = textDecoder.readable.getReader()
    //     console.log('rf loop start')
    //     while (port.readable && this.keepReading) {
    //       try {
    //       while (true) {
    //         const { value, done } = await reader.read()
    //         if (done) {
    //         // Allow the serial port to be closed later.
    //         reader.releaseLock()
    //         // Allow the serial port to be closed later.
    //         writer.releaseLock()
    //         break
    //         }
    //         console.log('::' + value)
    //         if (value === 0x01) {
    //           continue
    //         }
    //         if (value && value.length === 8) {
    //         /** * TODO: deal with the data value ***/
    //           if (value[0] === 0x01) {
    //             this.dealWithData9(value)
    //           } else {
    //             this.dealWithData8(value)
    //           }
    //         } else if (value && value.length === 9) {
    //           this.dealWithData9(value)
    //         } else {
    //           console.log('not rfid detected')
    //         }
    //         setTimeout(() => {

    //         }, 100)
    //       }
    //       } catch (error) {
    //       // Handle non-fatal read error.
    //       console.error(error)
    //       } finally {
    //         console.log(port.readable, this.keepReading)
    //       }
    //     }
    //     clearInterval(writeInt)
    //     await port.close()
    //     console.log('port closed')
    //   },
    //   dealWithData8 (value) {
    //     console.log('dealWithData8' + value)

    //     const v1 = String.fromCharCode(value[2])
    //     const v2 = String.fromCharCode(value[3])
    //     const v3 = String.fromCharCode(value[4])
    //     const v4 = String.fromCharCode(value[5])
    //     const rfid = v1 + v2 + v3 + v4
    //     console.log(rfid)
    //     this.orbitCode = rfid
    //     document.getElementById('orbitCode').value = (rfid)
    //   },
    //   dealWithData9 (value) {
    //     console.log('dealWithData9' + value)

    //     const v1 = String.fromCharCode(value[3])
    //     const v2 = String.fromCharCode(value[4])
    //     const v3 = String.fromCharCode(value[5])
    //     const v4 = String.fromCharCode(value[6])
    //     const rfid = v1 + v2 + v3 + v4
    //     console.log(rfid)
    //     this.orbitCode = rfid
    //     document.getElementById('orbitCode').value = (rfid)
    //   },

    startWx () {
      var websocket = null

    // 判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket(GG_WS_PREFIX + '/websocket/' + this.consumerNo)
    } else {
        alert('Not support websocket')
    }

    // 连接发生错误的回调方法
    websocket.onerror = function () {
        document.getElementById('message').innerHTML = ('发生错误')
    }

    // 连接成功建立的回调方法
    websocket.onopen = function (event) {
        document.getElementById('message').innerHTML = ('建立连接')
    }

    // 接收到消息的回调方法
    websocket.onmessage = function (event) {
		console.log(event.data)
        document.getElementById('message').innerHTML = (event.data)
        var res = JSON.parse(event.data)

        if (res && res.data) {
          document.getElementById('orbitCode').value = (res.data)
          document.getElementById('orbitCodeLabel').innerHTML = (res.data)
        }
    }

    // 连接关闭的回调方法
    websocket.onclose = function () {
        document.getElementById('message').innerHTML = ('关闭连接')
    }

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function () {
		alert('已关闭连接')
        websocket.close()
    }

    // 关闭连接
    // function closeWebSocket () {
		// alert('已关闭连接')
    //     websocket.close()
    // }
    },
    setMessageInnerHTML (innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>'
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
