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
    </div>
  </div>
</template>

<script>
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
    printHTML () {
// 打开一个新的浏览器窗口
var win = window.open('print22')

// win.document.write('sddddddddddddddddddddddddddd')
// win.focus()// 在IE浏览器中使用必须添加这一句
// win.print()
// 写入
win.document.write(`
	<html>
<style>
</style>
	<body>
		<div class="text-center" style="width:750px;height:417px;" align="center" >
       <br>
      <div style="margin-top:0px;">
        <div style="float:left;margin-left:50px;" align="left" >
          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;深圳富士康-（龙华区）</div>
          <div> </div>
        </div>
        <div style="float:right;margin-right:0px;margin-top:30px;font-size: 8px;">&nbsp; &nbsp; &nbsp; &nbsp;202x年xx月xx日xx时xx分</div>
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
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:70px;height:120px;">    猪胴体</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:115px;height:120px;">    华润五丰肉类食品（深圳有限公司龙岗分公司）</td>
            <td style="text-align:left;border-width:0px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:105px;height:130px;">44841831502</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:110px;height:110px;visibility:hidden;">{上级供应商	}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:120px;height:100px;visibility:hidden;">{	分销凭证号	}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:50px;height:120px;visibility:hidden;">{规格}</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:55px;height:120px;"> &nbsp;&nbsp;&nbsp;10头</td>
            <td style="text-align:center;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;width:100px;height:120px;">&nbsp;1000（壹仟）</td>
          </tr>
          <tr>
            <td colspan="2" style="height:40px;border-width:1px;border-color:#000000;text-align:center;padding:0px;vertical-align:middle;visibility: hidden;">已经过分销的，须填写</td>
          </tr>
          <tr>
            <td style="border-width:1px;border-color:#000000;text-align:left;" colspan="7">&nbsp;&nbsp;&nbsp;</td>
            <td style="border-width:1px;border-color:#000000;">    1000（壹仟）</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:60px;">
        <div style="float:left;margin-left:50px;" align="left" >
          <div style="margin-top:20px"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<b>供广市场-广东温氏畜牧有限公司</b></div>
          <div> </div>
        </div>
      <div style="float:right;margin-right:70px;margin-top:10px;"><div> &nbsp;</div> <div> &nbsp;</div>&nbsp; &nbsp; &nbsp; &nbsp;莫洋飞</div>
      
      </div>
    </div>



	</body>
	</html>
`)
win.document.close()// 在IE浏览器中使用必须添加这一句
win.focus()// 在IE浏览器中使用必须添加这一句
win.print()
win.close()
}
  }
}

</script>
