<template>
  <div>

    <div class="text-center">
      <table align="center" class="mx-auto table table-bordered table-hover heavy_border t2print" style="width:700px;vertical-align:middle">
        <tbody>
          <tr>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="8">
              <h2>供广深圳肉类智能交易市场产品检测报告</h2>
              <div>购货单位</div>
              <div>
                <div>NO</div>
                <div>出证日期</div>
              </div>
            </td>
          </tr>
          <tr>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">商品名称</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">生成单位</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">原检疫证号</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">上级供应商</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">分销凭证号</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">规格</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">数量</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">重量（千克）</td>
          </tr>
          <tr>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" ></td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">生成单位</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">原检疫证号</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">上级供应商</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">分销凭证号</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">规格</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">数量</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;">重量（千克）</td>
          </tr>

          <tr>
            <td scope="col" style="text-align:left;border-width:2px;border-color:#000000;" colspan="7">合计：</td>
            <td scope="col" style="text-align:center;border-width:2px;border-color:#000000;" colspan="1"></td>
          </tr>
        </tbody>

        <div>
          <div>供货单位</div>
          <div>出证单位：供广深圳肉类智能交易市场</div>
        </div>
        <div>出证人</div>

      </table>
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
