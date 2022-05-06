<template>
  <div>
    <button @click="printHTML">打印</button>
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
          <tr style="">
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">商品名称</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">生产单位</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">原检疫证号</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >上级供应商</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" >分销凭证号</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">规格</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">数量</td>
            <td scope="col" style="text-align:center;border-width:1px;border-color:#000000;padding:0px;vertical-align:middle;" rowspan="2">重量（千克）</td>
          </tr>
          <tr>
            <td colspan="2" style="border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle">已经过分销的，须填写</td>
          </tr>
          <tr>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br><br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
            <th style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;"><br>    <br></th>
          </tr>
          <tr>
            <th style="border-width:1px;border-color:#000000;text-align:left;" colspan="7">合计：</th>
            <th style="border-width:1px;border-color:#000000;">    </th>
          </tr>
        </tbody>
      </table>
      <div>
        <div style="float:left;" align="left" >
          <div>供货单位：</div>
          <div>出证单位：供广深圳肉类智能交易市场</div>
        </div>
        <div style="float:right;">出证人：&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
      <div class="xbbbox" id="div_print">
        ...
        打印的内容
        ...
        <div style="width:770px;margin-left:90px;">
          审核： <img width="70px" height="30px" src="https://atlas.pingcode.com/files/public/62728d99b98c3149715a05b8">
          <span style="width:170px;margin-left:180px;">盖章：<img width="170px" height="130px" src="https://atlas.pingcode.com/files/public/6272927d83bcb368246be1c1/origin-url"></span>
        </div>
        <div style="text-align: center;margin-bottom: 20px" id="otherpho">
          <input type="button" value="打印" @click="dayin()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'BaseForm',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    dayin () {
        // var userAgent = navigator.userAgent.toLowerCase() // 取得浏览器的userAgent字符串 // 其它浏览器使用lodop
            var oldstr = document.body.innerHTML
            var headstr = '<html><head><title></title></head><body>'
            var footstr = '</body>'
            // 执行隐藏打印区域不需要打印的内容
            document.getElementById('otherpho').style.display = 'none'
            // 此处id换为你自己的id
            var printData = document.getElementById('div_print').innerHTML // 获得 div 里的所有 html 数据
            document.body.innerHTML = headstr + printData + footstr
            window.print()
            // 打印结束后，放开隐藏内容
            document.getElementById('otherpho').style.display = 'block'
            document.body.innerHTML = oldstr
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
