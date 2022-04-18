<template>
  <div>

    <div class="text-center" style="width:500px;height:300px;" align="center" >
      <h4>供广深圳肉类智能交易市场动物产品分销信息凭证</h4>
      <div style="float:left;">
        <div> &nbsp;</div>
        购货单位：</div>
      <div style="float:right;">
        <div>NO：11111</div>
        <div>出证日期：</div>
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
      <div style="float:left;" align="left" >
        <div>供货单位：</div>
        <div>出证单位：供广深圳肉类智能交易市场</div>
      </div>
      <div style="float:right;">出证人：</div>
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
    }
  }
}
</script>
