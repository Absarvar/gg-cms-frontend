<template>
  <div>
    <button @click="testPort()">打印22222111111</button>
    <div class="text-center" style="width:500px;height:300px;" align="center" >
      <h4>供广深圳肉类智能交易市场动物产品分销信息凭证</h4>
      <div style="float:left;">

        购货单位：<div> &nbsp;</div></div>
      <div style="float:right;font-size:5px;margin-bottom:-11px;">
        <div>出证日期：&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <table
        class="table table-bordered table-hover heavy_border t2print"
        style="vertical-align:middle;padding-top:15px;margin-bottom:1px;">
        <tbody >
        </tbody>
      </table>
      <div>
        <div style="float:left;" align="left" >
          <div>供货单位：</div>
          <div>出证单位：供广深圳肉类智能交易市场</div>
        </div>
        <div style="float:right;">出证人11111111111：&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </div>
    <span id="userno" style="display: flex;font-size:5px;color:red">------fdddddddddd-----</span>
  </div>
</template>

<script>
import $ from 'jquery'

async function handleRequestPort () {
  // 请求授权
  const port = await navigator.serial.requestPort()
  await port.open({ baudRate: 9600 })
  const writer = await port.writable.getWriter()
  console.log(writer)
  console.log(port)
}
export default {
  name: 'BaseForm',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    this.$nextTick(() => {
      // this.serialPort()
      console.log(navigator)
    console.log('------sssssss---')
    console.log(window.document.getElementById('userno'))
    var websocket = null
			if (!window.localStorage) {
				alert('浏览器支持localstorage')
			} else {
				// 读取
				console.log('++++++++++++', window.localStorage.getItem('se'))
				if (window.localStorage.getItem('se') != null) {
					console.log('laile')
					var a = window.localStorage.getItem('se')
					var s = 's' + a
					console.log('ssssssssssssssssssss' + s)
					document.getElementById('userno').innerText = s
					// console.log("_++++++_____",s);
				} else {
					console.log('来了')
					var random = this.genID(4)
					document.getElementById('userno').innerText = random
					var storage = window.localStorage
					storage.se = random
					console.log(typeof storage['se'])
				}
			}
			var userno = document.getElementById('userno').innerText.substr(1, 4)
			console.log('来了', userno)
      const socketUrl = 'ws://192.168.2.155:8080/websocket/c'
			// 判断当前浏览器是否支持WebSocket
			if ('WebSocket' in window) { // ws://192.168.0.167:8081/szszbo/websocket
				// websocket = new WebSocket("ws://localhost:9091/szszbo/websocket/c"+userno);
				// websocket = new WebSocket("wss://sy.ggmstc.com/wss/szszbo/websocket/c"+userno);
				// websocket = new WebSocket('wss://szsz.ggmstc.com/ws/websocket/c' + userno)
							websocket = new WebSocket(socketUrl + userno)
			} else {
				alert('当前浏览器 Not support websocket')
			}
			// 心跳检测, 每隔一段时间检测连接状态，如果处于连接中，就向server端主动发送消息，来重置server端与客户端的最大连接时间，如果已经断开了，发起重连。
			var heartCheck = {
				timeout: 3000, // 10秒钟发一次心跳，比server端设置的连接时间稍微小一点，在接近断开的情况下以通信的方式去重置连接时间。
				serverTimeoutObj: null,
				reset: function () {
					clearInterval(this.serverTimeoutObj)
					return this
				},
				start: function () {
					// var self = this
					this.serverTimeoutObj = setInterval(function () {
						if (websocket.readyState === 1) {
							console.log('连接状态，发送消息保持连接')
							websocket.send("{'data':'" + document.getElementById('message') + "'}")
							// heartCheck.reset().start();    // 如果获取到消息，说明连接是正常的，重置心跳检测
						} else {
							console.log('断开状态，尝试重连')
							// newWebSocket();
							websocket = new WebSocket(socketUrl + userno)
							// websocket = new WebSocket("wss://szsz2.shidongvr.com/wss/szszbo/websocket/c"+userno);
							// websocket = new WebSocket("wss://sy.ggmstc.com/wss/szszbo/websocket/c"+userno);
							// websocket = new WebSocket('wss://szsz.ggmstc.com/ws/websocket/c' + userno)
						}
					}, this.timeout)
				}
			}

			// 连接发生错误的回调方法
			websocket.onerror = function () {
				this.setMessageInnerHTML('WebSocket连接发生错误')
			}

			// 连接成功建立的回调方法
			websocket.onopen = function () {
				heartCheck.start()
				// websocket.send('{"f":260,"r":"H1nzpDxnQvGLmui1Ts7EUA==","b":{}}');
				this.setMessageInnerHTML('WebSocket连接成功')
			}

			// 接收到消息的回调方法
			websocket.onmessage = function (event) {
				this.setMessageInnerHTML(event.data)
			}

			// 连接关闭的回调方法
			websocket.onclose = function () {
				this.setMessageInnerHTML('WebSocket连接关闭')
				heartCheck.start()
			}

			// 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
			window.onbeforeunload = function () {
				this.closeWebSocket()
			}
    })
  },
  methods: {

    async testPort () {
      var sup = 'serial' in navigator
      console.log(sup)
      console.log(window.navigator.serial)
      console.log(window.navigator.serialPort)
      handleRequestPort()
      await navigator.serial.requestPort()
      console.log(await navigator.serial.getPorts())
    },
    genID (length) {
				return Number(Math.random().toString().substr(2, length))
			},
      setMessageInnerHTML (innerHTML) {
				console.log('aaaaaaa++++', innerHTML)
				var numArr = innerHTML.match(/\d+/g)

				console.log('aaaaaaaccccccccccccc+++++++', numArr)
				// 十六进制转字符串
				// console.log("aaassdssssssss", hexToStr( numArr.toString()));

				if (numArr) {
					document.getElementById('message').innerHTML = numArr[0]
				}

				// console.log("aaaaaaaaaacccc",JSON.parse(JSON.parse(innerHTML).data1) );
				// console.log(c.substring(19,27))
			},
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
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
					// console.log("+++++",str);
					// console.log("+++++",value);
					if ((str !== ' ' && str !== '') && (str !== '\r' && str !== '\n') && str.length < 7) {
						all = all + value
						// console.log("拼接", all)
						checksum = checksum + 0.5

						if (value === 'g') {
							var a = all.slice(2)
							// console.log("未截取重量-",a)
							var numArr = a.replace(/[^\d.]/g, '')
							// console.log("截取前重量-",numArr)
							var qqqww = numArr.substring(0, numArr.indexOf('.') + 2)
							// console.log("截取中重量-",qqqww)

							// console.log("重量-",qqqww)
							/* $(".weight").text(qqqww); */
							var aaaaa = parseFloat(qqqww) + 0.5
							qqqww += 'kg'
							aaaaa += 'kg'
							$('.classp1').text(qqqww)
							$('.classp2').text(aaaaa)

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
						$('.classp1').text(valuea)
						$('.classp2').text(parseFloat(valuea) + 0.5)
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
			}

  }

}

</script>
