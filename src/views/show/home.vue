<template>
  <div>
    hhhhhhhhhhhhhhhhhhhhhome page
    <div id="preview">预览结果</div>
  </div>
</template>

<script>
  import { getArticle } from '@/api/article'

  import $ from 'jquery'

  export default {
    name: 'showHome',
    data () {
      return {
        testApiParam: {
          csrf_token: 'c92c31ac1e1f9acd1a8ca6efe6481e69',
          id: 1
        }
      }
    },
    created () {
      this.$nextTick(() => {
        const { $message } = this
        getArticle(this.testApiParam).then(res => {
          this.info = res
          $('#preview').html(res.content)
          $('#summernote').summernote('code', res.content)
        }).catch(err => {
          $message.error(`load user err: ${err.message}`)
        })
      })
    }
  }
</script>

<style scoped>

</style>
