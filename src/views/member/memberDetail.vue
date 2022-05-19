<template>
  <div>
    <a-button @click="getArticle">预览</a-button>

    <a-button @click="newArticle">保存</a-button>

    <div id="summernote" >noooooooooote</div>
    <a-card style="margin-top: 24px" :bordered="false" title="结果">
      <div id="preview">预览结果</div>
    </a-card>
  </div>
</template>

<script>
import { getArticle, articleList, newArticle } from '@/api/article'

import $ from 'jquery'

export default {
  created () {
    this.$nextTick(() => {
      $('#summernote').summernote({
        height: 300
      })
      this.getArticle()
    })
  },
  data () {
    return {
      id: 1,
      queryParam: {
        pageSize: 10,
        pageNo: 1,
        username: ''
      },
      newArticleParam: {
        id: 1,
        title: 'title1',
        content: 'content'
      },
      info: {
        title: 'title1',
        content: 'xxxxxxx'
      },
      list: [],
      testApiParam: {
        csrf_token: 'c92c31ac1e1f9acd1a8ca6efe6481e69',
        id: 1
      },
      testData: {},
      content: ''
    }
  },
  methods: {
    getArticle () {
      const { $message } = this
      $('#summernote').summernote({
        height: 300
      })
      getArticle(this.testApiParam).then(res => {
        this.info = res
        if (res != null && res.data != null) {
          $('#preview').html(res.data.article.content)
          $('#summernote').summernote('code', res.data.article.content)
        }
      }).catch(err => {
        $message.error(`load user err: ${err.message}`)
      })
    },
    newArticle () {
      var txt = $('#summernote').summernote('code')
      this.newArticleParam.content = txt
      const { $message } = this
      newArticle(this.newArticleParam).then(res => {
        this.info = res.data
      }).catch(err => {
        $message.error(`load user err: ${err.message}`)
      })
    },
    queryUsers () {
      articleList(this.queryParam).then(res => {
        this.list = res
      })
    }
  }
}

</script>
